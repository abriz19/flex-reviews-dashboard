import type { Prisma } from '@prisma/client';

export const PROPERTIES: Prisma.PropertyCreateInput[] = [
  {
    name: 'Shoreditch Heights',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    slug: 'shoreditch-heights-29',
  },
  {
    name: 'Covent Garden Loft',
    listingName: '1B Central - 12 Neal Street Covent Garden',
    slug: 'covent-garden-loft-12',
  },
  {
    name: 'Notting Hill Maisonette',
    listingName: '2B West - 45 Portobello Road Notting Hill',
    slug: 'notting-hill-maisonette-45',
  },
  {
    name: 'Paris Marais Apartment',
    listingName: '1B Paris - 18 Rue de Birague Marais',
    slug: 'paris-marais-18',
  },
  {
    name: 'Barcelona Gothic Quarter',
    listingName: '2B Barcelona - 7 Carrer de la Princesa',
    slug: 'barcelona-gothic-7',
  },
  {
    name: 'Berlin Mitte Studio',
    listingName: 'Studio Berlin - 88 Rosenthaler Strasse Mitte',
    slug: 'berlin-mitte-studio-88',
  },
];
