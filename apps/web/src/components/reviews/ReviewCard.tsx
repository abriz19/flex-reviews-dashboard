import { ApiReview } from '@/lib/api';

interface ReviewCardProps {
  review: ApiReview;
  onStatusChange?: (reviewId: string, newStatus: 'published' | 'pending' | 'declined') => void;
  showActions?: boolean;
}

export default function ReviewCard({ review, onStatusChange, showActions = true }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{review.guestName}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              (review.status === 'published' || review.isApproved) ? 'bg-green-100 text-green-800' :
              review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {review.status || (review.isApproved ? 'published' : 'pending')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{review.listingName}</p>
          <p className="text-sm text-gray-500">
            {new Date(review.submittedAt || review.createdAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {(review.rating || review.overallRating) && (
            <div className="flex items-center space-x-1">
              <span className="text-lg font-semibold text-gray-900">
                {review.rating || review.overallRating}
              </span>
              <span className="text-yellow-400">⭐</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review.publicReview || 'No review text provided.'}</p>
      {(review.reviewCategory && review.reviewCategory.length > 0) || review.categories ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {review.reviewCategory && review.reviewCategory.length > 0
            ? review.reviewCategory.map((cat, idx) => (
                <div key={idx} className="text-sm bg-gray-50 px-3 py-2 rounded">
                  <span className="text-gray-600 capitalize">{cat.category.replace('_', ' ')}: </span>
                  <span className="font-semibold text-gray-900">{cat.rating}/10</span>
                </div>
              ))
            : review.categories
              ? Object.entries(review.categories).map(([category, rating], idx) => (
                  <div key={idx} className="text-sm bg-gray-50 px-3 py-2 rounded">
                    <span className="text-gray-600 capitalize">{category.replace('_', ' ')}: </span>
                    <span className="font-semibold text-gray-900">{rating}/10</span>
                  </div>
                ))
              : null}
        </div>
      ) : null}
      <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">Channel: {review.channel || 'N/A'}</span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-600">Type: {review.type}</span>
      </div>
      {showActions && onStatusChange && (
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={() => onStatusChange(review.id, 'published')}
            disabled={review.status === 'published'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              review.status === 'published'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Approve
          </button>
          <button
            onClick={() => onStatusChange(review.id, 'declined')}
            disabled={review.status === 'declined'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              review.status === 'declined'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Decline
          </button>
          <button
            onClick={() => onStatusChange(review.id, 'pending')}
            disabled={review.status === 'pending'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              review.status === 'pending'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            Set Pending
          </button>
        </div>
      )}
    </div>
  );
}

