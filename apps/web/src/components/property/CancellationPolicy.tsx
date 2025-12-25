export default function CancellationPolicy() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <svg
          className="w-6 h-6 text-gray-400"
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
        <h2 className="text-2xl font-semibold text-gray-900">
          Cancellation Policy
        </h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            For stays less than 28 days:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Full refund up to 14 days before check-in</li>
            <li>No refund for bookings less than 14 days before check-in</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            For stays of 28 days or more:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Full refund up to 30 days before check-in</li>
            <li>No refund for bookings less than 30 days before check-in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
