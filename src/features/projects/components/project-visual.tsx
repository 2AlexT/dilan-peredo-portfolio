import Image from "next/image";

import type { PortfolioProject } from "../types/project";

interface ProjectVisualProps {
  project: PortfolioProject;
  large?: boolean;
}

export function ProjectVisual({ project, large = false }: ProjectVisualProps) {
  if (project.coverImage) {
    return (
      <figure className="relative aspect-[16/10] overflow-hidden border border-line bg-[#f6f7fb]">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={large ? "(max-width: 1440px) 94vw, 1344px" : "(max-width: 768px) 94vw, (max-width: 1024px) 46vw, 31vw"}
          priority={large}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-line bg-background/95 px-3 py-2 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-foreground/80 sm:px-4 sm:text-[0.6rem]">
          <span>{project.name}</span>
          <span className="inline-flex items-center gap-2 text-accent">
            <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
            {project.coverImage.caption}
          </span>
        </figcaption>
      </figure>
    );
  }

  const isSap = project.slug === "sap-operations-platform";
  const isProcurement = project.slug === "comprasya";

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border border-line bg-surface ${large ? "aspect-[16/8]" : "aspect-[16/10]"}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.8%,rgb(182_243_107/0.06)_50%,transparent_50.2%),linear-gradient(to_bottom,transparent_49.8%,rgb(182_243_107/0.06)_50%,transparent_50.2%)] bg-[size:48px_48px]" />
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-line bg-background/70 px-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
        <span>
          {isSap
            ? "operations / core"
            : isProcurement
              ? "procurement / workflow"
              : "customer / workspace"}
        </span>
        <span className="flex items-center gap-2 text-accent">
          <span className="size-1 rounded-full bg-accent" /> connected
        </span>
      </div>

      {isSap ? (
        <OperationsVisual />
      ) : isProcurement ? (
        <ProcurementVisual />
      ) : (
        <AutomationVisual />
      )}
    </div>
  );
}

