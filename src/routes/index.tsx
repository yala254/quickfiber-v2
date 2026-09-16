import { createFileRoute } from "@tanstack/react-router";
import {
  Wifi,
  ShieldCheck,
  Gauge,
  Users,
  Tv,
  Zap,
  Wrench,
  MonitorPlay,
  Wallet,
  Headphones,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Check,
} from "lucide-react";

import { Header, Logo } from "@/components/site/Header";
import { Pricing } from "@/components/site/Pricing";
import { homePlans, businessPlans, waLink } from "@/data/packages";
import heroImage from "@/assets/hero-fiber.jpg";
import coverageImage from "@/assets/coverage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quick Fiber | Fast Fibre Internet in Kenya from Ksh 2,999" },
      {
        name: "description",
        content:
          "Quick Fiber delivers unlimited home and business fibre internet across Kenya. Packages from 25 to 100 Mbps, free installation and 24/7 support.",
      },
      { property: "og:title", content: "Quick Fiber | Fast Fibre Internet in Kenya" },
      {
        property: "og:description",
        content:
          "Unlimited home, business, reseller and enterprise fibre packages with free installation and 24/7 support.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Wifi,
    title: "Wifi Seamless",
    text: "Uninterrupted connectivity for every wireless device, with smooth transitions room to room.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated IP",
    text: "Dedicated IPs so you stay secure while handling your most crucial data.",
  },
  {
    icon: Gauge,
    title: "Upgrade Speed",
    text: "Effortlessly increase your internet speed to match your needs, from the comfort of home.",
  },
  {
    icon: Users,
    title: "Multi-Connections",
    text: "We securely establish uninterrupted connections with as many devices as you wish.",
  },
];

const perks = [
  { icon: Tv, label: "250+ Channels" },
  { icon: Zap, label: "Speed Seamless" },
  { icon: Wrench, label: "Free Installation" },
  { icon: MonitorPlay, label: "4K & 8K Quality" },
  { icon: Wallet, label: "Flexible Tariff Plans" },
  { icon: Headphones, label: "Fast Support 24/7" },
];

function Index() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="relative isolate min-h-[42rem] overflow-hidden bg-navy">
        <img
          src={heroImage}
          alt="Fibre-connected living room glowing at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <Header />
        <div className="relative mx-auto flex min-h-[42rem] max-w-7xl flex-col justify-center px-6 pb-20 pt-48">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-foreground/15">
              <Zap className="h-4 w-4 text-primary" />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-navy-foreground">
              Fast Connections
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl text-6xl font-bold uppercase leading-[0.95] text-navy-foreground sm:text-7xl lg:text-8xl">
            Connect faster with Quick
          </h1>
          <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {["Home Connect+", "Business Connect+", "Reseller Connect+", "Enterprise Connect+"].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-lg font-semibold text-navy-foreground"
                >
                  <Check className="h-5 w-5 text-primary" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-brand btn-brand-hover">
              Get Connected <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#home-connect" className="btn-outline-light">
              View Packages
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Quick Fiber ISP Features</p>
            <h2 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">
              Leading Internet Service Provider
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-3xl border border-border bg-card p-8 shadow-card transition-colors hover:border-primary"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent transition-colors group-hover:bg-primary">
                  <Icon className="h-7 w-7 text-navy" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Pricing
        id="home-connect"
        eyebrow="Pricing Package"
        title="Home Connect+ Offers"
        subtitle="Unlimited fibre for your household, with free installation and a free Wi-Fi router."
        plans={homePlans}
      />

      {/* Perks strip */}
      <section className="bg-navy py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-3 lg:grid-cols-6">
          {perks.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-foreground/10">
                <Icon className="h-6 w-6 text-primary" />
              </span>
              <p className="font-semibold text-navy-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing
        id="business-connect"
        eyebrow="Pricing Package"
        title="Business Connect+ Offers"
        subtitle="Symmetrical, unlimited business fibre with CCTV backup and a free Wi-Fi router."
        plans={businessPlans}
      />

      {/* Reseller / coverage */}
      <section id="reseller" className="bg-background py-24" style={{ scrollMarginTop: "6rem" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <img
            src={coverageImage}
            alt="Technician connecting a fibre cable to a Wi-Fi router"
            width={1200}
            height={912}
            loading="lazy"
            className="rounded-3xl object-cover shadow-card"
          />
          <div>
            <p className="eyebrow">Get Blazing Fast Internet</p>
            <h2 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">
              Quick Fiber is available to all parts of the country
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              At Quick Fiber, we pride ourselves on providing reliable and high-speed internet access
              to every part of the country. Whether you are in a bustling city or a remote rural
              area, our extensive network ensures that you stay connected with fast and dependable
              service.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Reseller Connect+ partnerships",
                "Enterprise dedicated links",
                "Free professional installation",
                "24/7 local technical support",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2 font-semibold text-navy">
                  <Check className="h-5 w-5 text-primary" /> {item}
                </p>
              ))}
            </div>
            <a
              href={waLink("a Reseller Connect+ partnership")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand btn-brand-hover mt-9"
            >
              Become a Reseller <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="bg-primary py-20 text-primary-foreground"
        style={{ scrollMarginTop: "6rem" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Call us now to get connected</h2>
          <a
            href="tel:+254797575757"
            className="font-display text-5xl font-bold sm:text-6xl hover:opacity-80"
          >
            +254 797 575 757
          </a>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waLink("Quick Fiber internet")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-navy px-8 py-3.5 font-bold text-navy-foreground transition-colors hover:bg-navy-soft"
            >
              Chat on WhatsApp
            </a>
            <a
              href="mailto:sales@quickfiber.co.ke"
              className="rounded-full border-2 border-navy px-8 py-3.5 font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
            >
              Email Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pb-8 pt-16 text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
              Quick Fiber is an internet service provider delivering fast, reliable and affordable
              fibre connections for homes and businesses in Kenya.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Packages</h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
              <li>
                <a href="#home-connect" className="hover:text-primary">
                  Home Connect+
                </a>
              </li>
              <li>
                <a href="#business-connect" className="hover:text-primary">
                  Business Connect+
                </a>
              </li>
              <li>
                <a href="#reseller" className="hover:text-primary">
                  Reseller Connect+
                </a>
              </li>
              <li>
                <a href="#reseller" className="hover:text-primary">
                  Enterprise Connect+
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +254 797 575 757
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> sales@quickfiber.co.ke
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Kirinyaga Road, General
                Waruingi Street, Thika Road & Kasarani Mwiki Road, Nairobi
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Support hours</h3>
            <p className="mt-4 text-sm text-navy-foreground/70">
              Our support team is available 24 hours a day, 7 days a week for installations, upgrades
              and troubleshooting.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-navy-foreground/15 px-6 pt-6 text-center text-xs text-navy-foreground/60">
          &copy; {new Date().getFullYear()} Quick Fiber. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
