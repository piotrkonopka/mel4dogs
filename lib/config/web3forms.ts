/**
 * Web3Forms Configuration
 * Centralized configuration for Web3Forms integration
 *
 * @see https://docs.web3forms.com/
 */

/**
 * Web3Forms API endpoint
 * This is the official endpoint for form submissions
 */
export const WEB3FORMS_API_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Web3Forms Access Key
 * Get your access key from: https://web3forms.com/#start
 *
 * IMPORTANT: Replace this with your actual access key
 * For production, consider using environment variables
 */
export const WEB3FORMS_ACCESS_KEY = "a937020d-57d0-456d-a502-2442c10b5599";

/**
 * Form submission configuration
 */
export const WEB3FORMS_CONFIG = {
  /**
   * Custom subject line for emails
   * Can be dynamically set per submission
   */
  defaultSubject: "Nowe zapytanie z MEL4dogs",

  /**
   * Redirect URL after successful submission
   * Set to null for AJAX-style submission without redirect
   */
  redirectUrl: null,

  /**
   * From name that appears in email
   * Will be: "From Name <from@email.com>"
   */
  fromName: "Formularz MEL4dogs",

  /**
   * Enable spam protection via honeypot
   * Recommended: true (unless using hCaptcha/reCAPTCHA)
   */
  useHoneypot: true,

  /**
   * Timeout for fetch requests (ms)
   */
  timeout: 10000,
} as const;

/**
 * Web3Forms response types
 */
export interface Web3FormsResponse {
  success: boolean;
  message: string;
}

/**
 * Web3Forms error response
 */
export interface Web3FormsErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
