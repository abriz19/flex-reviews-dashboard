import type { Prisma } from '@prisma/client';

// Properties from mock data - matching frontend mockData.ts
export const PROPERTIES: Prisma.PropertyCreateInput[] = [
  {
    name: 'Central Flat in Spitalfields',
    listingName: 'Central Flat in Spitalfields',
    slug: 'central-flat-spitalfields',
  },
  {
    name: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    slug: 'immaculate-2-bed-balcony-flat-fulham',
  },
  {
    name: 'Lovely and Relaxing Room in the Heart of Morden',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    slug: 'lovely-relaxing-room-morden',
  },
  {
    name: 'Bright Flat in Camberwell',
    listingName: 'Bright Flat in Camberwell',
    slug: 'bright-flat-camberwell',
  },
  {
    name: 'Charming 2 Bed Flat in the Heart of Camden',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    slug: 'charming-2-bed-flat-camden',
  },
  {
    name: 'Cosy 2 Bed Apartment in Ealing',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    slug: 'cosy-2-bed-apartment-ealing',
  },
];
