import { useMemo } from 'react';
import { Review } from '@/lib/mockData';

type ReviewStatus = 'all' | 'published' | 'pending' | 'declined';
type SortOption = 'date' | 'rating' | 'property';
type FilterCategory = 'all' | 'cleanliness' | 'communication' | 'check_in' | 'accuracy' | 'location' | 'value';

interface UseReviewFiltersProps {
  reviews: Review[];
  selectedStatus: ReviewStatus;
  selectedProperty: string;
  selectedChannel: string;
  selectedCategory: FilterCategory;
  sortBy: SortOption;
  dateRange: string;
}

export function useReviewFilters({
  reviews,
  selectedStatus,
  selectedProperty,
  selectedChannel,
  selectedCategory,
  sortBy,
  dateRange
}: UseReviewFiltersProps) {
  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }
    if (selectedProperty !== 'all') {
      filtered = filtered.filter(r => r.listingId === parseInt(selectedProperty));
    }
    if (selectedChannel !== 'all') {
      filtered = filtered.filter(r => r.channel === selectedChannel);
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r =>
        r.reviewCategory?.some(cat => cat.category === selectedCategory)
      );
    }
    if (dateRange !== 'all') {
      const now = new Date();
      const daysAgo = dateRange === '7' ? 7 : dateRange === '30' ? 30 : 90;
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(r => new Date(r.submittedAt) >= cutoffDate);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'property':
          return a.listingName.localeCompare(b.listingName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, selectedStatus, selectedProperty, selectedChannel, selectedCategory, sortBy, dateRange]);

  return filteredReviews;
}

