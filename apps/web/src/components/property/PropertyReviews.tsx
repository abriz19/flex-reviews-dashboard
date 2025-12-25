import { Review } from "@/lib/mockData";
import ReviewCard from "@/components/reviews/ReviewCard";

interface PropertyReviewsProps {
  reviews: Review[];
}

export default function PropertyReviews({ reviews }: PropertyReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Guest Reviews
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} showActions={false} />
        ))}
      </div>
    </div>
  );
}
