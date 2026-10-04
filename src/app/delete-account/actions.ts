"use server";

export type DeletionRequestState = {
  status: "success" | "error";
  message?: string;
  phone?: string;
  shopName?: string;
  fieldErrors?: {
    phone?: string;
    shopName?: string;
  };
};

const emptyState: DeletionRequestState = { status: "error" };

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function requestAccountDeletion(
  _previous: DeletionRequestState | null,
  formData: FormData,
): Promise<DeletionRequestState> {
  const phone = clean(formData.get("phone"));
  const shopName = clean(formData.get("shopName"));
  const digits = phone.replace(/\D/g, "");
  const fieldErrors: DeletionRequestState["fieldErrors"] = {};

  if (digits.length < 10 || digits.length > 15 || phone.length > 20) {
    fieldErrors.phone = "Enter the phone number you used to sign up.";
  }

  if (shopName.length < 2 || shopName.length > 120) {
    fieldErrors.shopName = "Enter the shop name.";
  }

  if (fieldErrors.phone || fieldErrors.shopName) {
    return { ...emptyState, fieldErrors };
  }

  return {
    status: "success",
    phone,
    shopName,
    message:
      "Request submitted. Tresra will confirm it on this phone number before any account is deleted. After you confirm, the account is deleted within 30 days, and we will tell you when it is done.",
  };
}
