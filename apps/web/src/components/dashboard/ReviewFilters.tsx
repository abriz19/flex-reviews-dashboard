"use client";

import { mockProperties } from "@/lib/mockData";

type ReviewStatus = "all" | "published" | "pending" | "declined";
type SortOption = "date" | "rating" | "property";
type FilterCategory =
  | "all"
  | "cleanliness"
  | "communication"
  | "check_in"
  | "accuracy"
  | "location"
  | "value";

interface ReviewFiltersProps {
  selectedStatus: ReviewStatus;
  selectedProperty: string;
  selectedChannel: string;
  selectedCategory: FilterCategory;
  sortBy: SortOption;
  dateRange: string;
  onStatusChange: (status: ReviewStatus) => void;
  onPropertyChange: (property: string) => void;
  onChannelChange: (channel: string) => void;
  onCategoryChange: (category: FilterCategory) => void;
  onSortChange: (sort: SortOption) => void;
  onDateRangeChange: (range: string) => void;
  filteredCount: number;
  totalCount: number;
}

export default function ReviewFilters({
  selectedStatus,
  selectedProperty,
  selectedChannel,
  selectedCategory,
  sortBy,
  dateRange,
  onStatusChange,
  onPropertyChange,
  onChannelChange,
  onCategoryChange,
  onSortChange,
  onDateRangeChange,
  filteredCount,
  totalCount,
}: ReviewFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as ReviewStatus)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property
          </label>
          <select
            value={selectedProperty}
            onChange={(e) => onPropertyChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="all">All Properties</option>
            {mockProperties.map((prop) => (
              <option key={prop.id} value={prop.id.toString()}>
                {prop.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => onChannelChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="all">All Channels</option>
            <option value="Hostaway">Hostaway</option>
            <option value="Google">Google</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as FilterCategory)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="all">All Categories</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="communication">Communication</option>
            <option value="check_in">Check-in</option>
            <option value="accuracy">Accuracy</option>
            <option value="location">Location</option>
            <option value="value">Value</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="all">All Time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]"
          >
            <option value="date">Date (Newest)</option>
            <option value="rating">Rating (Highest)</option>
            <option value="property">Property Name</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {filteredCount} of {totalCount} reviews
        </div>
      </div>
    </div>
  );
}
