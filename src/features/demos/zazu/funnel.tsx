import type { Locale } from "@/i18n/config";
import { getConversationFunnel, type DemoState } from "./data";
import styles from "./zazu.module.css";

export function ConversationFunnel({ state, locale, selectedFlow = "", onSelect }: {
  state: DemoState; locale: Locale; selectedFlow?: string; onSelect: (flow: string) => void;
}) {
  const es = locale === "es";
  const steps = getConversationFunnel(state);
  const maximum = Math.max(1, steps[0].count);
  const widthFor = (count: number) => Math.max(48, count / maximum * 390);
  const colors = ["#67bb6a", "#27a69b", "#27c6d9", "#2bb6f7", "#5d6ac0"];
  return <section className={styles.panel} aria-label={es ? "Embudo ordenado de conversaciones" : "Ordered conversation funnel"}>
    <div className={styles.panelHeading}><h3>{es ? "Embudo de conversación" : "Conversation funnel"}</h3><span className={styles.tag}>{es ? "ORDEN DEL RECORRIDO" : "JOURNEY ORDER"}</span></div>
    <p className={styles.muted}>{es ? "Contactos ficticios que alcanzaron cada paso, en el orden de la conversación. La atención humana es una ruta alternativa." : "Fictional contacts who reached each step, in conversation order. Human follow-up is an alternative path."}</p>
    <svg className={styles.funnelChart} viewBox="0 0 440 365" aria-hidden="true">
      {steps.map((step, i) => {
        const topWidth = widthFor(step.count);
        const bottomWidth = widthFor(steps[i + 1]?.count ?? Math.max(0, step.count - 1));
        const y = 8 + i * 70;
        return <g key={step.flow}>
          <path d={`M${220 - topWidth / 2},${y} L${220 + topWidth / 2},${y} L${220 + bottomWidth / 2},${y + 64} L${220 - bottomWidth / 2},${y + 64} Z`} fill={colors[i]} stroke={selectedFlow === step.flow ? "#153e28" : "none"} strokeWidth="3" />
          <text x="220" y={y + 39} textAnchor="middle" fill={i < 3 ? "#0c3323" : "#fff"} fontSize="22" fontWeight="600">{step.count}</text>
        </g>;
      })}
    </svg>
    <ol className={styles.funnelSteps}>{steps.map((step, i) => <li key={step.flow}><button aria-pressed={selectedFlow === step.flow} onClick={() => onSelect(step.flow)}><span className={styles.funnelNumber} style={{ backgroundColor: colors[i] }}>{String(i + 1).padStart(2, "0")}</span><span><strong>{step[locale]}</strong><code>{step.flow}</code></span><b>{step.count}</b></button></li>)}</ol>
    <p className={styles.funnelHint}>{es ? "Selecciona una etapa para consultar sus contactos. Los conteos conservan el historial; cancelar una reserva no borra los pasos alcanzados." : "Select a stage to inspect its contacts. Counts retain history; cancelling a booking does not erase completed steps."}</p>
  </section>;
}
