"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isListingsPage = pathname?.includes("/short-term-rentals");
  const isPropertyPage = pathname?.includes("/property/");
  const isDashboardPage = pathname?.includes("/dashboard");
  const useLightHeader = isHomePage || isListingsPage || isPropertyPage;

  if (isDashboardPage) {
    return null;
  }

  return (
    <>
      <header
        className={`${
          useLightHeader ? "bg-white/95 backdrop-blur-sm" : "bg-[#1a4d3a]"
        } w-full sticky top-0 z-50`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FGreen_V3%2520Symbol%2520%26%2520Wordmark%2520(1).png&w=128&q=75"
                alt="The Flex Logo"
                className="h-8 w-auto"
                style={{ maxWidth: 140 }}
              />
            </Link>

            <div className="flex items-center space-x-6">
              <button
                className={`flex items-center space-x-1 ${
                  useLightHeader ? "text-[#1a4d3a]" : "text-white"
                } hover:opacity-80`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>Landlords</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <Link
                href="/about"
                className={`flex items-center space-x-1 ${
                  useLightHeader ? "text-[#1a4d3a]" : "text-white"
                } hover:opacity-80`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>About Us</span>
              </Link>

              <Link
                href="/careers"
                className={`flex items-center space-x-1 ${
                  useLightHeader ? "text-[#1a4d3a]" : "text-white"
                } hover:opacity-80`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>Careers</span>
              </Link>

              <Link
                href="/contact"
                className={`flex items-center space-x-1 ${
                  useLightHeader ? "text-[#1a4d3a]" : "text-white"
                } hover:opacity-80`}
              >
                <svg
                  className="w-5 h-5"
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
                <span>Contact</span>
              </Link>

              <Link
                href="/dashboard"
                className={`flex items-center space-x-1 ${
                  useLightHeader ? "text-[#1a4d3a]" : "text-white"
                } hover:opacity-80 font-medium`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>

              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-300">
                <button
                  className={`flex items-center space-x-1 ${
                    useLightHeader ? "text-[#1a4d3a]" : "text-white"
                  } hover:opacity-80`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  className={`flex items-center space-x-1 ${
                    useLightHeader ? "text-[#1a4d3a]" : "text-white"
                  } hover:opacity-80`}
                >
                  <span>£</span>
                  <span>GBP</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
