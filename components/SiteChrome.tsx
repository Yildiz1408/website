"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/ContactFooter";
import { Header } from "@/components/HeaderHero";
import { useLang, useMessages } from "@/components/lang-context";

export function SiteChrome({ children }: { children: ReactNode }) {
  const { lang, setLang } = useLang();
  const t = useMessages();
  const router = useRouter();
  const pathname = usePathname();

  const onNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === "top") {
      if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      else router.push("/");
      return;
    }
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} onNav={onNav} />
      {children}
      <Footer lang={lang} setLang={setLang} t={t} onNav={onNav} />
    </>
  );
}
