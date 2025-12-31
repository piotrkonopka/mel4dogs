import { testimonials } from "@/content/offers";

/**
 * Testimonials section
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Co mówią nasi klienci
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Prawdziwe historie, prawdziwe rezultaty. Zobacz, jak pomagamy
            właścicielom i ich psom.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Rating Stars */}
              {testimonial.rating && (
                <div
                  className="mb-4 flex gap-1"
                  aria-label={`Ocena: ${testimonial.rating} na 5 gwiazdek`}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < (testimonial.rating || 0)
                          ? "text-orange-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Content */}
              <blockquote className="flex-grow">
                <p className="text-gray-700">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                {testimonial.role && (
                  <div className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
