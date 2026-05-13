import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";

export const metadata: Metadata = {
  title: "Datenschutz — Selahattin Yıldız",
  description: "Datenschutzerklärung.",
};

export default function DatenschutzPage() {
  return <LegalView doc="datenschutz" />;
}
