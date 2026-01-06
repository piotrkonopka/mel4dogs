/**
 * Form Submission Utilities
 * Web3Forms integration for static sites
 *
 * @see https://docs.web3forms.com/
 */

import {
  WEB3FORMS_API_ENDPOINT,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_CONFIG,
  type Web3FormsResponse,
  type Web3FormsErrorResponse,
} from "@/lib/config/web3forms";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dogName?: string;
  dogAge?: string;
  dogWeight?: string;
  service: string;
  message: string;
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit form to Web3Forms API
 * Uses fetch API for async submission without page reload
 *
 * @param data - Form data to submit
 * @returns Promise with submission result
 *
 * @example
 * ```tsx
 * const result = await submitContactForm(formData);
 * if (result.success) {
 *   console.log('Form submitted successfully');
 * }
 * ```
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<SubmissionResponse> {
  try {
    // Prepare form data for Web3Forms
    const formData = new FormData();

    // Required: Access key
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    // Required: Form fields
    formData.append("name", data.name.trim());
    formData.append("email", data.email.trim());
    formData.append("phone", data.phone.trim());
    formData.append("service", data.service);
    formData.append("message", data.message.trim());

    // Optional: Dog information
    if (data.dogName?.trim()) {
      formData.append("dog_name", data.dogName.trim());
    }
    if (data.dogAge?.trim()) {
      formData.append("dog_age", data.dogAge.trim());
    }
    if (data.dogWeight?.trim()) {
      formData.append("dog_weight", data.dogWeight.trim());
    }

    // Custom subject line
    const subject = `${WEB3FORMS_CONFIG.defaultSubject} - ${data.service}`;
    formData.append("subject", subject);

    // From name configuration
    formData.append("from_name", WEB3FORMS_CONFIG.fromName);

    // Custom reply-to (use customer's email for easy replies)
    formData.append("replyto", data.email.trim());

    // Redirect configuration (null = AJAX style)
    if (WEB3FORMS_CONFIG.redirectUrl) {
      formData.append("redirect", WEB3FORMS_CONFIG.redirectUrl);
    }

    // Honeypot spam protection (hidden checkbox)
    // This will be added in the form component as hidden input
    // Web3Forms will automatically check it

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      WEB3FORMS_CONFIG.timeout
    );

    // Submit to Web3Forms
    const response = await fetch(WEB3FORMS_API_ENDPOINT, {
      method: "POST",
      body: formData,
      signal: controller.signal,
      // No need for headers - FormData sets correct Content-Type
    });

    clearTimeout(timeoutId);

    // Parse response
    const result = (await response.json()) as
      | Web3FormsResponse
      | Web3FormsErrorResponse;

    if (!response.ok || !result.success) {
      // Handle API errors
      const errorMessage =
        result.message || "Nie udało się wysłać formularza. Spróbuj ponownie.";

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Success
    return {
      success: true,
      message:
        result.message ||
        "Formularz został wysłany pomyślnie. Dziękujemy za kontakt!",
    };
  } catch (error) {
    // Handle network errors, timeouts, etc.
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          success: false,
          error:
            "Przekroczono limit czasu. Sprawdź połączenie internetowe i spróbuj ponownie.",
        };
      }

      // Network error
      return {
        success: false,
        error: `Błąd sieci: ${error.message}. Sprawdź połączenie internetowe.`,
      };
    }

    // Unknown error
    return {
      success: false,
      error:
        "Wystąpił nieoczekiwany błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio przez telefon.",
    };
  }
}

/**
 * Legacy mailto: fallback
 * Kept for backward compatibility or as fallback if Web3Forms is unavailable
 *
 * @deprecated Use submitContactForm instead for better UX
 */
export function openMailtoLink(data: ContactFormData): void {
  const subject = `Zapytanie: ${data.service}`;

  const body = `
Imię i nazwisko: ${data.name}
Email: ${data.email}
Telefon: ${data.phone}

${data.dogName ? `Imię psa: ${data.dogName}` : ""}
${data.dogAge ? `Wiek psa: ${data.dogAge}` : ""}
${data.dogWeight ? `Waga psa: ${data.dogWeight}` : ""}

Usługa: ${data.service}

Wiadomość:
${data.message}
  `.trim();

  const mailto = `mailto:martyna@mel4dogs.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}
