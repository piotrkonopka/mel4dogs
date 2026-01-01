/**
 * Form Submission Utilities
 * Handles form submission to various backends
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dogName?: string;
  dogAge?: string;
  dogBreed?: string;
  service: string;
  message: string;
  timestamp?: string;
  source?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit form to Firebase Functions
 *
 * @example
 * ```typescript
 * const result = await submitToFirebase(formData);
 * if (result.success) {
 *   // Show success message
 * }
 * ```
 */
export async function submitToFirebase(
  data: ContactFormData
): Promise<SubmissionResponse> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_URL;

    if (!endpoint) {
      console.warn("Firebase function URL not configured");
      return {
        success: false,
        error: "Backend not configured",
      };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "mel4dogs-website",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Formularz został wysłany pomyślnie",
    };
  } catch (error) {
    console.error("Firebase submission error:", error);
    return {
      success: false,
      error: "Nie udało się wysłać formularza. Spróbuj ponownie później.",
    };
  }
}

/**
 * Submit form to custom API endpoint
 *
 * @example
 * ```typescript
 * const result = await submitToAPI(formData, '/api/contact');
 * ```
 */
export async function submitToAPI(
  data: ContactFormData,
  endpoint: string = "/api/contact"
): Promise<SubmissionResponse> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || response.statusText);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Formularz został wysłany pomyślnie",
    };
  } catch (error) {
    console.error("API submission error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się wysłać formularza",
    };
  }
}

/**
 * Open email client with pre-filled contact form data
 * This is a static-site-friendly approach - no backend needed
 */
export function openMailtoLink(data: ContactFormData): void {
  const subject = `Zapytanie: ${data.service}`;

  const body = `
Imię i nazwisko: ${data.name}
Email: ${data.email}
Telefon: ${data.phone}

${data.dogName ? `Imię psa: ${data.dogName}` : ""}
${data.dogAge ? `Wiek psa: ${data.dogAge}` : ""}
${data.dogBreed ? `Rasa: ${data.dogBreed}` : ""}

Usługa: ${data.service}

Wiadomość:
${data.message}
  `.trim();

  const mailto = `mailto:kontakt@mel4dogs.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}

/**
 * Main form submission handler - opens email client
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<SubmissionResponse> {
  try {
    openMailtoLink(data);

    return {
      success: true,
      message: "Otwieram klienta email...",
    };
  } catch (error) {
    console.error("mailto error:", error);
    return {
      success: false,
      error:
        "Nie udało się otworzyć klienta email. Skontaktuj się bezpośrednio: kontakt@mel4dogs.pl",
    };
  }
}
