"use client";

import { ApiProperty } from "@/lib/api";

interface PropertyMapProps {
  properties?: ApiProperty[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function PropertyMap({
  properties = [],
  center = { lat: 51.5074, lng: -0.1278 }, // Default to London
  zoom = 11,
}: PropertyMapProps) {
  // Use Google Maps embed (works without API key for basic embeds)
  // Format: https://www.google.com/maps?q=London,UK&output=embed
  const mapUrl = `https://www.google.com/maps?q=London,UK&output=embed&z=${zoom}`;

  return (
    <div className="w-full h-full relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        className="absolute inset-0"
        title="London Properties Map"
      ></iframe>
      {properties.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-900">
            {properties.length} {properties.length === 1 ? "property" : "properties"} in London
          </p>
        </div>
      )}
    </div>
  );
}

