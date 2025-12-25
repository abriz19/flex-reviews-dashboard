interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  subtitle?: string;
  subtitleColor?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  subtitle,
  subtitleColor = 'text-gray-600'
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && (
        <p className={`text-sm mt-2 ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
}

