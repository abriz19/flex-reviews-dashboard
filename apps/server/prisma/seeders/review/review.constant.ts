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
