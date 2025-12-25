interface DiscountCardProps {
  period: string;
  discount: string;
}

export default function DiscountCard({ period, discount }: DiscountCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
      <div className="text-sm md:text-base text-gray-700 mb-3 font-medium">
        {period}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {discount}
      </div>
      <div className="text-sm text-gray-600">discount</div>
    </div>
  );
}
