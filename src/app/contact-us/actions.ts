"use server";

export type ContactRequestState = {
  status: "success" | "error";
  name?: string;
  phone?: string;
  email?: string;
  fieldErrors?: {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  };
};

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactRequest(
  _previous: ContactRequestState | null,
  formData: FormData,
): Promise<ContactRequestState> {
  const name = clean(formData.get("name"));
  const phone = clean(formData.get("phone"));
  const email = clean(formData.get("email"));
  const message = clean(formData.get("message"));
  const digits = phone.replace(/\D/g, "");
  const fieldErrors: ContactRequestState["fieldErrors"] = {};

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Enter your name.";
  }

  if (digits.length < 10 || digits.length > 15 || phone.length > 20) {
    fieldErrors.phone = "Enter a phone number we can reach you on.";
  }

  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (message.length < 10 || message.length > 2000) {
    fieldErrors.message = "Tell us how we can help.";
  }

  if (fieldErrors.name || fieldErrors.phone || fieldErrors.email || fieldErrors.message) {
    return { status: "error", fieldErrors };
  }

  return {
    status: "success",
    name,
    phone,
    email,
  };
}
