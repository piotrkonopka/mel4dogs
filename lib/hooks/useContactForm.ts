/**
 * useContactForm Hook
 * Manages contact form state, validation, and submission
 */

import { useState, useCallback } from "react";
import { validateContactForm, sanitizeInput } from "@/lib/utils/formValidation";
import {
  submitContactForm,
  type ContactFormData,
} from "@/lib/utils/formSubmission";

export type FormState = "idle" | "submitting" | "success" | "error";

interface UseContactFormOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  resetDelay?: number; // Delay before resetting form state (ms)
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const { onSuccess, onError, resetDelay = 5000 } = options;

  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    dogName: "",
    dogAge: "",
    dogWeight: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState<string>("");

  /**
   * Update a single form field
   */
  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      // Sanitize input
      const sanitized = sanitizeInput(value);

      setFormData((prev) => ({ ...prev, [field]: sanitized }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      dogName: "",
      dogAge: "",
      dogWeight: "",
      service: "",
      message: "",
    });
    setErrors({});
    setFormState("idle");
    setSubmitMessage("");
  }, []);

  /**
   * Submit form with validation
   */
  const submitForm = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Validate form
      const validationErrors = validateContactForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        // Announce errors to screen readers
        const errorCount = Object.keys(validationErrors).length;
        const announcement = `Formularz zawiera ${errorCount} ${
          errorCount === 1 ? "błąd" : "błędy"
        }. Popraw podświetlone pola.`;
        announceToScreenReader(announcement);

        return;
      }

      setErrors({});
      setFormState("submitting");

      try {
        // Submit form
        const result = await submitContactForm(formData);

        if (result.success) {
          setFormState("success");
          setSubmitMessage(
            result.message || "Dziękujemy! Wiadomość została wysłana."
          );

          // Call success callback
          onSuccess?.();

          // Reset form after delay
          setTimeout(() => {
            resetForm();
          }, resetDelay);

          // Announce success to screen readers
          announceToScreenReader("Formularz został wysłany pomyślnie");
        } else {
          setFormState("error");
          setSubmitMessage(
            result.error ||
              "Nie udało się wysłać formularza. Spróbuj ponownie później."
          );

          // Call error callback
          onError?.(result.error || "Unknown error");

          // Reset to idle after delay
          setTimeout(() => {
            setFormState("idle");
          }, resetDelay);

          // Announce error to screen readers
          announceToScreenReader(
            "Błąd wysyłania formularza. Spróbuj ponownie."
          );
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setFormState("error");
        setSubmitMessage(
          "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
        );

        // Call error callback
        onError?.(error instanceof Error ? error.message : "Unknown error");

        // Reset to idle after delay
        setTimeout(() => {
          setFormState("idle");
        }, resetDelay);
      }
    },
    [formData, onSuccess, onError, resetDelay, resetForm]
  );

  return {
    formData,
    formState,
    errors,
    submitMessage,
    updateField,
    submitForm,
    resetForm,
  };
}

/**
 * Announce message to screen readers using ARIA live region
 */
function announceToScreenReader(message: string) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
