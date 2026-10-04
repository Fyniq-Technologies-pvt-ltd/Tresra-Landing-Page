import type { Metadata } from "next";
import Link from "next/link";
import { DeleteAccountForm } from "@/components/DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete your Tresra Studio account",
  description:
    "Shop owners can request deletion of a Tresra Studio account from a browser, without installing the app.",
};

const deletedData = [
  "The owner profile: name, phone number, and email",
  "The shop profile: name, address, map location, business hours, and photos",
  "Staff records: name, phone, email, address, job, and photo",
  "Customer records: name, phone, email, gender, and booking history",
  "The signed-in device's notification token",
];

export default function DeleteAccountPage() {
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
          Tresra Studio
        </p>
        <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">Delete your Tresra Studio account</h1>
        <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
          This page is for the shop owner who signed up with a phone number. Staff and customers do not have their own login in this app, so their records are deleted as part of the shop account.
        </p>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
          You can request deletion from this page in a browser. You do not need to install Tresra Studio.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-extrabold">How to request deletion</h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
            <li>Enter the phone number you used to sign up, plus the shop name.</li>
            <li>Submit the form. You will get a confirmation on that number.</li>
            <li>Tresra deletes the account within 30 days and tells you when it is done.</li>
          </ol>
        </section>

        <div className="mt-8">
          <DeleteAccountForm />
        </div>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-extrabold">What is deleted</h2>
          <ul className="space-y-2.5">
            {deletedData.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-extrabold">How we confirm it is you</h2>
          <p className="text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
            We confirm the request with the registered phone number before deleting, so someone else cannot delete a shop by submitting the form.
          </p>
        </section>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
