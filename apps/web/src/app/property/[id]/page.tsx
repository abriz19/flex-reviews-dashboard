"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { apiClient, ApiProperty, ApiReview } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import PropertyImageGallery from "@/components/property/PropertyImageGallery";
import BookingWidget from "@/components/property/BookingWidget";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import CancellationPolicy from "@/components/property/CancellationPolicy";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertyReviews from "@/components/property/PropertyReviews";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const guests = parseInt(searchParams.get("guests") || "1");

  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableProperties, setAvailableProperties] = useState<ApiProperty[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch property
        const propertyData = await apiClient.getProperty(id);
        setProperty(propertyData);

        // Fetch approved reviews for this property
        const reviewsData = await apiClient.getPublicReviews(propertyData.id);
        setReviews(reviewsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property"
        );
        console.error("Error fetching property:", err);

        // If property not found, fetch all available properties to show alternatives
        try {
          const allProperties = await apiClient.getProperties();
          setAvailableProperties(allProperties);
        } catch (fetchErr) {
          console.error("Error fetching available properties:", fetchErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d3a] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error ? "Error Loading Property" : "Property Not Found"}
            </h1>
            <p className="text-gray-600 mb-2">
              {error || "The property you're looking for doesn't exist."}
            </p>
            {id && (
              <p className="text-sm text-gray-500">
                Requested ID:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">{id}</code>
              </p>
            )}
          </div>

          {availableProperties.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Available Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableProperties.map((prop) => {
                  const propImages = (prop.images as string[]) || [
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                  ];
                  return (
                    <Link
                      key={prop.id}
                      href={`/property/${prop.id}?guests=${guests}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-200">
                        <img
                          src={propImages[0]}
                          alt={prop.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        {prop.pricePerNight && (
                          <div className="absolute top-2 right-2 bg-[#1a4d3a] text-white px-2 py-1 rounded text-sm font-semibold">
                            £{prop.pricePerNight}/night
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {prop.name}
                        </h3>
                        {prop.location && (
                          <p className="text-sm text-gray-600 mb-2">
                            {prop.location}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {prop.bedrooms !== null &&
                            prop.bedrooms !== undefined && (
                              <span>
                                {prop.bedrooms} Bed
                                {prop.bedrooms !== 1 ? "s" : ""}
                              </span>
                            )}
                          {prop.bathrooms !== null &&
                            prop.bathrooms !== undefined && (
                              <span>
                                {prop.bathrooms} Bath
                                {prop.bathrooms !== 1 ? "s" : ""}
                              </span>
                            )}
                          {prop.maxGuests !== null &&
                            prop.maxGuests !== undefined && (
                              <span>Up to {prop.maxGuests} guests</span>
                            )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {availableProperties.length === 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                No properties are currently available.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#1a4d3a] text-white rounded-lg hover:bg-[#1a4d3a]/90 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Use property data from backend, with fallbacks for missing fields
  const propertyDisplayData = {
    ...property,
    images: (property.images as string[]) || [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    pricePerNight: property.pricePerNight || 200,
    bedrooms: property.bedrooms || 2,
    bathrooms: property.bathrooms || 1,
    maxGuests: property.maxGuests || 4,
    description:
      property.description ||
      "Enjoy a comfortable stay in this modern and bright apartment, perfect for families, friends, or business travelers.",
    amenities: (property.amenities as string[]) || [
      "WiFi",
      "Kitchen",
      "Washer",
      "Heating",
      "Cable TV",
      "Internet",
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyImageGallery images={propertyDisplayData.images} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <PropertyHeader property={propertyDisplayData} />
            <PropertyDescription
              description={propertyDisplayData.description}
            />
            <PropertyAmenities amenities={propertyDisplayData.amenities} />
            <CancellationPolicy />
            <PropertyLocation />
            <PropertyReviews reviews={reviews} />
          </div>

          <div className="lg:w-96">
            <BookingWidget guests={guests} />
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
