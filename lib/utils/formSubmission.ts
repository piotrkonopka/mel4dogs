/**
 * Form Submission Utilities
 * Static site implementation - uses mailto: links
 */

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
${data.dogWeight ? `Waga psa: ${data.dogWeight}` : ""}

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
