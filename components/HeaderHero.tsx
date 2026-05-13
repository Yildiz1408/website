"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang, Messages } from "@/lib/i18n";
import { HeroArchitecture, Icon, SYSeal } from "@/components/Icons";
import { useReveal } from "@/components/useReveal";

export function BrandMark({ t }: { t: Messages }) {
  const sub = t?.brand?.sub ?? "Vereidigter Dolmetscher · Übersetzer";
  const name = t?.brand?.name ?? "Selahattin Yıldız";
  return (
    <Link href="/" className="brand" aria-label={name}>
      <span className="mono">
        <span>S</span>
        <span>Y</span>
      </span>
      <span className="brand-text">
        <span className="brand-name">{name}</span>
        <span className="brand-sub">{sub}</span>
      </span>
    </Link>
  );
}

export function LangSwitch({
  lang,
  setLang,
  mobile,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <div className="lang-switch-mobile">
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {lang === "de" ? "Sprache" : "Dil"}
        </span>
        <button type="button" className={lang === "de" ? "active" : ""} onClick={() => setLang("de")}>
          DE
        </button>
        <button type="button" className={lang === "tr" ? "active" : ""} onClick={() => setLang("tr")}>
          TR
        </button>
      </div>
    );
  }
  return (
    <div className="lang-switch" role="group" aria-label={lang === "de" ? "Sprache" : "Dil"}>
      <button type="button" className={lang === "de" ? "active" : ""} onClick={() => setLang("de")} aria-pressed={lang === "de"}>
        DE
      </button>
      <div className="divider" />
      <button type="button" className={lang === "tr" ? "active" : ""} onClick={() => setLang("tr")} aria-pressed={lang === "tr"}>
        TR
      </button>
    </div>
  );
}

export function Header({
  lang,
  setLang,
  t,
  onNav,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Messages;
  onNav: (e: React.MouseEvent, id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "leistungen", label: t.nav.services },
    { id: "uebermich", label: t.nav.about },
    { id: "anonymes-feedback", label: t.nav.refs },
    { id: "kontakt", label: t.nav.contact },
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <BrandMark t={t} />
          <nav className="nav" aria-label="Hauptnavigation">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => onNav(e, item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <LangSwitch lang={lang} setLang={setLang} />
          <div className="header-cta">
            <a href="#kontakt" className="btn btn-primary" onClick={(e) => onNav(e, "kontakt")}>
              {t.nav.cta}
              <Icon name="arrow-right" size={14} stroke={2} />
            </a>
          </div>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              onNav(e, item.id);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
        <LangSwitch lang={lang} setLang={setLang} mobile />
        <a
          href="#kontakt"
          className="btn btn-primary"
          onClick={(e) => {
            onNav(e, "kontakt");
            setMenuOpen(false);
          }}
        >
          {t.nav.cta}
          <Icon name="arrow-right" size={14} stroke={2} />
        </a>
      </div>
    </>
  );
}

export function Hero({ t, onNav }: { t: Messages; onNav: (e: React.MouseEvent, id: string) => void }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const arch = el.querySelector(".hero-arch") as HTMLElement | null;
      if (arch) arch.style.transform = `translate(${x * -8}px, ${y * -6}px)`;
    };
    const node = heroRef.current;
    if (node) node.addEventListener("mousemove", onMove);
    return () => {
      if (node) node.removeEventListener("mousemove", onMove);
    };
  }, []);

  const panelIcons = ["stamp", "language", "pin", "building", "doc"];

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-stage" ref={heroRef}>
          <HeroArchitecture />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="dot" aria-hidden />
                <span className="hero-badge-text">{t.hero.badge.join(" · ")}</span>
              </div>
              <h1 className="hero-headline">
                {t.hero.headline_a}
                <br />
                <em>{t.hero.headline_b}</em>
              </h1>
              <p className="hero-sub">{t.hero.sub}</p>
              <div className="hero-trust">
                {t.hero.trust.map((v) => (
                  <div key={v}>
                    <span className="tick">
                      <Icon name="check" size={14} stroke={2.4} />
                    </span>
                    {v}
                  </div>
                ))}
              </div>
              <div className="hero-ctas">
                <a href="#kontakt" className="btn btn-primary on-deep" onClick={(e) => onNav(e, "kontakt")}>
                  {t.hero.ctaPrimary}
                  <Icon name="arrow-right" size={14} stroke={2} className="arrow" />
                </a>
                <a href="#leistungen" className="btn btn-ghost on-deep" onClick={(e) => onNav(e, "leistungen")}>
                  {t.hero.ctaSecondary}
                  <Icon name="arrow-right" size={14} stroke={2} className="arrow" />
                </a>
              </div>
              <div className="hero-contact">
                <a href="tel:+491749415519">
                  <span className="icon">
                    <Icon name="phone" size={14} stroke={1.8} />
                  </span>
                  0174 / 94 155 19
                </a>
                <a href="mailto:sel.yil@t-online.de">
                  <span className="icon">
                    <Icon name="mail" size={14} stroke={1.8} />
                  </span>
                  sel.yil@t-online.de
                </a>
              </div>
            </div>

            <div className="hero-panel-wrap">
              <div className="hero-panel">
                <div className="seal">
                  <SYSeal className="seal-svg" />
                </div>
                <ul className="hero-panel-list">
                  {t.hero.panelList.map((item, i) => (
                    <li key={item}>
                      <span className="icon">
                        <Icon name={panelIcons[i] ?? "check"} size={16} stroke={1.6} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hero-floats">
                {t.hero.floats.map((f, i) => (
                  <div className="float-card" key={`${f.t}-${i}`}>
                    <span className="float-icon">
                      <Icon name={i === 0 ? "clock" : i === 1 ? "lock" : "check"} size={20} stroke={1.6} />
                    </span>
                    <div className="float-card-text">
                      <div className="float-card-title">{f.t}</div>
                      <div className="float-card-sub">{f.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar({ t }: { t: Messages }) {
  const ref = useReveal();
  const icons = ["shield", "language", "pin", "pillars"];
  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-bar-inner reveal-stagger" ref={ref}>
          {t.trustBar.map((item, i) => (
            <div className="trust-cell" key={item.l}>
              <span className="icon">
                <Icon name={icons[i]} size={20} stroke={1.5} />
              </span>
              <div>
                <div className="label">{item.l}</div>
                <div className="desc">{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
