interface TrendsSectionProps {
  categoryIssues: Record<string, number>;
}

export default function TrendsSection({ categoryIssues }: TrendsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trends & Recurring Issues</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categoryIssues).map(([category, count]) => (
          <div key={category} className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm font-medium text-red-800 capitalize mb-1">
              {category.replace('_', ' ')}
            </div>
            <div className="text-2xl font-bold text-red-600">{count}</div>
            <div className="text-xs text-red-600 mt-1">issues reported</div>
          </div>
        ))}
      </div>
      {Object.keys(categoryIssues).length === 0 && (
        <p className="text-gray-500 text-sm">No recurring issues identified. Great job! 🎉</p>
      )}
    </div>
  );
}

