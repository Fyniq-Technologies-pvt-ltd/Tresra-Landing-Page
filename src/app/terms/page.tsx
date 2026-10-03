import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Tresra",
  description: legalDocuments.terms.intro,
};

export default function TermsPage() {
  return <LegalPage document={legalDocuments.terms} />;
}
