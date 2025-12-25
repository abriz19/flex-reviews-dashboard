"use client";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f5f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients Think
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Hear from the companies we work with. Discover how our flexible
            corporate rental solutions help them simplify relocations, support
            staff, and secure reliable short- and long-term housing with ease.
          </p>

          <div className="mb-8">
            <span className="text-9xl md:text-[12rem] text-gray-300 font-serif leading-none">
              &quot;
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-10">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-10">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 mb-6 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Tulsi"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 md:w-6 md:h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-700 italic mb-6 max-w-2xl leading-relaxed">
                  &quot;One of the few companies in London that understand our
                  needs. We needed good quality, furnished apartments for
                  monthly rental, and The Flex team has always been to the top
                  of our expectations.&quot;
                </p>

                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Tulsi
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    Head of Accommodation, Zurich Insurance Group
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
