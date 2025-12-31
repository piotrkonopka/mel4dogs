/**
 * Form Validation Utilities
 * Reusable validation functions for contact forms
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Polish phone number (mobile and landline)
 * Formats: +48 123 456 789, 123456789, 123-456-789, (12) 345-67-89
 */
export function isValidPolishPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(\+48)?[0-9]{9}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Sanitize string input (remove potential XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .substring(0, 5000); // Limit length
}

/**
 * Validate field based on rules
 */
export function validateField(
  value: string,
  rules: ValidationRule,
  fieldName: string
): string | null {
  const trimmedValue = value.trim();

  if (rules.required && !trimmedValue) {
    return `${fieldName} jest wymagane`;
  }

  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return `${fieldName} musi mieć co najmniej ${rules.minLength} znaków`;
  }

  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return `${fieldName} może mieć maksymalnie ${rules.maxLength} znaków`;
  }

  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return `${fieldName} ma nieprawidłowy format`;
  }

  if (rules.custom && !rules.custom(trimmedValue)) {
    return `${fieldName} jest nieprawidłowe`;
  }

  return null;
}

/**
 * Validate entire form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  dogName?: string;
  dogAge?: string;
  dogBreed?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  // Name validation
  const nameError = validateField(
    data.name,
    { required: true, minLength: 2, maxLength: 100 },
    "Imię i nazwisko"
  );
  if (nameError) errors.name = nameError;

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email jest wymagany";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Podaj prawidłowy adres email";
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = "Telefon jest wymagany";
  } else if (!isValidPolishPhone(data.phone)) {
    errors.phone = "Podaj prawidłowy numer telefonu (9 cyfr)";
  }

  // Service validation
  if (!data.service) {
    errors.service = "Wybierz usługę";
  }

  // Message validation
  const messageError = validateField(
    data.message,
    { required: true, minLength: 10, maxLength: 2000 },
    "Wiadomość"
  );
  if (messageError) errors.message = messageError;

  return errors;
}
