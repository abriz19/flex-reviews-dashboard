const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiReview {
  id: string;
  propertyId: string;
  property: {
    id: string;
    name: string;
    listingName: string;
    slug: string | null;
  };
  guestName: string;
  publicReview: string | null;
  reviewCategory?: { category: string; rating: number }[];
  categories?: Record<string, number>;
  overallRating: number | null;
  rating: number | null;
  type: 'guest-to-host' | 'host-to-guest';
  channel: string;
  isApproved: boolean;
  status: 'published' | 'pending' | 'declined';
  createdAt: string;
  updatedAt: string;
  submittedAt: string;
  listingName: string;
  listingId: string;
}

export interface ApiProperty {
  id: string;
  name: string;
  listingName: string;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface ReviewFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  propertyId?: string;
  minRating?: number;
  maxRating?: number;
  channel?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: 'date' | 'rating' | 'property';
  orderDirection?: 'asc' | 'desc';
}

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProperties(): Promise<ApiProperty[]> {
    return this.fetch<ApiProperty[]>('/properties');
  }

  async getProperty(id: string): Promise<ApiProperty> {
    return this.fetch<ApiProperty>(`/properties/${id}`);
  }

  async getReviews(
    filters?: ReviewFilters | any,
  ): Promise<PaginatedResponse<ApiReview>> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());
    if (filters?.search) params.append('search', filters.search);
    
    // Build filterBy object - support both direct filterBy object or individual filters
    const filterBy: any = filters?.filterBy || {};
    
    if (filters?.propertyId && !filterBy.propertyId) {
      filterBy.propertyId = { equals: filters.propertyId };
    }
    if ((filters?.minRating !== undefined || filters?.maxRating !== undefined) && !filterBy.overallRating) {
      filterBy.overallRating = {};
      if (filters.minRating !== undefined) {
        filterBy.overallRating.gte = filters.minRating;
      }
      if (filters.maxRating !== undefined) {
        filterBy.overallRating.lte = filters.maxRating;
      }
    }
    if (filters?.channel && !filterBy.channel) {
      filterBy.channel = { equals: filters.channel };
    }
    if ((filters?.startDate || filters?.endDate) && !filterBy.createdAt) {
      filterBy.createdAt = {};
      if (filters.startDate) {
        filterBy.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        filterBy.createdAt.lte = filters.endDate;
      }
    }

    if (Object.keys(filterBy).length > 0) {
      params.append('filterBy', JSON.stringify(filterBy));
    }

    // Build orderBy object
    if (filters?.orderBy) {
      const orderBy: any = {};
      if (filters.orderBy === 'date') {
        orderBy.createdAt = filters.orderDirection || 'desc';
      } else if (filters.orderBy === 'rating') {
        orderBy.overallRating = filters.orderDirection || 'desc';
      } else if (filters.orderBy === 'property') {
        // For property sorting, we'll sort by property listingName
        // Note: This requires a nested structure which the backend helper handles
        orderBy.property_listingName = filters.orderDirection || 'asc';
      }
      params.append('orderBy', JSON.stringify(orderBy));
    }

    const queryString = params.toString();
    const endpoint = `/reviews/hostaway${queryString ? `?${queryString}` : ''}`;
    
    return this.fetch<PaginatedResponse<ApiReview>>(endpoint);
  }

  async getPublicReviews(propertyId?: string): Promise<ApiReview[]> {
    const params = propertyId ? `?propertyId=${propertyId}` : '';
    return this.fetch<ApiReview[]>(`/reviews/public${params}`);
  }

  async approveReview(id: string, approved: boolean): Promise<ApiReview> {
    return this.fetch<ApiReview>(`/reviews/${id}/approve`, {
      method: 'PATCH',
      body: JSON.stringify({ approved }),
    });
  }
}

export const apiClient = new ApiClient();

