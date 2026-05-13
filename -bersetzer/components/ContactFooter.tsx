"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lang, Messages } from "@/lib/i18n";
import { BrandMark, LangSwitch } from "@/components/HeaderHero";
import { Icon } from "@/components/Icons";
import { SectionHead } from "@/components/Sections";
import { useReveal } from "@/components/useReveal";

export function Contact({ t }: { t: Messages }) {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject || undefined,
          message: form.message,
          attachmentName: fileName || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMsg(data.error ?? "Senden fehlgeschlagen.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte später erneut versuchen.");
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="section-contact">
      <div className="container">
        <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} lede={t.contact.lede} />
        <div className="contact-wrap reveal" ref={ref}>
          <aside className="contact-side">
            <div className="contact-side-title" dangerouslySetInnerHTML={{ __html: t.contact.title }} />
            <p>{t.contact.lede}</p>
            <div className="contact-list">
              {t.contact.rows.map((r, i) => {
                const icon = i === 0 ? "phone" : i === 1 ? "mail" : "pin";
                const inner = (
                  <>
                    <span className="icon">
                      <Icon name={icon} size={20} stroke={1.6} />
                    </span>
                    <div>
                      <span className="meta">{r.meta}</span>
                      <strong>{r.value}</strong>
                    </div>
                  </>
                );
                return r.href ? (
                  <a className="contact-row" key={r.meta} href={r.href}>
                    {inner}
                  </a>
                ) : (
                  <div className="contact-row" key={r.meta}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <div className="contact-hours">
              <strong>{t.contact.hours.label}</strong>
              {t.contact.hours.text.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </aside>
          <form className="contact-form" onSubmit={submit}>
            {status === "sent" ? (
              <div className="success-msg" role="status" style={{ alignItems: "flex-start", padding: "32px" }}>
                <span className="icon">
                  <Icon name="check" size={28} stroke={2} />
                </span>
                <div>
                  <strong
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    {t.contact.form.success}
                  </strong>
                  <span style={{ marginTop: 6, display: "block" }}>{t.contact.form.successSub}</span>
                </div>
              </div>
            ) : (
              <>
                {status === "error" && errorMsg && (
                  <div
                    className="success-msg"
                    role="alert"
                    style={{
                      borderColor: "#c44",
                      background: "rgba(200, 68, 68, 0.08)",
                      marginBottom: 8,
                    }}
                  >
                    <span className="icon" style={{ color: "#a33" }}>
                      !
                    </span>
                    <div>
                      <strong style={{ display: "block" }}>{errorMsg}</strong>
                    </div>
                  </div>
                )}
                <div className="form-grid">
                  <div className={`field ${form.name ? "filled" : ""}`}>
                    <input
                      type="text"
                      id="f-name"
                      value={form.name}
                      onChange={onChange("name")}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="f-name">{t.contact.form.name}</label>
                  </div>
                  <div className={`field ${form.email ? "filled" : ""}`}>
                    <input
                      type="email"
                      id="f-email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="f-email">{t.contact.form.email}</label>
                  </div>
                </div>
                <div className="form-grid">
                  <div className={`field ${form.phone ? "filled" : ""}`}>
                    <input type="tel" id="f-phone" value={form.phone} onChange={onChange("phone")} placeholder=" " />
                    <label htmlFor="f-phone">{t.contact.form.phone}</label>
                  </div>
                  <div className={`field ${form.subject ? "filled" : ""}`}>
                    <input
                      type="text"
                      id="f-subject"
                      value={form.subject}
                      onChange={onChange("subject")}
                      placeholder=" "
                    />
                    <label htmlFor="f-subject">{t.contact.form.subject}</label>
                  </div>
                </div>
                <div className={`field ${form.message ? "filled" : ""}`}>
                  <textarea id="f-msg" value={form.message} onChange={onChange("message")} placeholder=" " required />
                  <label htmlFor="f-msg">{t.contact.form.message}</label>
                </div>
                <label className="file-field">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                  <span className="icon">
                    <Icon name="paperclip" size={20} stroke={1.6} />
                  </span>
                  <div className="text">
                    <div>{fileName || t.contact.form.upload}</div>
                    <span className="hint">{t.contact.form.uploadHint}</span>
                  </div>
                  <span style={{ color: "var(--gold)" }}>
                    <Icon name="upload" size={18} stroke={1.6} />
                  </span>
                </label>
                <div className="form-actions">
                  <span className="privacy">{t.contact.form.privacy}</span>
                  <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                    {status === "sending" ? t.contact.form.sending : t.contact.form.send}
                    <Icon name="send" size={14} stroke={2} className="arrow" />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const navIds = ["leistungen", "uebersetzen", "uebermich", "anonymes-feedback", "kontakt"] as const;

export function Footer({
  t,
  lang,
  setLang,
  onNav,
}: {
  t: Messages;
  lang: Lang;
  setLang: (l: Lang) => void;
  onNav: (e: React.MouseEvent, id: string) => void;
}) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <BrandMark t={t} />
            <p className="footer-tag">{t.footer.tag}</p>
            <div style={{ marginTop: 24 }}>
              <LangSwitch lang={lang} setLang={setLang} />
            </div>
          </div>
          {t.footer.cols.map((col, i) => (
            <div className="footer-col" key={i}>
              <h5>{col.title}</h5>
              <ul>
                {col.links &&
                  col.links.map((l, j) => {
                    const id = navIds[j];
                    const href = `/#${id}`;
                    return (
                      <li key={j}>
                        <Link href={href} onClick={(e) => onNav(e, id)}>
                          {l}
                        </Link>
                      </li>
                    );
                  })}
                {col.plain &&
                  col.plain.map((l, j) => (
                    <li key={j}>
                      {j === 0 ? (
                        <a href="tel:+491749415519">{l}</a>
                      ) : j === 1 ? (
                        <a href="mailto:sel.yil@t-online.de">{l}</a>
                      ) : (
                        <span>{l}</span>
                      )}
                    </li>
                  ))}
                {col.legal && (
                  <>
                    <li>
                      <Link href="/impressum">{col.legal[0]}</Link>
                    </li>
                    <li>
                      <Link href="/datenschutz">{col.legal[1]}</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}</span>
          <div className="links">
            <Link href="/impressum">{lang === "de" ? "Impressum" : "Künye"}</Link>
            <Link href="/datenschutz">{lang === "de" ? "Datenschutz" : "Gizlilik"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
