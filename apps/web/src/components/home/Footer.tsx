import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a4d3a] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Join The Flex</h3>
            <p className="text-sm text-white/90 mb-6">
              Sign up now and stay up to date on our latest news and exclusive
              deals including 5% off your first stay!
            </p>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">The Flex</h3>
            <p className="text-sm text-white/90 mb-6">
              Professional property management services for landlords, flexible
              corporate lets for businesses and quality accommodations for
              short-term and long-term guests.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Locations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/short-term-rentals/london"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  LONDON
                </Link>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors">
                  PARIS
                </button>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors">
                  ALGIERS
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  className="w-5 h-5 text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span className="text-white/90">Support Numbers</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>🇬🇧</span>
                  <span className="text-white/90">
                    United Kingdom: +44 77 2374 5646
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🇩🇿</span>
                  <span className="text-white/90">
                    Algeria: +33 7 57 59 22 41
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🇫🇷</span>
                  <span className="text-white/90">
                    France: +33 6 44 64 57 17
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <svg
                  className="w-5 h-5 text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@theflex.global"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  info@theflex.global
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 text-center">
          <p className="text-sm text-white/90">
            © 2025 The Flex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
