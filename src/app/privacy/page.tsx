import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Tresra",
  description: legalDocuments.privacy.intro,
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={legalDocuments.privacy} />;
}
