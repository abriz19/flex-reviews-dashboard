// Mock data for properties and reviews

export interface Review {
  id: number;
  type: "guest-to-host" | "host-to-guest";
  status: "published" | "pending" | "declined";
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

export interface Property {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  images: string[];
  description: string;
  amenities: string[];
}

export const mockProperties: Property[] = [
  {
    id: 253094,
    name: "Central Flat in Spitalfields",
    location: "London",
    pricePerNight: 200,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "A beautiful central flat in the heart of Spitalfields, perfect for exploring London.",
    amenities: ["WiFi", "Kitchen", "Washer", "Heating"],
  },
  {
    id: 253095,
    name: "Immaculate 2 Bed Balcony Flat in Fulham",
    location: "London",
    pricePerNight: 260,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Contemporary living space with modern amenities in vibrant Fulham.",
    amenities: ["WiFi", "Kitchen", "Parking", "Balcony"],
  },
  {
    id: 253096,
    name: "Lovely and Relaxing Room in the Heart of Morden",
    location: "London",
    pricePerNight: 88,
    bedrooms: 0,
    bathrooms: 1,
    maxGuests: 2,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description: "Comfortable room perfect for short stays in Morden.",
    amenities: ["WiFi", "Heating"],
  },
  {
    id: 253097,
    name: "Bright Flat in Camberwell",
    location: "London",
    pricePerNight: 175,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description: "Bright and airy flat with modern furnishings in Camberwell.",
    amenities: ["WiFi", "Kitchen", "Washer"],
  },
  {
    id: 253098,
    name: "Charming 2 Bed Flat in the Heart of Camden",
    location: "London",
    pricePerNight: 320,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1560449752-7d2e0b0b0b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Charming flat in the vibrant heart of Camden with city views.",
    amenities: ["WiFi", "Kitchen", "Washer", "Parking"],
  },
  {
    id: 253099,
    name: "Cosy 2 Bed Apartment in Ealing",
    location: "London",
    pricePerNight: 220,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description: "Cosy and comfortable apartment in Ealing.",
    amenities: ["WiFi", "Kitchen", "Heating"],
  },
];

export const mockReviews: Review[] = [
  {
    id: 7453,
    type: "guest-to-host",
    status: "published",
    rating: 5,
    publicReview:
      "Amazing stay! The flat was exactly as described and in a perfect location. Would definitely stay again!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-15 14:30:00",
    guestName: "Sarah Johnson",
    listingName: "Central Flat in Spitalfields",
    listingId: 253094,
    channel: "Hostaway",
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: 4,
    publicReview:
      "Great location and clean space. The only issue was the WiFi was a bit slow, but overall a good experience.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 4 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 4 },
      { category: "location", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2024-12-10 09:15:00",
    guestName: "Michael Chen",
    listingName: "Central Flat in Spitalfields",
    listingId: 253094,
    channel: "Hostaway",
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "pending",
    rating: 5,
    publicReview:
      "Perfect stay! Everything was wonderful and the host was very responsive.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-20 16:45:00",
    guestName: "Emma Williams",
    listingName: "Peaceful Canal-Side Flat in Dalston",
    listingId: 253095,
    channel: "Hostaway",
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "published",
    rating: 3,
    publicReview:
      "The flat was okay but could use some updates. Location was good though.",
    reviewCategory: [
      { category: "cleanliness", rating: 3 },
      { category: "communication", rating: 4 },
      { category: "check_in", rating: 4 },
      { category: "accuracy", rating: 3 },
      { category: "location", rating: 4 },
      { category: "value", rating: 3 },
    ],
    submittedAt: "2024-12-05 11:20:00",
    guestName: "David Brown",
    listingName: "Peaceful Canal-Side Flat in Dalston",
    listingId: 253095,
    channel: "Hostaway",
  },
  {
    id: 7457,
    type: "guest-to-host",
    status: "declined",
    rating: 2,
    publicReview:
      "Not satisfied with the stay. Multiple issues that were not addressed.",
    reviewCategory: [
      { category: "cleanliness", rating: 2 },
      { category: "communication", rating: 2 },
      { category: "check_in", rating: 3 },
      { category: "accuracy", rating: 2 },
      { category: "location", rating: 4 },
      { category: "value", rating: 2 },
    ],
    submittedAt: "2024-11-28 10:00:00",
    guestName: "Lisa Anderson",
    listingName: "Magnificent 2 Bed Garden Flat in Oval",
    listingId: 253096,
    channel: "Hostaway",
  },
  {
    id: 7458,
    type: "guest-to-host",
    status: "published",
    rating: 5,
    publicReview:
      "Absolutely fantastic! The garden was beautiful and the flat was spotless. Highly recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 4 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-18 13:00:00",
    guestName: "James Taylor",
    listingName: "Magnificent 2 Bed Garden Flat in Oval",
    listingId: 253096,
    channel: "Hostaway",
  },
  {
    id: 7459,
    type: "guest-to-host",
    status: "published",
    rating: 4,
    publicReview:
      "Great apartment with modern amenities. The location near London Bridge was perfect for our trip.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 4 },
      { category: "location", rating: 5 },
      { category: "value", rating: 4 },
    ],
    submittedAt: "2024-12-12 08:30:00",
    guestName: "Rachel Green",
    listingName: "Central 1 Bed Apartment in London Bridge",
    listingId: 253097,
    channel: "Hostaway",
  },
  {
    id: 7460,
    type: "guest-to-host",
    status: "pending",
    rating: 5,
    publicReview:
      "Perfect for our large family! Spacious, clean, and well-equipped. The host was very accommodating.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 4 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-22 15:20:00",
    guestName: "Robert Martinez",
    listingName: "Amazing 5 Bed Apartment in Hammersmith",
    listingId: 253098,
    channel: "Hostaway",
  },
  {
    id: 7461,
    type: "guest-to-host",
    status: "published",
    rating: 4,
    publicReview:
      "Cosy and comfortable. Great value for money in a nice neighborhood.",
    reviewCategory: [
      { category: "cleanliness", rating: 4 },
      { category: "communication", rating: 4 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 4 },
      { category: "location", rating: 4 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-08 12:00:00",
    guestName: "Amanda White",
    listingName: "Cosy Flat in Battersea",
    listingId: 253099,
    channel: "Hostaway",
  },
  {
    id: 7462,
    type: "guest-to-host",
    status: "published",
    rating: 5,
    publicReview:
      "Excellent stay! Everything was perfect and the location was ideal for exploring London.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 5 },
      { category: "check_in", rating: 5 },
      { category: "accuracy", rating: 5 },
      { category: "location", rating: 5 },
      { category: "value", rating: 5 },
    ],
    submittedAt: "2024-12-14 10:15:00",
    guestName: "Thomas Lee",
    listingName: "Central Flat in Spitalfields",
    listingId: 253094,
    channel: "Hostaway",
  },
];
