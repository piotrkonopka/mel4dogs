"use client";

import { contactForm, contactSection } from "@/content/contact";
import { useContactForm } from "@/lib/hooks/useContactForm";

/**
 * Contact form with client-side validation
 * Uses mailto: to open email client with pre-filled data
 *
 * Features:
 * - Client-side validation with Polish locale
 * - Accessible ARIA labels and error messages
 * - Screen reader announcements
 * - Graceful error handling
 * - No backend required - fully static
 * - GDPR compliant - no data transmission over network
 */
export function ContactForm() {
  const {
    formData,
    formState,
    errors,
    submitMessage,
    updateField,
    submitForm,
  } = useContactForm();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  return (
    <section
      id="contact"
      className="bg-white py-16 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h2
              id="contact-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {contactSection.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {contactSection.description}
            </p>

            {/* Contact Methods */}
            <div className="mt-8 space-y-6">
              {contactSection.methods.map((method) => (
                <div key={method.type} className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-orange-100 p-3">
                    {method.icon === "mail" && (
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {method.icon === "phone" && (
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    )}
                    {method.icon === "map" && (
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {method.label}
                    </div>
                    <a
                      href={method.href}
                      className="mt-1 text-gray-600 transition-colors hover:text-orange-600"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Area */}
            <div className="mt-12 rounded-2xl border border-teal-200 bg-teal-50 p-6">
              <h3 className="font-semibold text-gray-900">
                {contactSection.serviceArea.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {contactSection.serviceArea.description}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {contactForm.title}
            </h3>
            <p className="mt-2 text-gray-600">{contactForm.subtitle}</p>

            {formState === "success" && (
              <div
                className="mt-6 rounded-lg border-2 border-green-500 bg-green-50 p-4 text-green-800"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">
                      {contactForm.successMessage.title}
                    </div>
                    <div className="mt-1 text-sm">
                      {submitMessage || contactForm.successMessage.description}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formState === "error" && (
              <div
                className="mt-6 rounded-lg border-2 border-red-500 bg-red-50 p-4 text-red-800"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">Wystąpił błąd</div>
                    <div className="mt-1 text-sm">
                      {submitMessage ||
                        "Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się telefonicznie."}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={submitForm} className="mt-8 space-y-6" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {contactForm.fields.name.label}
                  {contactForm.fields.name.required && (
                    <span className="text-orange-600"> *</span>
                  )}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={contactForm.fields.name.placeholder}
                  className={`mt-1 block w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {contactForm.fields.email.label}
                  {contactForm.fields.email.required && (
                    <span className="text-orange-600"> *</span>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={contactForm.fields.email.placeholder}
                  className={`mt-1 block w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {contactForm.fields.phone.label}
                  {contactForm.fields.phone.required && (
                    <span className="text-orange-600"> *</span>
                  )}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={contactForm.fields.phone.placeholder}
                  className={`mt-1 block w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Dog Details Grid */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="dogName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {contactForm.fields.dogName.label}
                  </label>
                  <input
                    type="text"
                    id="dogName"
                    name="dogName"
                    value={formData.dogName}
                    onChange={handleChange}
                    placeholder={contactForm.fields.dogName.placeholder}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dogAge"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {contactForm.fields.dogAge.label}
                  </label>
                  <input
                    type="text"
                    id="dogAge"
                    name="dogAge"
                    value={formData.dogAge}
                    onChange={handleChange}
                    placeholder={contactForm.fields.dogAge.placeholder}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dogWeight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {contactForm.fields.dogWeight.label}
                  </label>
                  <input
                    type="text"
                    id="dogWeight"
                    name="dogWeight"
                    value={formData.dogWeight}
                    onChange={handleChange}
                    placeholder={contactForm.fields.dogWeight.placeholder}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  {contactForm.fields.service.label}
                  {contactForm.fields.service.required && (
                    <span className="text-orange-600"> *</span>
                  )}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
                    errors.service ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.service}
                  aria-describedby={
                    errors.service ? "service-error" : undefined
                  }
                >
                  <option value="">
                    {contactForm.fields.service.placeholder}
                  </option>
                  {contactForm.fields.service.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p id="service-error" className="mt-1 text-sm text-red-600">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  {contactForm.fields.message.label}
                  {contactForm.fields.message.required && (
                    <span className="text-orange-600"> *</span>
                  )}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={contactForm.fields.message.rows}
                  placeholder={contactForm.fields.message.placeholder}
                  className={`mt-1 block w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full rounded-full bg-orange-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formState === "submitting"
                  ? contactForm.submitButton.loadingText
                  : contactForm.submitButton.text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
