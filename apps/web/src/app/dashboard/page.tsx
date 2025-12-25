'use client';

import { useState, useEffect } from 'react';
import { apiClient, ApiReview } from '@/lib/api';
import ReviewCard from '@/components/reviews/ReviewCard';
import StatsCard from '@/components/dashboard/StatsCard';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PropertyPerformanceTable from '@/components/dashboard/PropertyPerformanceTable';
import TrendsSection from '@/components/dashboard/TrendsSection';
import ReviewFilters from '@/components/dashboard/ReviewFilters';
import ReviewPagination from '@/components/dashboard/ReviewPagination';
import { useDashboardStats } from '@/hooks/useDashboardStats';

type ReviewStatus = 'all' | 'published' | 'pending' | 'declined';
type SortOption = 'date' | 'rating' | 'property';
type FilterCategory = 'all' | 'cleanliness' | 'communication' | 'check_in' | 'accuracy' | 'location' | 'value';

export default function DashboardPage() {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>('all');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<'overview' | 'reviews'>('overview');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const reviewsPerPage = 10;

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build filters
        const filterBy: any = {};

        if (selectedStatus !== 'all') {
          // Note: Backend uses isApproved boolean, but we map status
          // For now, we'll filter client-side for status since backend doesn't have status field
        }

        if (selectedProperty !== 'all') {
          filterBy.propertyId = { equals: selectedProperty };
        }

        if (selectedChannel !== 'all') {
          filterBy.channel = { equals: selectedChannel };
        }

        // Date range filter
        if (dateRange !== 'all') {
          const now = new Date();
          const daysAgo = dateRange === '7' ? 7 : dateRange === '30' ? 30 : 90;
          const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
          filterBy.createdAt = { gte: startDate.toISOString() };
        }

        const filters: any = {
          page: currentPage,
          pageSize: reviewsPerPage,
          orderBy: sortBy,
          orderDirection: sortBy === 'date' ? 'desc' : 'desc',
        };

        if (Object.keys(filterBy).length > 0) {
          filters.filterBy = filterBy;
        }

        const response = await apiClient.getReviews(filters);
        
        // Filter by status client-side since backend uses isApproved boolean
        let filteredItems = response.items;
        if (selectedStatus !== 'all') {
          filteredItems = response.items.filter(r => {
            if (selectedStatus === 'published') return r.isApproved || r.status === 'published';
            if (selectedStatus === 'pending') return !r.isApproved && r.status !== 'declined';
            if (selectedStatus === 'declined') return r.status === 'declined';
            return true;
          });
        }

        // Filter by category client-side
        if (selectedCategory !== 'all') {
          filteredItems = filteredItems.filter(r => {
            if (r.reviewCategory && Array.isArray(r.reviewCategory)) {
              return r.reviewCategory.some(cat => cat.category === selectedCategory);
            }
            if (r.categories) {
              return selectedCategory in r.categories;
            }
            return false;
          });
        }

        setReviews(filteredItems);
        setTotalPages(response.totalPages);
        setTotalCount(filteredItems.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage, selectedStatus, selectedProperty, selectedChannel, selectedCategory, sortBy, dateRange]);

  const stats = useDashboardStats(reviews);

  const updateReviewStatus = async (reviewId: string, newStatus: 'published' | 'pending' | 'declined') => {
    try {
      const approved = newStatus === 'published';
      await apiClient.approveReview(reviewId, approved);
      
      // Update local state
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId 
            ? { ...review, isApproved: approved, status: newStatus }
            : review
        )
      );
    } catch (err) {
      console.error('Error updating review status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update review status');
    }
  };

  const handleStatusChange = (status: ReviewStatus) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePropertyChange = (property: string) => {
    setSelectedProperty(property);
    setCurrentPage(1);
  };

  const handleChannelChange = (channel: string) => {
    setSelectedChannel(channel);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: FilterCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d3a] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#1a4d3a] text-white rounded-lg hover:bg-[#1a4d3a]/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 ml-64">
        <DashboardHeader />

        <main className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {activeSection === 'overview' ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]">
                  <option>Last month</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  title="Total Reviews"
                  value={stats.total}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                  iconBgColor="bg-blue-100"
                  iconColor="text-blue-600"
                />
                <StatsCard
                  title="Published"
                  value={stats.published}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  iconBgColor="bg-green-100"
                  iconColor="text-green-600"
                  subtitle={`↑ ${((stats.published / stats.total) * 100).toFixed(1)}% of total`}
                  subtitleColor="text-green-600"
                />
                <StatsCard
                  title="Pending"
                  value={stats.pending}
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  iconBgColor="bg-yellow-100"
                  iconColor="text-yellow-600"
                  subtitle="⚠ Needs attention"
                  subtitleColor="text-yellow-600"
                />
                <StatsCard
                  title="Avg Rating"
                  value={stats.avgRating}
                  icon={
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  }
                  iconBgColor="bg-purple-100"
                  iconColor="text-purple-600"
                  subtitle="Out of 5.0"
                />
              </div>

              <PropertyPerformanceTable propertyStats={stats.propertyStats} />

              <TrendsSection categoryIssues={stats.categoryIssues} />
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Management</h2>
                
                <ReviewFilters
                  selectedStatus={selectedStatus}
                  selectedProperty={selectedProperty}
                  selectedChannel={selectedChannel}
                  selectedCategory={selectedCategory}
                  sortBy={sortBy}
                  dateRange={dateRange}
                  onStatusChange={handleStatusChange}
                  onPropertyChange={handlePropertyChange}
                  onChannelChange={handleChannelChange}
                  onCategoryChange={handleCategoryChange}
                  onSortChange={handleSortChange}
                  onDateRangeChange={handleDateRangeChange}
                  filteredCount={reviews.length}
                  totalCount={totalCount}
                />

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d3a] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reviews...</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          onStatusChange={updateReviewStatus}
                          showActions={true}
                        />
                      ))}
                    </div>

                    {reviews.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No reviews found matching your filters.
                      </div>
                    )}

                    <ReviewPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