function ProcurementVisual() {
  const workflow = [
    { code: "RQ", label: "Request", state: "complete" },
    { code: "AP", label: "Approve", state: "active" },
    { code: "PO", label: "Order", state: "pending" },
    { code: "WH", label: "Receive", state: "pending" },
  ] as const;

  return (
    <div className="absolute inset-x-[6%] bottom-[8%] top-[20%]">
      <div className="relative h-full overflow-hidden border border-white/15 bg-[linear-gradient(135deg,rgba(226,232,240,0.14)_0%,rgba(71,85,105,0.07)_30%,rgba(9,11,11,0.96)_62%,rgba(182,243,107,0.08)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-[12%] -top-[55%] h-[150%] w-[38%] rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(182,243,107,0.14),transparent_34%)]" />

        <div className="relative grid h-full grid-rows-[auto_1fr] p-3 sm:p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[0.48rem] uppercase tracking-[0.15em] text-slate-300/70 sm:text-[0.54rem]">
            <span>Purchase lifecycle</span>
            <span className="flex items-center gap-2 text-accent">
              <span className="signal-pulse size-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(182,243,107,0.9)]" />
              live flow
            </span>
          </div>

          <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_29%] gap-3 pt-3 sm:gap-5 sm:pt-4">
            <div className="flex min-w-0 flex-col justify-between">
              <div className="relative grid grid-cols-4">
                <div className="absolute left-[12.5%] right-[12.5%] top-[13px] h-px bg-white/15 sm:top-[15px]">
                  <div className="h-full w-1/2 bg-gradient-to-r from-accent via-accent to-cyan-300 shadow-[0_0_8px_rgba(182,243,107,0.45)]" />
                </div>

                {workflow.map((step) => (
                  <div key={step.code} className="relative flex flex-col items-center">
                    <div
                      className={`relative z-10 flex size-7 items-center justify-center border font-mono text-[0.48rem] sm:size-8 sm:text-[0.54rem] ${
                        step.state === "complete"
                          ? "border-accent/70 bg-accent text-[#11150f] shadow-[0_0_16px_rgba(182,243,107,0.2)]"
                          : step.state === "active"
                            ? "border-cyan-200/80 bg-[linear-gradient(145deg,rgba(226,232,240,0.28),rgba(34,211,238,0.12))] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_18px_rgba(103,232,249,0.16)]"
                            : "border-slate-400/25 bg-slate-300/[0.05] text-slate-400"
                      }`}
                    >
                      {step.code}
                    </div>
                    <span className="mt-1.5 hidden font-mono text-[0.42rem] uppercase tracking-[0.08em] text-slate-400 sm:block">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2 min-h-0 flex-1 border-t border-white/10 pt-2 sm:mt-3 sm:pt-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[0.44rem] uppercase tracking-[0.14em] text-slate-400 sm:text-[0.5rem]">
                      Flow throughput
                    </p>
                    <p className="mt-0.5 font-mono text-[0.62rem] text-slate-100 sm:text-[0.72rem]">
                      86 <span className="text-[0.48rem] text-accent">+12%</span>
                    </p>
                  </div>
                  <span className="font-mono text-[0.42rem] text-slate-500 sm:text-[0.48rem]">7D</span>
                </div>

                <svg
                  viewBox="0 0 360 58"
                  preserveAspectRatio="none"
                  className="mt-1 h-[42%] min-h-6 w-full"
                >
                  <defs>
                    <linearGradient id="procurementArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b6f36b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#b6f36b" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="procurementLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="58%" stopColor="#b6f36b" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>
                  {[14, 29, 44].map((y) => (
                    <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(148,163,184,0.12)" />
                  ))}
                  <path d="M0 51 L42 43 L84 46 L126 28 L168 35 L210 19 L252 25 L300 9 L360 14 L360 58 L0 58 Z" fill="url(#procurementArea)" />
                  <path d="M0 51 L42 43 L84 46 L126 28 L168 35 L210 19 L252 25 L300 9 L360 14" fill="none" stroke="url(#procurementLine)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <circle cx="300" cy="9" r="3" fill="#b6f36b" stroke="#0e1110" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between border-l border-white/10 pl-3 sm:pl-4">
              <div>
                <span className="font-mono text-[0.43rem] uppercase tracking-[0.13em] text-slate-400 sm:text-[0.5rem]">
                  Active request
                </span>
                <strong className="mt-1 block font-mono text-[0.65rem] font-medium text-slate-100 sm:text-[0.8rem]">
                  RQ-0248
                </strong>
              </div>
              <div className="relative mx-auto flex size-12 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_50%,rgba(148,163,184,0.14)_50%_100%)] shadow-[0_0_22px_rgba(103,232,249,0.12)] sm:size-16">
                <div className="absolute inset-[2px] flex flex-col items-center justify-center rounded-full border border-white/10 bg-[#111514]">
                  <strong className="font-mono text-[0.58rem] font-medium text-cyan-100 sm:text-[0.72rem]">
                    AP
                  </strong>
                  <span className="font-mono text-[0.34rem] uppercase tracking-[0.12em] text-slate-500 sm:text-[0.4rem]">
                    stage 02
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-mono text-[0.4rem] uppercase text-slate-500 sm:text-[0.46rem]">
                    <span>approval</span>
                    <span className="text-cyan-200">02/04</span>
                  </div>
                  <div className="mt-1 h-px bg-white/10">
                    <div className="h-px w-1/2 bg-cyan-200 shadow-[0_0_7px_rgba(103,232,249,0.6)]" />
                  </div>
                </div>
                <div className="border border-accent/25 bg-accent/[0.06] px-2 py-1.5 font-mono text-[0.4rem] uppercase tracking-[0.08em] text-accent sm:text-[0.46rem]">
                  awaiting review
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OperationsVisual() {
  return (
    <div className="absolute inset-x-[8%] bottom-[10%] top-[23%] grid grid-cols-[23%_1fr] gap-3">
      <div className="border border-line bg-background/80 p-3">
        <div className="h-1.5 w-8 bg-accent" />
        <div className="mt-5 space-y-3">
          {["w-full", "w-4/5", "w-3/5", "w-5/6"].map((width, index) => (
            <div key={index} className={`h-1 ${width} bg-line`} />
          ))}
        </div>
      </div>
      <div className="grid grid-rows-[38%_1fr] gap-3">
        <div className="grid grid-cols-3 gap-3">
          {[42, 68, 53].map((value) => (
            <div key={value} className="border border-line bg-background/80 p-3">
              <div className="font-mono text-[0.55rem] text-muted">0{value}</div>
              <div className="mt-3 h-1 bg-line">
                <div className="h-full bg-accent/70" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2 border border-line bg-background/80 px-4 pb-4 pt-8">
          {[35, 58, 46, 78, 55, 88, 66, 92].map((height, index) => (
            <div key={index} className="flex-1 bg-line" style={{ height: `${height}%` }}>
              {index === 5 && <div className="h-full bg-accent/70" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="absolute inset-x-[8%] bottom-[10%] top-[23%] grid grid-cols-[1fr_30%] gap-3">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((column) => (
          <div key={column} className="border border-line bg-background/80 p-2.5">
            <div className={`h-1 ${column === 1 ? "w-1/2 bg-accent" : "w-2/3 bg-line"}`} />
            <div className="mt-4 space-y-2">
              {[0, 1, 2].slice(0, column === 2 ? 2 : 3).map((item) => (
                <div key={item} className="border border-line bg-surface px-2 py-2">
                  <div className="h-1 w-4/5 bg-line" />
                  <div className="mt-2 h-1 w-1/2 bg-line/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between border border-line bg-background/80 p-3">
        <div>
          <div className="font-mono text-[0.55rem] uppercase tracking-wider text-accent">automation</div>
          <div className="mt-4 space-y-2">
            <div className="h-px w-full bg-line" />
            <div className="ml-auto size-2 rounded-full border border-accent" />
            <div className="h-px w-full bg-line" />
            <div className="size-2 rounded-full bg-accent/70" />
            <div className="h-px w-full bg-line" />
          </div>
        </div>
        <div className="h-1 w-full bg-line">
          <div className="h-full w-3/4 bg-accent/70" />
        </div>
      </div>
    </div>
  );
}
