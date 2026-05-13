"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Contact } from "@/components/ContactFooter";
import { Hero, TrustBar } from "@/components/HeaderHero";
import { About, Links, Notes, References, Services, Translate } from "@/components/Sections";
import { useMessages } from "@/components/lang-context";

function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const run = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);
}

export function HomeMain() {
  const t = useMessages();
  useHashScroll();

  const onNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main id="main-content">
      <Hero t={t} onNav={onNav} />
      <TrustBar t={t} />
      <Services t={t} />
      <Translate t={t} />
      <Notes t={t} />
      <About t={t} onNav={onNav} />
      <Links t={t} />
      <References t={t} />
      <Contact t={t} />
    </main>
  );
}
