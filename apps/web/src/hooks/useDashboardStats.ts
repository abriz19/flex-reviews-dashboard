import { useMemo } from 'react';
import { ApiReview } from '@/lib/api';

export function useDashboardStats(reviews: ApiReview[]) {
  const stats = useMemo(() => {
    const total = reviews.length;
    const published = reviews.filter(r => r.status === 'published' || r.isApproved).length;
    const pending = reviews.filter(r => r.status === 'pending' && !r.isApproved).length;
    const declined = reviews.filter(r => r.status === 'declined').length;
    
    const reviewsWithRating = reviews.filter(r => r.rating !== null || r.overallRating !== null);
    const avgRating = reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, r) => sum + (r.rating || r.overallRating || 0), 0) / reviewsWithRating.length
      : 0;

    // Group by property
    const propertyMap = new Map<string, { property: any; reviews: ApiReview[] }>();
    reviews.forEach(review => {
      const propId = review.propertyId;
      if (!propertyMap.has(propId)) {
        propertyMap.set(propId, {
          property: review.property,
          reviews: []
        });
      }
      propertyMap.get(propId)!.reviews.push(review);
    });

    const propertyStats = Array.from(propertyMap.values()).map(({ property, reviews: propReviews }) => {
      const propReviewsWithRating = propReviews.filter(r => r.rating !== null || r.overallRating !== null);
      const propAvgRating = propReviewsWithRating.length > 0
        ? propReviewsWithRating.reduce((sum, r) => sum + (r.rating || r.overallRating || 0), 0) / propReviewsWithRating.length
        : 0;
      const propPublished = propReviews.filter(r => r.status === 'published' || r.isApproved).length;
      
      return {
        property: {
          id: property.id,
          name: property.name,
          listingName: property.listingName,
        },
        totalReviews: propReviews.length,
        avgRating: propAvgRating,
        publishedReviews: propPublished,
        pendingReviews: propReviews.filter(r => r.status === 'pending' && !r.isApproved).length
      };
    });

    const categoryIssues: Record<string, number> = {};
    reviews.forEach(review => {
      // Check both reviewCategory array and categories object
      if (review.reviewCategory && Array.isArray(review.reviewCategory)) {
        review.reviewCategory.forEach(cat => {
          if (cat.rating < 4) {
            categoryIssues[cat.category] = (categoryIssues[cat.category] || 0) + 1;
          }
        });
      } else if (review.categories) {
        Object.entries(review.categories).forEach(([category, rating]) => {
          if (rating < 4) {
            categoryIssues[category] = (categoryIssues[category] || 0) + 1;
          }
        });
      }
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

