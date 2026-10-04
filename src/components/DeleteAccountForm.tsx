"use client";

import { useActionState } from "react";
import { requestAccountDeletion, type DeletionRequestState } from "@/app/delete-account/actions";

const initialState: DeletionRequestState | null = null;

export function DeleteAccountForm() {
  const [state, formAction, pending] = useActionState(requestAccountDeletion, initialState);

  if (state?.status === "success") {
    return (
      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 md:p-6" role="status">
        <h2 className="mb-2 text-lg font-extrabold">Request submitted</h2>
        <p className="text-sm leading-relaxed text-on-surface-variant md:text-[15px]">
          We have your request for <strong className="text-on-surface">{state.shopName}</strong>. Tresra will confirm it on{" "}
          <strong className="text-on-surface">{state.phone}</strong> before anything is deleted. After you confirm, the account is deleted within 30 days, and we will tell you when it is done.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-primary/10 bg-white/70 p-5 md:p-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-bold">
          Phone number you used to sign up
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="e.g. 9876543210"
          className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
        {state?.fieldErrors?.phone && <p className="text-sm text-error">{state.fieldErrors.phone}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="shopName" className="block text-sm font-bold">
          Shop name
        </label>
        <input
          id="shopName"
          name="shopName"
          type="text"
          autoComplete="organization"
          required
          maxLength={120}
          className="w-full rounded-xl border border-outline-variant/40 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
        {state?.fieldErrors?.shopName && <p className="text-sm text-error">{state.fieldErrors.shopName}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit deletion request"}
      </button>
    </form>
  );
}
