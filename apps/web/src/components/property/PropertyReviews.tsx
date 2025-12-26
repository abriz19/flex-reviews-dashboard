import { ApiReview } from "@/lib/api";
import ReviewCard from "@/components/reviews/ReviewCard";

interface PropertyReviewsProps {
  reviews: ApiReview[];
}

export default function PropertyReviews({ reviews }: PropertyReviewsProps) {
  // Filter to only show published/approved reviews
  const publishedReviews = reviews.filter(
    (review) => review.isApproved || review.status === "published"
  );

  if (publishedReviews.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Guest Reviews
        </h2>
        <p className="text-gray-600">
          No reviews yet. Be the first to review this property!
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Guest Reviews
      </h2>
      <div className="space-y-6">
        {publishedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showActions={false}
            showStatus={false}
          />
        ))}
      </div>
    </div>
  );
}
