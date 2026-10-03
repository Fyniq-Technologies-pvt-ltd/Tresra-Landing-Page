import Link from "next/link";
import type { LegalDocument } from "@/lib/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
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
          {document.badge}
        </p>
        <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">{document.title}</h1>
        <p className="mb-8 text-sm font-bold text-primary">{document.effectiveDate}</p>
        <p className="mb-10 text-base leading-relaxed text-on-surface-variant md:text-lg">{document.intro}</p>

        <div className="space-y-8">
          {document.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-extrabold">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
                      <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-8 bg-purple-50">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">© 2026 Tresra. All rights reserved.</p>
          <div className="flex gap-8 text-sm">
            <Link href="/privacy" className="text-slate-500 transition-colors hover:text-purple-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 transition-colors hover:text-purple-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
