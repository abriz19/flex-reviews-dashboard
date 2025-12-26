import Link from "next/link";
import { ApiProperty } from "@/lib/api";

interface PropertyCardProps {
  property: ApiProperty;
  guests?: number;
}

export default function PropertyCard({
  property,
  guests = 1,
}: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}?guests=${guests}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative h-64 bg-gray-200">
          {property.images && Array.isArray(property.images) && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          {property.pricePerNight && (
            <div className="absolute top-4 right-4 bg-[#1a4d3a] text-white px-3 py-1 rounded-lg font-semibold text-sm">
              £{property.pricePerNight} per night
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {property.name}
          </h3>
          {property.location && (
            <p className="text-gray-600 mb-3 text-sm">{property.location}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.bedrooms !== null && property.bedrooms !== undefined && (
              <span>
                {property.bedrooms} Bedroom{property.bedrooms !== 1 ? "s" : ""}
              </span>
            )}
            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <span>
                {property.bathrooms} Bathroom{property.bathrooms !== 1 ? "s" : ""}
              </span>
            )}
            {property.maxGuests !== null && property.maxGuests !== undefined && (
              <span>Up to {property.maxGuests} guests</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
