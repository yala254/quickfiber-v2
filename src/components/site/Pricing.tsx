import { Check } from "lucide-react";
import { waLink, type Plan } from "@/data/packages";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  plans: Plan[];
  tone?: "light" | "dark";
};

function SpeedGauge({
  speed,
  max,
  accent,
}: {
  speed: number;
  max: number;
  accent: string;
}) {
  const pct = Math.min(speed / max, 1);
  // Semicircular arc from (14,70) to (126,70), radius 56
  const arcLen = Math.PI * 56;
  const dash = pct * arcLen;
  const angle = -90 + pct * 180; // needle rotation, -90 = left, +90 = right

  const arcPath = "M 14 70 A 56 56 0 0 1 126 70";

  return (
    <svg
      viewBox="0 0 140 78"
      className="h-20 w-36"
      role="img"
      aria-label={`Speed gauge: ${speed} Mbps`}
    >
      {/* tick marks */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (-90 + (i / 6) * 180) * (Math.PI / 180);
        const x1 = 70 + Math.sin(a) * 62;
        const y1 = 70 - Math.cos(a) * 62;
        const x2 = 70 + Math.sin(a) * 68;
        const y2 = 70 - Math.cos(a) * 68;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity={i / 6 <= pct ? 0.8 : 0.25}
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      })}
      {/* track */}
      <path d={arcPath} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={7} strokeLinecap="round" />
      {/* filled arc */}
      <path
        d={arcPath}
        fill="none"
        stroke={accent}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${arcLen}`}
      />
      {/* needle */}
      <g transform={`rotate(${angle} 70 70)`}>
        <line x1={70} y1={70} x2={70} y2={26} stroke={accent} strokeWidth={3} strokeLinecap="round" />
      </g>
      <circle cx={70} cy={70} r={5} fill={accent} />
    </svg>
  );
}

export function Pricing({ id, eyebrow, title, subtitle, plans, tone = "light" }: Props) {
  const dark = tone === "dark";
  const maxSpeed = Math.max(...plans.map((p) => p.speed));

  return (
    <section
      id={id}
      className={dark ? "bg-navy py-24 text-navy-foreground" : "bg-surface py-24"}
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            className={`mt-3 text-4xl font-bold sm:text-5xl ${dark ? "text-navy-foreground" : "text-navy"}`}
          >
            {title}
          </h2>
          <p className={`mt-4 ${dark ? "text-navy-foreground/70" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1.5 ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : dark
                    ? "border border-navy-foreground/15 bg-navy-soft"
                    : "bg-card shadow-card"
              }`}
            >
              <h3
                className={`text-2xl font-bold ${plan.featured ? "text-primary-foreground" : dark ? "text-navy-foreground" : "text-navy"}`}
              >
                {plan.name.replace(" Business Connect package", " Package")}
              </h3>
              <p
                className={`mt-4 text-xs font-bold uppercase tracking-widest ${
                  plan.featured
                    ? "text-primary-foreground/70"
                    : dark
                      ? "text-navy-foreground/60"
                      : "text-muted-foreground"
                }`}
              >
                Up to
              </p>
              <p className="flex items-baseline gap-1">
                <span
                  className={`font-display text-6xl font-bold leading-none ${
                    plan.featured
                      ? "text-primary-foreground"
                      : dark
                        ? "text-primary"
                        : "text-navy"
                  }`}
                >
                  {plan.speed}
                </span>
                <span
                  className={`text-lg font-semibold ${plan.featured ? "text-primary-foreground/80" : dark ? "text-navy-foreground/70" : "text-muted-foreground"}`}
                >
                  Mbps
                </span>
              </p>
              <p
                className={`mt-3 text-xl font-bold ${plan.featured ? "text-primary-foreground" : dark ? "text-navy-foreground" : "text-navy"}`}
              >
                {plan.price}
                <span className="text-sm font-medium opacity-70"> /Month</span>
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={
                        plan.featured
                          ? "text-primary-foreground/90"
                          : dark
                            ? "text-navy-foreground/75"
                            : "text-muted-foreground"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 rounded-full py-3 text-center font-bold transition-colors ${
                  plan.featured
                    ? "bg-navy text-navy-foreground hover:bg-navy-soft"
                    : "bg-primary text-primary-foreground hover:brightness-105"
                }`}
              >
                Purchase Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
