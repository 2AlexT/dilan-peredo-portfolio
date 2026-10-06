"""Generate bilingual public PDFs and editable UTF-8 text from verified content.

Run with Python and reportlab. Sources: application-letters.json and profile.ts.
"""
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "CoverLetters"
LETTERS = json.loads((ROOT / "src/data/application-letters.json").read_text(encoding="utf-8"))
PROFILE_SOURCE = (ROOT / "src/data/profile.ts").read_text(encoding="utf-8")
PROFILE = {key: re.search(rf'{key}: "([^"]+)"', PROFILE_SOURCE).group(1)
           for key in ("name", "email", "phone", "location", "githubUrl")}
INK = colors.HexColor("#172b26")
ACCENT = colors.HexColor("#37664c")
MUTED = colors.HexColor("#50615b")
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=10.7, leading=15.4,
                      textColor=INK, spaceAfter=12, alignment=TA_LEFT)
SUBJECT = ParagraphStyle("subject", parent=BODY, fontName="Helvetica-Bold", spaceAfter=18)


def header(canvas, doc, letter):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(ACCENT)
    canvas.rect(54, height - 58, 28, 3, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 23)
    canvas.drawString(54, height - 93, "Dilan Peredo")
    canvas.setFont("Helvetica", 10.5)
    canvas.drawString(54, height - 112, PROFILE["name"])
    canvas.setFillColor(ACCENT)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(54, height - 135, letter["title"])
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 9)
    contact = f'{PROFILE["location"]}  |  {PROFILE["phone"]}  |  {PROFILE["email"]}'
    canvas.drawString(54, height - 157, contact)
    canvas.drawString(54, height - 173, PROFILE["githubUrl"])
    canvas.linkURL(PROFILE["githubUrl"], (54, height - 176, 230, height - 163), relative=0)
    canvas.linkURL(f'mailto:{PROFILE["email"]}', (280, height - 160, width - 54, height - 146), relative=0)
    canvas.setStrokeColor(colors.HexColor("#d9e1dc"))
    canvas.setLineWidth(0.7)
    canvas.line(54, height - 190, width - 54, height - 190)
    canvas.restoreState()


def generate():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for locale, letter in LETTERS.items():
        pdf_path = OUTPUT / f'{letter["filename"]}.pdf'
        doc = SimpleDocTemplate(str(pdf_path), pagesize=A4, rightMargin=54, leftMargin=54,
                                topMargin=211, bottomMargin=46, title=letter["subject"],
                                author=PROFILE["name"], subject=letter["title"])
        content = [Paragraph(escape(letter["subject"]), SUBJECT),
                   Paragraph(escape(letter["salutation"]), BODY)]
        content.extend(Paragraph(escape(p), BODY) for p in letter["paragraphs"])
        content.extend([Spacer(1, 3), Paragraph(escape(letter["closing"]), BODY),
                        Paragraph(f'<b>{escape(PROFILE["name"])}</b>', BODY)])
        draw_header = lambda canvas, document: header(canvas, document, letter)
        doc.build(content, onFirstPage=draw_header, onLaterPages=draw_header)
        text = "\n\n".join([PROFILE["name"], letter["title"],
                             f'{PROFILE["location"]} | {PROFILE["phone"]} | {PROFILE["email"]}',
                             PROFILE["githubUrl"], letter["subject"], letter["salutation"],
                             *letter["paragraphs"], letter["closing"], PROFILE["name"]]) + "\n"
        (OUTPUT / f'{letter["filename"]}.txt').write_text(text, encoding="utf-8")
        print(f"{locale}: {pdf_path.name} and editable text")


if __name__ == "__main__":
    generate()
