import { useState } from "react";
import { Mail, Phone, Menu, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Home Connect+", href: "#home-connect" },
  { label: "Business Connect+", href: "#business-connect" },
  { label: "Reseller", href: "#reseller" },
  { label: "Contact Us", href: "#contact" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-baseline font-display text-3xl font-bold leading-none">
      <span className="text-navy-foreground">qu</span>
      <span className="relative text-navy-foreground">
        i
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
      </span>
      <span className="text-navy-foreground">ck</span>
      <span className="ml-1 text-lg font-semibold text-primary">Fiber</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="hidden border-b border-navy-foreground/15 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-sm text-navy-foreground/85">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> sales@quickfiber.co.ke
            </span>
            <span className="hidden text-navy-foreground/40 sm:inline">|</span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4 text-primary" /> +254 797 575 757
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#contact"
                aria-label="Quick Fiber social profile"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-foreground/95 text-navy transition-colors hover:bg-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-semibold text-navy-foreground/90 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#home-connect" className="btn-brand btn-brand-hover hidden sm:inline-flex">
            Get Started
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="text-navy-foreground lg:hidden"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 rounded-2xl bg-navy p-4 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-semibold text-navy-foreground hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
