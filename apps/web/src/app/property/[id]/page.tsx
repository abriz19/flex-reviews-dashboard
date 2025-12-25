'use client';

import { use } from 'react';
import { mockProperties, mockReviews } from '@/lib/mockData';
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
  
  const property = mockProperties.find(p => p.id === parseInt(id));
  const approvedReviews = mockReviews.filter(
    r => r.listingId === parseInt(id) && r.status === 'published'
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600">The property you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const fullDescription = "Enjoy a comfortable stay in this modern and bright 2-bedroom apartment, perfect for families, friends, or business travelers. Each bedroom features a king-size bed, offering plenty of space and comfort for a restful night's sleep. The apartment also includes a cozy living room, a fully equipped kitchen with modern appliances, and a clean bathroom. Located in a convenient area with easy access to public transportation, shops, and restaurants.";

  const allAmenities = [
    'Cable TV', 'Internet', 'Kitchen', 'Washing Machine', 'Heating',
    'Smoke Detector', 'Wireless', 'Hair Dryer', 'Carbon Monoxide Detector'
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyImageGallery images={property.images} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <PropertyHeader property={property} />
            <PropertyDescription description={fullDescription} />
            <PropertyAmenities amenities={allAmenities} />
            <CancellationPolicy />
            <PropertyLocation />
            <PropertyReviews reviews={approvedReviews} />
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
