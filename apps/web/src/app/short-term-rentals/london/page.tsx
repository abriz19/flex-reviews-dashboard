"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { apiClient, ApiProperty } from "@/lib/api";
import SearchBar from "@/components/ui/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyMap from "@/components/property/PropertyMap";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const guests = parseInt(searchParams.get("guests") || "1", 10);

  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getProperties();
        // Filter for London properties (you can adjust this logic based on your needs)
        const londonProperties = data.filter(
          (prop) => prop.location?.toLowerCase().includes("london") || true // Show all for now, adjust filter as needed
        );
        setProperties(londonProperties);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load properties"
        );
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SearchBar variant="inline" defaultCity="LONDON" defaultGuests={guests} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          Furnished, flexible apartments available for short- to medium-term
          rent by The Flex. From Covent Garden lofts to Canary Wharf executive
          suites, our serviced apartments span every neighbourhood in London.
          Book nightly, weekly, or monthly stays and enjoy expertly designed
          spaces, high-speed Wi-Fi, fully equipped kitchens and 24/7 local
          support—your perfect London rental is ready whenever you are.
        </p>
      </div>

      <div className="flex">
        <div className="w-full lg:w-2/3 overflow-y-auto h-[calc(100vh-300px)]">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d3a] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading properties...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-[#1a4d3a] text-white rounded-lg hover:bg-[#1a4d3a]/90"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {properties.length}{" "}
                  {properties.length === 1 ? "property" : "properties"} found
                </p>
                {properties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      No properties available at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        guests={guests}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-1/3 h-[calc(100vh-300px)] bg-gray-100 relative border-l border-gray-200">
          <PropertyMap properties={properties} />
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
