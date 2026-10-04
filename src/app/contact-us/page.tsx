import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us | Tresra",
  description: "Send Tresra a message with your name, phone number, and question. No account is required.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="sticky top-0 z-50 border-b border-purple-200/15 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/">
            <img src="/logo.png" alt="Tresra Logo" className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-primary hover:opacity-80">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold tracking-widest text-primary uppercase">
          Contact
        </p>
        <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">Contact us</h1>
        <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
          Tell us who you are, how to reach you, and what you need. You can send this from a browser. You do not need an account.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </main>

      <footer className="mt-8 bg-purple-50">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">© 2026 Tresra. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/privacy" className="text-slate-500 transition-colors hover:text-purple-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 transition-colors hover:text-purple-500">
              Terms of Service
            </Link>
            <Link href="/delete-account" className="text-slate-500 transition-colors hover:text-purple-500">
              Delete account
            </Link>
            <Link href="/contact-us" className="text-slate-500 transition-colors hover:text-purple-500">
              Contact us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
