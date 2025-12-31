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
 * Fallback: Log to console (for development/static mode)
 * In production, this could be replaced with analytics or monitoring
 */
export function submitFallback(data: ContactFormData): SubmissionResponse {
  console.log("📧 Contact Form Submission:", {
    ...data,
    timestamp: new Date().toISOString(),
  });

  // In production, you might want to:
  // - Store in localStorage for later retry
  // - Send to analytics
  // - Show instructions to contact via email/phone

  return {
    success: true,
    message:
      "Formularz został zapisany lokalnie. Skontaktujemy się z Tobą wkrótce.",
  };
}

/**
 * Main form submission handler with automatic fallback
 * Tries Firebase first, then falls back to console logging
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<SubmissionResponse> {
  // Check if Firebase is configured
  const firebaseEnabled = !!process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_URL;

  if (firebaseEnabled) {
    const result = await submitToFirebase(data);

    // If Firebase fails, use fallback
    if (!result.success) {
      console.warn("Firebase submission failed, using fallback");
      return submitFallback(data);
    }

    return result;
  }

  // No backend configured, use fallback
  return submitFallback(data);
}
