# Application documents

The homepage Contact section offers the existing CV, a reusable software engineering cover letter, and an editable UTF-8 text copy in the current language.

Files served directly from `public/CoverLetters/`:
- `Dilan_Peredo_Cover_Letter_English.pdf` and `.txt`
- `Dilan_Peredo_Carta_Presentacion.pdf` and `.txt`

The PDFs are one-page A4 documents with selectable text and contact links. They have no company or date placeholders so they can be used as general introductions. For a specific application, customize the opening, relevant project examples and closing before submitting.

Evidence: the English CV under `public/CV/`, `src/data/profile.ts`, and the Zazu, SAP and procurement case studies. The letters do not claim a completed university degree, seniority level, unverified metrics or availability for a particular employer.

To maintain both formats, edit `src/data/application-letters.json` and run `python scripts/generate-cover-letters.py` with `reportlab` installed. Contact details come from `src/data/profile.ts`. Changing a downloaded text copy does not automatically change the PDF. Re-render the PDFs and inspect both pages after content edits. Check each remains one page, then run portfolio lint and build after UI changes.
