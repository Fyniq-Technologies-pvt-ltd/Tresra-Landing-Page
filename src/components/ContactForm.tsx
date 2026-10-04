"use client";

import { useActionState } from "react";
import { submitContactRequest, type ContactRequestState } from "@/app/contact-us/actions";

const initialState: ContactRequestState | null = null;

const fieldClass =
  "w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none focus:border-primary";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactRequest, initialState);

  if (state?.status === "success") {
    return (
      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 md:p-6" role="status">
        <h2 className="mb-2 text-lg font-extrabold">Message sent</h2>
        <p className="text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
          Thanks, <strong className="text-on-surface">{state.name}</strong>. We have your message and will reach you at{" "}
          <strong className="text-on-surface">{state.phone}</strong>
          {state.email ? (
            <>
              {" "}
              or <strong className="text-on-surface">{state.email}</strong>
            </>
          ) : null}
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-primary/10 bg-white/70 p-5 md:p-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-bold">
          Your name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={80} className={fieldClass} />
        {state?.fieldErrors?.name && <p className="text-sm text-error">{state.fieldErrors.name}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-bold">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="e.g. 9876543210"
          className={fieldClass}
        />
        {state?.fieldErrors?.phone && <p className="text-sm text-error">{state.fieldErrors.phone}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-bold">
          Email <span className="font-medium text-on-surface-variant">(optional)</span>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={120} className={fieldClass} />
        {state?.fieldErrors?.email && <p className="text-sm text-error">{state.fieldErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-bold">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className={`${fieldClass} resize-y`}
        />
        {state?.fieldErrors?.message && <p className="text-sm text-error">{state.fieldErrors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
