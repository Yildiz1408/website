import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";

export const metadata: Metadata = {
  title: "Impressum — Selahattin Yıldız",
  description: "Impressum und rechtliche Angaben.",
};

export default function ImpressumPage() {
  return <LegalView doc="impressum" />;
}
