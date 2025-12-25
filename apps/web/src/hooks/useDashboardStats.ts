import { useMemo } from 'react';
import { Review } from '@/lib/mockData';
import { mockProperties } from '@/lib/mockData';

export function useDashboardStats(reviews: Review[]) {
  const stats = useMemo(() => {
    const total = reviews.length;
    const published = reviews.filter(r => r.status === 'published').length;
    const pending = reviews.filter(r => r.status === 'pending').length;
    const declined = reviews.filter(r => r.status === 'declined').length;
    const avgRating = reviews
      .filter(r => r.rating !== null)
      .reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.filter(r => r.rating !== null).length || 0;

    const propertyStats = mockProperties.map(prop => {
      const propReviews = reviews.filter(r => r.listingId === prop.id);
      const propAvgRating = propReviews
        .filter(r => r.rating !== null)
        .reduce((sum, r) => sum + (r.rating || 0), 0) / propReviews.filter(r => r.rating !== null).length || 0;
      const propPublished = propReviews.filter(r => r.status === 'published').length;
      
      return {
        property: prop,
        totalReviews: propReviews.length,
        avgRating: propAvgRating,
        publishedReviews: propPublished,
        pendingReviews: propReviews.filter(r => r.status === 'pending').length
      };
    });

    const categoryIssues: Record<string, number> = {};
    reviews.forEach(review => {
      review.reviewCategory?.forEach(cat => {
        if (cat.rating < 4) {
          categoryIssues[cat.category] = (categoryIssues[cat.category] || 0) + 1;
        }
      });
    });

    return {
      total,
      published,
      pending,
      declined,
      avgRating: avgRating.toFixed(1),
      propertyStats,
      categoryIssues
    };
  }, [reviews]);

  return stats;
}

