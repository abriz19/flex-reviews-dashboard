interface PropertyAmenitiesProps {
  amenities: string[];
}

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Amenities</h2>
        <button className="text-[#1a4d3a] hover:text-[#2d8659] font-medium text-sm">
          View all amenities &gt;
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-[#1a4d3a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
