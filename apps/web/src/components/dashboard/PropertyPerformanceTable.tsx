interface PropertyStat {
  property: {
    id: number;
    name: string;
    listingName: string;
  };
  totalReviews: number;
  avgRating: number;
  publishedReviews: number;
  pendingReviews: number;
}

interface PropertyPerformanceTableProps {
  propertyStats: PropertyStat[];
}

export default function PropertyPerformanceTable({
  propertyStats,
}: PropertyPerformanceTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Per-Property Performance
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Property
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Total Reviews
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Avg Rating
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Published
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Pending
              </th>
            </tr>
          </thead>
          <tbody>
            {propertyStats.map((stat) => (
              <tr
                key={stat.property.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">
                    {stat.property.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.property.listingName}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-900">{stat.totalReviews}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-gray-900">
                      {stat.avgRating.toFixed(1)}
                    </span>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-600 font-medium">
                    {stat.publishedReviews}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-yellow-600 font-medium">
                    {stat.pendingReviews}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
