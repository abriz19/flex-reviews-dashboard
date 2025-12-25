'use client';

import { useSearchParams } from 'next/navigation';
import { mockProperties } from '@/lib/mockData';
import SearchBar from '@/components/ui/SearchBar';
import PropertyCard from '@/components/property/PropertyCard';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const guests = parseInt(searchParams.get('guests') || '1', 10);

  return (
    <div className="min-h-screen bg-white">
      <SearchBar variant="inline" defaultCity="LONDON" defaultGuests={guests} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          Furnished, flexible apartments available for short- to medium-term rent by The Flex. From Covent Garden lofts to Canary Wharf executive suites, our serviced apartments span every neighbourhood in London. Book nightly, weekly, or monthly stays and enjoy expertly designed spaces, high-speed Wi-Fi, fully equipped kitchens and 24/7 local support—your perfect London rental is ready whenever you are.
        </p>
      </div>

      <div className="flex">
        <div className="w-full lg:w-2/3 overflow-y-auto h-[calc(100vh-300px)]">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-gray-600 mb-6">166 properties found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProperties.map((property) => (
                <PropertyCard key={property.id} property={property} guests={guests} />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/3 h-[calc(100vh-300px)] bg-gray-100 relative border-l border-gray-200">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gray-50">
              <div className="w-full h-full opacity-30" style={{
                backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=London,UK&zoom=10&size=600x800&key=demo)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              
              
              
              <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-gray-700 font-semibold text-lg">London</span>
              </div>
            </div>
            
         
            

          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
