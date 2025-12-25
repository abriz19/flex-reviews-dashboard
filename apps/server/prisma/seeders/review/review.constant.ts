import type { Prisma } from '@prisma/client';

// Helper function to calculate overall rating from categories
function calculateOverallRating(
  categories?: { category: string; rating: number }[],
): number | null {
  if (!categories || categories.length === 0) return null;
  const sum = categories.reduce((acc, cat) => acc + cat.rating, 0);
  return sum / categories.length;
}

// Helper function to infer channel if missing
function inferChannel(channel?: string): string {
  if (channel) return channel;
  return 'Hostaway'; // Default channel
}

// Mock reviews data from frontend - normalized for Prisma
// Maps listingId to listingName for property connection
const listingIdToName: Record<number, string> = {
  253094: 'Central Flat in Spitalfields',
  253095: 'Immaculate 2 Bed Balcony Flat in Fulham',
  253096: 'Lovely and Relaxing Room in the Heart of Morden',
  253097: 'Bright Flat in Camberwell',
  253098: 'Charming 2 Bed Flat in the Heart of Camden',
  253099: 'Cosy 2 Bed Apartment in Ealing',
};

// Raw mock data from frontend
interface MockReview {
  id: number;
  type: 'guest-to-host' | 'host-to-guest';
  status: 'published' | 'pending' | 'declined';
  rating: number | null;
  publicReview: string;
  reviewCategory?: {
    category: string;
    rating: number;
  }[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  listingId: number;
  channel?: string;
}

const mockReviewsData: MockReview[] = [
  {
    id: 7453,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Amazing stay! The flat was exactly as described and in a perfect location. Would definitely stay again!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-15 14:30:00',
    guestName: 'Sarah Johnson',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7454,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great location and clean space. The only issue was the WiFi was a bit slow, but overall a good experience.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-10 09:15:00',
    guestName: 'Michael Chen',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7455,
    type: 'guest-to-host',
    status: 'pending',
    rating: 5,
    publicReview:
      'Perfect stay! Everything was wonderful and the host was very responsive.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-20 16:45:00',
    guestName: 'Emma Williams',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7456,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The flat was okay but could use some updates. Location was good though.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-12-05 11:20:00',
    guestName: 'David Brown',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7457,
    type: 'guest-to-host',
    status: 'declined',
    rating: 2,
    publicReview:
      'Not satisfied with the stay. Multiple issues that were not addressed.',
    reviewCategory: [
      { category: 'cleanliness', rating: 2 },
      { category: 'communication', rating: 2 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 2 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 2 },
    ],
    submittedAt: '2024-11-28 10:00:00',
    guestName: 'Lisa Anderson',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7458,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Absolutely fantastic! The garden was beautiful and the flat was spotless. Highly recommend!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-18 13:00:00',
    guestName: 'James Taylor',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7459,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great apartment with modern amenities. The location near London Bridge was perfect for our trip.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-12 08:30:00',
    guestName: 'Rachel Green',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7460,
    type: 'guest-to-host',
    status: 'pending',
    rating: 5,
    publicReview:
      'Perfect for our large family! Spacious, clean, and well-equipped. The host was very accommodating.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-22 15:20:00',
    guestName: 'Robert Martinez',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7461,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Cosy and comfortable. Great value for money in a nice neighborhood.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-08 12:00:00',
    guestName: 'Amanda White',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7462,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Excellent stay! Everything was perfect and the location was ideal for exploring London.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-14 10:15:00',
    guestName: 'Thomas Lee',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  // Additional 30 reviews
  {
    id: 7463,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great stay in Spitalfields! The flat was clean and well-maintained. Location was perfect for exploring.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-11-15 10:30:00',
    guestName: 'Barbara Morgan',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7464,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Absolutely loved our stay! The flat was perfect and the host was very accommodating. Will return!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-13 09:00:00',
    guestName: 'Henry Bell',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7465,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Comfortable flat with good amenities. The location was convenient and the host was responsive.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-21 11:45:00',
    guestName: 'Evelyn Murphy',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7466,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The flat was okay but could use some updates. The bathroom needed attention. Location was good.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 3 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-11-18 14:20:00',
    guestName: 'Ralph Bailey',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
  {
    id: 7467,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Fantastic flat in Fulham! The balcony was a great addition and the flat was spotlessly clean.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-17 08:15:00',
    guestName: 'Alice Rivera',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7468,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Very nice apartment with modern furnishings. The neighborhood was pleasant and safe.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-08 13:00:00',
    guestName: 'Louis Cooper',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7469,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect for families! Spacious, clean, and well-equipped. The host was excellent throughout.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-11-21 10:30:00',
    guestName: 'Marie Richardson',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7470,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Great stay! The flat was comfortable and the location was convenient. Would recommend.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-20 15:00:00',
    guestName: 'Joe Cox',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7471,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The apartment was fine but the heating took a while to warm up. Otherwise, decent stay.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-11-16 12:00:00',
    guestName: 'Ruby Howard',
    listingName: 'Immaculate 2 Bed Balcony Flat in Fulham',
    listingId: 253095,
    channel: 'Hostaway',
  },
  {
    id: 7472,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Excellent value for money! The room was clean, quiet, and perfect for our needs.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-16 11:00:00',
    guestName: 'Carlos Ward',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7473,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Comfortable room with all essentials. The host was helpful and check-in was smooth.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-05 09:30:00',
    guestName: 'Diana Torres',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7474,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect budget accommodation! Clean, quiet, and the host was very friendly. Great value!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-11-17 13:45:00',
    guestName: 'Eugene Peterson',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7475,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Nice room for a short stay. Good value and the location was convenient for our trip.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-22 10:00:00',
    guestName: 'Gloria Gray',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7476,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The room was basic but functional. Location was okay, though transportation was limited.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 3 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 3 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-11-14 15:00:00',
    guestName: 'Harold Ramirez',
    listingName: 'Lovely and Relaxing Room in the Heart of Morden',
    listingId: 253096,
    channel: 'Hostaway',
  },
  {
    id: 7477,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Amazing flat! Bright, modern, and perfectly located. The host was very responsive.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-14 12:30:00',
    guestName: 'Irene James',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7478,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great flat with lots of natural light. The location near London Bridge was perfect.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-09 14:00:00',
    guestName: 'Jack Watson',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7479,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect stay! The flat was exactly as described and the host was very accommodating.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-11-13 10:15:00',
    guestName: 'Katherine Brooks',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7480,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Nice flat with good amenities. The location was convenient and the host was helpful.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-23 09:00:00',
    guestName: 'Larry Kelly',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7481,
    type: 'guest-to-host',
    status: 'published',
    rating: 2,
    publicReview:
      'Disappointed with the stay. The flat was not as clean as expected and some issues were not addressed.',
    reviewCategory: [
      { category: 'cleanliness', rating: 2 },
      { category: 'communication', rating: 2 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 2 },
      { category: 'location', rating: 3 },
      { category: 'value', rating: 2 },
    ],
    submittedAt: '2024-11-12 11:30:00',
    guestName: 'Mildred Sanders',
    listingName: 'Bright Flat in Camberwell',
    listingId: 253097,
    channel: 'Hostaway',
  },
  {
    id: 7482,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Fantastic flat in Camden! Perfect location, spacious, and beautifully decorated. Loved every moment!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-15 13:00:00',
    guestName: 'Norman Price',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7483,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great apartment in a vibrant area! The flat was comfortable and well-equipped. Enjoyed our stay.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-10 15:30:00',
    guestName: 'Olive Bennett',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7484,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect for families! Spacious, clean, and the host was very accommodating. Highly recommend!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-11-11 09:45:00',
    guestName: 'Paul Wood',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7485,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Nice flat with good amenities. The location in Camden was perfect for exploring London.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-24 11:00:00',
    guestName: 'Rose Barnes',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7486,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The flat was okay but the parking situation was difficult. Otherwise, decent accommodation.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 3 },
      { category: 'check_in', rating: 3 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-11-10 14:00:00',
    guestName: 'Samuel Ross',
    listingName: 'Charming 2 Bed Flat in the Heart of Camden',
    listingId: 253098,
    channel: 'Hostaway',
  },
  {
    id: 7487,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Excellent apartment! Cosy, clean, and well-located. The host was very helpful. Will return!',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-18 10:30:00',
    guestName: 'Theresa Henderson',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7488,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Comfortable apartment with all essentials. Good value for money and the host was responsive.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-11 12:00:00',
    guestName: 'Victor Coleman',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7489,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect stay! The apartment was exactly as described and the host was excellent throughout.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-11-09 08:15:00',
    guestName: 'Wanda Jenkins',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7490,
    type: 'guest-to-host',
    status: 'pending',
    rating: 4,
    publicReview:
      'Nice apartment in a quiet neighborhood. The flat was clean and the host was accommodating.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 4 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 4 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 4 },
    ],
    submittedAt: '2024-12-25 09:00:00',
    guestName: 'Albert Perry',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7491,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'The apartment was fine but the kitchen equipment was limited. Location was good though.',
    reviewCategory: [
      { category: 'cleanliness', rating: 3 },
      { category: 'communication', rating: 3 },
      { category: 'check_in', rating: 4 },
      { category: 'accuracy', rating: 3 },
      { category: 'location', rating: 4 },
      { category: 'value', rating: 3 },
    ],
    submittedAt: '2024-11-08 13:30:00',
    guestName: 'Brenda Powell',
    listingName: 'Cosy 2 Bed Apartment in Ealing',
    listingId: 253099,
    channel: 'Hostaway',
  },
  {
    id: 7492,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Amazing stay! The flat was perfect in every way. The host was wonderful and very responsive.',
    reviewCategory: [
      { category: 'cleanliness', rating: 5 },
      { category: 'communication', rating: 5 },
      { category: 'check_in', rating: 5 },
      { category: 'accuracy', rating: 5 },
      { category: 'location', rating: 5 },
      { category: 'value', rating: 5 },
    ],
    submittedAt: '2024-12-12 14:45:00',
    guestName: 'Clarence Long',
    listingName: 'Central Flat in Spitalfields',
    listingId: 253094,
    channel: 'Hostaway',
  },
];

// Convert mock data to Prisma format with normalization
export const REVIEWS: Prisma.ReviewCreateInput[] = mockReviewsData.map(
  (review) => {
    // Calculate overall rating from categories if not provided
    const overallRating =
      review.rating !== null
        ? review.rating
        : calculateOverallRating(review.reviewCategory);

    // Infer channel if missing
    const channel = inferChannel(review.channel);

    // Parse date
    const createdAt = new Date(review.submittedAt);

    // Map status to isApproved (published = approved, others = not approved)
    const isApproved = review.status === 'published';

    return {
      guestName: review.guestName,
      publicReview: review.publicReview,
      reviewCategory: review.reviewCategory || [],
      overallRating: overallRating,
      type: review.type,
      channel: channel,
      createdAt: createdAt,
      isApproved: isApproved,
      property: {
        connect: { listingName: review.listingName },
      },
    };
  },
);
