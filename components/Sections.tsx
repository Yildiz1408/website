"use client";

import type { Messages } from "@/lib/i18n";
import { AboutVisual, Icon, SYSeal } from "@/components/Icons";
import { useReveal } from "@/components/useReveal";

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = true,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  const ref = useReveal();
  return (
    <div
      className="section-head reveal"
      ref={ref}
      style={center ? {} : { textAlign: "left", alignItems: "flex-start" }}
    >
      <span className="eyebrow center">{eyebrow}</span>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {lede && (
        <p className="lede" style={{ textAlign: center ? "center" : "left" }}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function Services({ t }: { t: Messages }) {
  const ref = useReveal();
  const icons = ["gavel", "pillars", "doc", "people"];
  return (
    <section id="leistungen" className="section-services">
      <div className="container">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} lede={t.services.lede} />
        <div className="service-grid reveal-stagger" ref={ref}>
          {t.services.items.map((s, i) => (
            <article className="service-card" key={s.n}>
              <div className="service-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="service-icon">
                <Icon name={icons[i]} size={28} stroke={1.3} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Translate({ t }: { t: Messages }) {
  const ref = useReveal();
  const icons = ["medical", "gavel", "graduation", "contract", "folder"];
  return (
    <section id="uebersetzen" className="section-translate">
      <div className="container">
        <SectionHead eyebrow={t.translate.eyebrow} title={t.translate.title} lede={t.translate.lede} />
        <div className="translate-grid reveal-stagger" ref={ref}>
          {t.translate.cats.map((c, i) => (
            <div className="cat-card" key={c.t}>
              <div className="cat-head">
                <span className="cat-icon">
                  <Icon name={icons[i]} size={22} stroke={1.4} />
                </span>
                <h3 className="cat-card-title">{c.t}</h3>
              </div>
              <ul>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="translate-callout">
          <span className="icon">
            <Icon name="briefcase" size={22} stroke={1.5} />
          </span>
          <div className="text">
            <strong>{t.translate.callout.label}</strong>
            {t.translate.callout.text}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Notes({ t }: { t: Messages }) {
  const refSide = useReveal();
  const refList = useReveal();
  return (
    <section className="section-notes">
      <div className="container">
        <div className="notes-wrap">
          <aside className="notes-side reveal" ref={refSide}>
            <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>
              {t.notes.eyebrow}
            </span>
            <h2 dangerouslySetInnerHTML={{ __html: t.notes.title }} />
            <p>{t.notes.lede}</p>
            <div className="seal-mini">
              <SYSeal size={84} onDark />
              <div>
                <div className="label">{t.notes.seal.label}</div>
                <div className="auth">{t.notes.seal.auth}</div>
              </div>
            </div>
          </aside>
          <div className="notes-list reveal-stagger" ref={refList}>
            {t.notes.items.map((item, i) => (
              <div className="note-item" key={i}>
                <span className="num">0{i + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About({ t, onNav }: { t: Messages; onNav: (e: React.MouseEvent, id: string) => void }) {
  const ref = useReveal();
  return (
    <section id="uebermich" className="section-about">
      <div className="container">
        <div className="about-wrap reveal" ref={ref}>
          <div className="about-visual">
            <AboutVisual />
            <div className="crest">
              <SYSeal size={180} onDark />
            </div>
            <div className="crest-text">{t.about.crest}</div>
          </div>
          <div className="about-content">
            <span className="eyebrow center">{t.about.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.about.title }} />
            <div className="about-body" style={{ marginTop: 28 }}>
              {t.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="about-stats">
              {t.about.stats.map((s) => (
                <div className="about-stat" key={s.l}>
                  <div className="v">{s.v}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="about-cta">
              <a href="#kontakt" className="btn btn-primary" onClick={(e) => onNav(e, "kontakt")}>
                {t.about.cta}
                <Icon name="arrow-right" size={14} stroke={2} className="arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Links({ t }: { t: Messages }) {
  const ref = useReveal();
  return (
    <section className="links-section">
      <div className="container">
        <SectionHead eyebrow={t.links.eyebrow} title={t.links.title} />
        <div className="links-grid reveal-stagger" ref={ref}>
          {t.links.items.map((l) => (
            <a className="link-card" key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <Icon name="globe" size={22} stroke={1.5} />
              </span>
              <div className="body">
                <div className="title">{l.title}</div>
                <div className="url">{l.display}</div>
              </div>
              <span className="arrow">
                <Icon name="arrow-up-right" size={18} stroke={1.8} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function References({ t }: { t: Messages }) {
  const ref = useReveal();
  return (
    <section id="anonymes-feedback" className="section-refs">
      <div className="container">
        <SectionHead eyebrow={t.refs.eyebrow} title={t.refs.title} />
        <div className="refs-grid reveal-stagger" ref={ref}>
          {t.refs.items.map((r, i) => (
            <article className="ref-card" key={i}>
              <div className="quote-mark">“</div>
              <blockquote>{r.quote}</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
