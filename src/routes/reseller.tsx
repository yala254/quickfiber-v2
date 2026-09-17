import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Gauge,
  TrendingUp,
  HandCoins,
  Headset,
  ArrowRight,
  ArrowLeft,
  Zap,
  Wallet,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/reseller")({
  head: () => ({
    meta: [
      { title: "Reseller Connect+ — Quick Fiber Capacity Calculator" },
      {
        name: "description",
        content:
          "Become a Quick Fiber reseller. Buy bandwidth capacity from Ksh 150 per Mbps, scale up to 10,000 Mbps, and grow your own ISP business.",
      },
      { property: "og:title", content: "Reseller Connect+ — Quick Fiber Capacity Calculator" },
      {
        property: "og:description",
        content:
          "Buy bandwidth capacity from Ksh 150 per Mbps, scale up to 10,000 Mbps, and grow your own ISP business with Quick Fiber.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResellerPage,
});

const RATE_PER_MBPS = 150;
const MAX_CAPACITY = 10000;
const MIN_CAPACITY = 100;
const STEP = 100;

function waLink(message: string) {
  return `https://wa.me/254797575757?text=${encodeURIComponent(`Hello Quick Fiber, I'm interested in ${message}.`)}`;
}

/** Fade/slide content in when it scrolls into view. */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/** Smoothly counts toward a target number. */
function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    const from = prev.current;
    const to = target;
    prev.current = target;
    if (from === to) return;
    const duration = 400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

const fmt = (n: number) => n.toLocaleString("en-KE");

function ResellerPage() {
  const [capacity, setCapacity] = useState(100);
  const monthlyCost = capacity * RATE_PER_MBPS;
  const animatedCost = useAnimatedNumber(monthlyCost);
  const animatedCapacity = useAnimatedNumber(capacity);
  const barPct = (capacity / MAX_CAPACITY) * 100;
  // Suggested retail at Ksh 3,000 per 30 Mbps customer
  const customers = Math.max(1, Math.floor(capacity / 30));
  const revenue = customers * 3000;
  const animatedRevenue = useAnimatedNumber(revenue);
  const profit = Math.max(0, revenue - monthlyCost);
  const animatedProfit = useAnimatedNumber(profit);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pb-20 pt-40 text-navy-foreground sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <Reveal>
            <p className="eyebrow">Reseller Connect+</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Start your own ISP with{" "}
              <span className="text-primary">Quick Fiber capacity</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-navy-foreground/80">
              Buy bulk bandwidth at <strong className="text-primary">Ksh {RATE_PER_MBPS} per Mbps</strong>,
              resell it under your own brand, and scale all the way to{" "}
              <strong>{fmt(MAX_CAPACITY)} Mbps</strong>. Use the calculator below to see your numbers instantly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Gauge className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-3xl font-bold uppercase">Capacity calculator</h2>
                <p className="text-sm text-muted-foreground">
                  Drag the slider — prices update live at Ksh {RATE_PER_MBPS} per Mbps.
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <label htmlFor="capacity" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Bandwidth capacity
                </label>
                <span className="font-display text-4xl font-bold text-foreground">
                  {fmt(animatedCapacity)} <span className="text-xl text-primary">Mbps</span>
                </span>
              </div>
              <input
                id="capacity"
                type="range"
                min={MIN_CAPACITY}
                max={MAX_CAPACITY}
                step={STEP}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                aria-label="Bandwidth capacity in Mbps"
                className="mt-4 w-full accent-[oklch(0.76_0.2_130)]"
              />
              <div className="mt-1 flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{fmt(MIN_CAPACITY)} Mbps</span>
                <span>{fmt(MAX_CAPACITY)} Mbps</span>
              </div>
            </div>

            {/* Capacity graph */}
            <div className="mt-8">
              <div className="h-6 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${barPct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
                {[0, 2500, 5000, 7500, 10000].map((m) => (
                  <span key={m}>{fmt(m)}</span>
                ))}
              </div>
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {barPct.toFixed(1)}% of max capacity
              </p>
            </div>

            {/* Results */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Wallet,
                  label: "Your monthly cost",
                  value: `Ksh ${fmt(animatedCost)}`,
                  sub: `${fmt(capacity)} Mbps × Ksh ${RATE_PER_MBPS}`,
                  highlight: true,
                },
                {
                  icon: Users,
                  label: "Est. customers",
                  value: fmt(customers),
                  sub: "at ~30 Mbps per customer",
                },
                {
                  icon: TrendingUp,
                  label: "Est. revenue",
                  value: `Ksh ${fmt(animatedRevenue)}`,
                  sub: "at ~Ksh 3,000 per customer",
                },
                {
                  icon: HandCoins,
                  label: "Est. profit",
                  value: `Ksh ${fmt(animatedProfit)}`,
                  sub: "revenue minus capacity cost",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border p-5 transition-all duration-300 ${
                    card.highlight
                      ? "border-primary bg-accent shadow-glow"
                      : "border-border bg-background"
                  }`}
                >
                  <card.icon className="h-6 w-6 text-primary" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold text-foreground">{card.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={waLink(`a Reseller Connect+ partnership with ${fmt(capacity)} Mbps capacity`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand btn-brand-hover"
              >
                Get {fmt(capacity)} Mbps capacity <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-sm text-muted-foreground">
                Revenue and profit are estimates — your retail pricing is up to you.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why resell */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow">Why partner with us</p>
            <h2 className="mt-2 text-4xl font-bold uppercase sm:text-5xl">
              Everything you need to resell
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Wholesale rates",
                text: `Flat Ksh ${RATE_PER_MBPS} per Mbps with volume capacity up to ${fmt(MAX_CAPACITY)} Mbps — the more you buy, the bigger your margin.`,
              },
              {
                icon: TrendingUp,
                title: "Scale on demand",
                text: "Start small and upgrade capacity as your customer base grows. No need to rebuild your network.",
              },
              {
                icon: Headset,
                title: "24/7 backbone support",
                text: "Our NOC team keeps the upstream network running around the clock so you can focus on your customers.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-card transition-transform duration-200 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold uppercase">{f.title}</h3>
                  <p className="mt-3 text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 text-center text-navy-foreground">
        <Reveal>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-4xl font-bold uppercase sm:text-5xl">
              Ready to become a <span className="text-primary">reseller?</span>
            </h2>
            <p className="mt-4 text-lg text-navy-foreground/80">
              Talk to our team on WhatsApp and we'll set up your capacity within days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink("a Reseller Connect+ partnership")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand btn-brand-hover"
              >
                Chat on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/30 px-6 py-3 font-semibold text-navy-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" /> Back to packages
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
