import type { Prisma } from '@prisma/client';

export const REVIEWS: Prisma.ReviewCreateInput[] = [
  // Shoreditch Heights (listingName: "2B N1 A - 29 Shoreditch Heights")
  {
    guestName: 'Shane Finkelstein',
    publicReview:
      'Shane and family are wonderful! Would definitely host again :)',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'respect_house_rules', rating: 10 },
    ],
    overallRating: 10,
    type: 'host-to-guest',
    channel: 'Direct',
    createdAt: new Date('2025-11-15'),
    isApproved: true,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },
  {
    guestName: 'Maria Gonzalez',
    publicReview:
      'Great location, very stylish apartment. WiFi was a bit slow in the evening.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'check_in', rating: 10 },
      { category: 'accuracy', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
    ],
    overallRating: 9.3,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2025-10-20'),
    isApproved: true,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },
  {
    guestName: 'James Liu',
    publicReview:
      'The shower pressure was very low and the bed was quite firm. Everything else was fine.',
    reviewCategory: [
      { category: 'cleanliness', rating: 7 },
      { category: 'communication', rating: 9 },
      { category: 'check_in', rating: 8 },
      { category: 'accuracy', rating: 8 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 6 },
    ],
    overallRating: 8.0,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2025-09-05'),
    isApproved: false,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },
  {
    guestName: 'Rachel Kim',
    publicReview:
      'The listing photos were misleading — the second bedroom is very small. Also, no toiletries provided.',
    reviewCategory: [
      { category: 'accuracy', rating: 4 },
      { category: 'cleanliness', rating: 7 },
      { category: 'value', rating: 5 },
      { category: 'communication', rating: 8 },
    ],
    overallRating: 6.0,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2024-12-01'),
    isApproved: false,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },
  {
    guestName: 'Tom Harrison',
    publicReview: 'Fantastic stay! Super clean and great communication.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
    ],
    overallRating: 10,
    type: 'guest-to-host',
    channel: 'Direct',
    createdAt: new Date('2025-06-10'),
    isApproved: true,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },

  // Covent Garden Loft (listingName: "1B Central - 12 Neal Street Covent Garden")
  {
    guestName: 'Sophie Martin',
    publicReview:
      'Perfect location, spotless, and super responsive host. Felt like home!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
    ],
    overallRating: 9.8,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2025-12-10'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Central - 12 Neal Street Covent Garden' },
    },
  },
  {
    guestName: 'Alex Chen',
    publicReview:
      'Amazing stay! Right in the heart of London, couldn’t ask for better.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
    ],
    overallRating: 10,
    type: 'guest-to-host',
    channel: 'Direct',
    createdAt: new Date('2025-08-22'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Central - 12 Neal Street Covent Garden' },
    },
  },
  {
    guestName: 'Emma Wilson',
    publicReview:
      'Lovely apartment but the WiFi kept dropping. Host was quick to respond though.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 7 },
    ],
    overallRating: 8.8,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2024-11-18'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Central - 12 Neal Street Covent Garden' },
    },
  },

  // Notting Hill Maisonette (listingName: "2B West - 45 Portobello Road Notting Hill")
  {
    guestName: 'Emma Thompson',
    publicReview:
      'Beautiful flat, but there was dust under the bed and in corners. Needs deeper cleaning.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 7 },
    ],
    overallRating: 7.8,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2025-11-01'),
    isApproved: false,
    property: {
      connect: { listingName: '2B West - 45 Portobello Road Notting Hill' },
    },
  },
  {
    guestName: 'Liam Dubois',
    publicReview:
      'Lovely area, but the kitchen had some old food in the fridge from previous guests.',
    reviewCategory: [
      { category: 'cleanliness', rating: 6 },
      { category: 'communication', rating: 8 },
      { category: 'accuracy', rating: 9 },
      { category: 'location', rating: 10 },
    ],
    overallRating: 8.3,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2025-07-18'),
    isApproved: false,
    property: {
      connect: { listingName: '2B West - 45 Portobello Road Notting Hill' },
    },
  },
  {
    guestName: 'Olivia Brown',
    publicReview:
      'Charming and well-located. Minor cleanliness issues but overall good.',
    reviewCategory: [
      { category: 'cleanliness', rating: 7 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
    ],
    overallRating: 8.3,
    type: 'guest-to-host',
    channel: 'Vrbo',
    createdAt: new Date('2024-05-30'),
    isApproved: true,
    property: {
      connect: { listingName: '2B West - 45 Portobello Road Notting Hill' },
    },
  },

  // Paris Marais Apartment
  {
    guestName: 'Isabella Rossi',
    publicReview:
      'Charming apartment in the best part of Paris. Host was very helpful with recommendations.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
    ],
    overallRating: 9.7,
    type: 'guest-to-host',
    channel: 'Vrbo',
    createdAt: new Date('2025-06-12'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Paris - 18 Rue de Birague Marais' },
    },
  },
  {
    guestName: 'Pierre Dubois',
    publicReview:
      'Très bien situé, propre et confortable. Parfait pour un séjour à Paris!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
    ],
    overallRating: 9.7,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2025-03-20'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Paris - 18 Rue de Birague Marais' },
    },
  },

  // Barcelona Gothic Quarter
  {
    guestName: 'Carlos Sanchez',
    publicReview:
      'Excellent location in the Gothic Quarter. Apartment was clean and modern.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'communication', rating: 9 },
    ],
    overallRating: 9.3,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2025-08-05'),
    isApproved: true,
    property: {
      connect: { listingName: '2B Barcelona - 7 Carrer de la Princesa' },
    },
  },
  {
    guestName: 'Anna Müller',
    publicReview: 'Great stay, but air conditioning was weak during heat wave.',
    reviewCategory: [
      { category: 'cleanliness', rating: 8 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 7 },
    ],
    overallRating: 8.3,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2025-07-25'),
    isApproved: true,
    property: {
      connect: { listingName: '2B Barcelona - 7 Carrer de la Princesa' },
    },
  },

  // Berlin Mitte Studio
  {
    guestName: 'Olaf Schmidt',
    publicReview:
      'Super central, modern design. Heating was a bit noisy at night.',
    reviewCategory: [
      { category: 'cleanliness', rating: 8 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
    ],
    overallRating: 8.8,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2025-03-20'),
    isApproved: true,
    property: {
      connect: { listingName: 'Studio Berlin - 88 Rosenthaler Strasse Mitte' },
    },
  },
  {
    guestName: 'Julia Novak',
    publicReview: 'Perfect for a solo traveler. Clean, quiet, great location.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
    ],
    overallRating: 9.7,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2024-10-15'),
    isApproved: true,
    property: {
      connect: { listingName: 'Studio Berlin - 88 Rosenthaler Strasse Mitte' },
    },
  },

  // Additional reviews to reach 40 (mixed across properties)
  {
    guestName: 'David Park',
    publicReview: 'Excellent host, very clean, would stay again!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
    ],
    overallRating: 9.7,
    type: 'guest-to-host',
    channel: 'Direct',
    createdAt: new Date('2025-05-08'),
    isApproved: true,
    property: { connect: { listingName: '2B N1 A - 29 Shoreditch Heights' } },
  },
  {
    guestName: 'Nina Patel',
    publicReview: 'The noise from the street was quite loud at night.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 6 },
    ],
    overallRating: 8.3,
    type: 'guest-to-host',
    channel: 'Booking.com',
    createdAt: new Date('2025-02-14'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Central - 12 Neal Street Covent Garden' },
    },
  },
  {
    guestName: 'Michael Ross',
    publicReview:
      'Everything was perfect except the hot water took long to heat up.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'value', rating: 8 },
    ],
    overallRating: 9.0,
    type: 'guest-to-host',
    channel: 'Airbnb',
    createdAt: new Date('2024-09-30'),
    isApproved: true,
    property: {
      connect: { listingName: '1B Paris - 18 Rue de Birague Marais' },
    },
  },
];
