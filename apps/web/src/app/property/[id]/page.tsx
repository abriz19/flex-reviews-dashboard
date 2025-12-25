'use client';

import { use, useState, useEffect } from 'react';
import { apiClient, ApiProperty, ApiReview } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import PropertyImageGallery from '@/components/property/PropertyImageGallery';
import BookingWidget from '@/components/property/BookingWidget';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import CancellationPolicy from '@/components/property/CancellationPolicy';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyReviews from '@/components/property/PropertyReviews';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const guests = parseInt(searchParams.get('guests') || '1');
  
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch property
        const propertyData = await apiClient.getProperty(id);
        setProperty(propertyData);

        // Fetch approved reviews for this property
        const reviewsData = await apiClient.getPublicReviews(id);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property');
        console.error('Error fetching property:', err);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? 'Error Loading Property' : 'Property Not Found'}
          </h1>
          <p className="text-gray-600">
            {error || "The property you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  // Mock property data for display (since API doesn't return images, amenities, etc.)
  const propertyDisplayData = {
    ...property,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    ],
    pricePerNight: 200,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    description: 'Enjoy a comfortable stay in this modern and bright apartment, perfect for families, friends, or business travelers.',
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Heating', 'Cable TV', 'Internet'],
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyImageGallery images={propertyDisplayData.images} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <PropertyHeader property={propertyDisplayData} />
            <PropertyDescription description={propertyDisplayData.description} />
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
