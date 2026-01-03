"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navigation, siteInfo } from "@/content/site";

/**
 * Main header with navigation
 * Mobile-first responsive design with hamburger menu
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition-colors hover:text-orange-600 md:text-2xl"
            aria-label="MEL4 dogs - strona główna"
          >
            <span className="text-orange-600">MEL4</span>{" "}
            <span className="text-blue-600">dogs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex md:items-center md:gap-8"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600 lg:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <Link
            href="#services"
            className="hidden rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none md:block"
          >
            Oferta
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-orange-600 focus:outline-none focus:ring-inset md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={siteInfo.ui.navigation.toggleMenuLabel}
          >
            <span className="sr-only">
              {isMenuOpen
                ? siteInfo.ui.navigation.closeMenuText
                : siteInfo.ui.navigation.openMenuText}
            </span>
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <nav
            className="space-y-1 bg-white px-4 pt-2 pb-3"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#services"
              className="mt-4 block rounded-full bg-orange-600 px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Oferta
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
