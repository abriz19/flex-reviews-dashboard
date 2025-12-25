"use client";

interface BookingWidgetProps {
  guests?: number;
}

export default function BookingWidget({ guests = 1 }: BookingWidgetProps) {
  return (
    <div className="sticky top-24">
      <div className="bg-[#1a4d3a] text-white rounded-lg overflow-hidden mb-4">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Book Your Stay</h2>
          <p className="text-sm opacity-90 mb-6">Select dates to see prices</p>
        </div>
        <div className="bg-white rounded-t-lg p-4 space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              type="text"
              placeholder="Select dates"
              className="flex-1 outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="flex-1 text-gray-900">
              {guests} Guest{guests !== 1 ? "s" : ""}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
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
          </div>
          <button className="w-full bg-[#2d8659] text-white py-3 rounded-lg font-semibold hover:bg-[#1a4d3a] transition-colors flex items-center justify-center space-x-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Check availability</span>
          </button>
          <button className="w-full border-2 border-[#2d8659] text-[#2d8659] py-3 rounded-lg font-semibold hover:bg-[#2d8659] hover:text-white transition-colors flex items-center justify-center space-x-2">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Send Inquiry</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600 pt-2">
            <svg
              className="w-5 h-5 text-[#2d8659]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Instant booking confirmation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
