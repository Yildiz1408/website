"use client";

import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useMessages } from "@/components/lang-context";

export type LegalDoc = "impressum" | "datenschutz";

export function LegalView({ doc }: { doc: LegalDoc }) {
  const t = useMessages();
  const data = t[doc];
  const monthYear = new Intl.DateTimeFormat("de-DE", { year: "numeric", month: "long" }).format(new Date());
  const meta = data.meta.replace("{monthYear}", monthYear);

  return (
    <main className="legal-page">
      <div className="container">
        <div className="legal-card">
          <h1>{data.title}</h1>
          <span className="meta">{meta}</span>
          {data.sections.map((s, i) => (
            <div key={i}>
              <h2>{s.h}</h2>
              {s.p.split("\n").map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          ))}
          <Link href="/" className="legal-back">
            <Icon name="arrow-right" size={12} stroke={2} style={{ transform: "rotate(180deg)" }} />
            {data.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
