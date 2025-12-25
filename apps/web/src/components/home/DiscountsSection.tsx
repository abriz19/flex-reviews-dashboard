import DiscountCard from "./DiscountCard";

export default function DiscountsSection() {
  const discounts = [
    { period: "1 Week", discount: "10%" },
    { period: "2 Weeks", discount: "15%" },
    { period: "1 Month", discount: "20%" },
    { period: "3 Months", discount: "29%" },
    { period: "6 Months", discount: "30%" },
    { period: "1 Year", discount: "38%" },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Stay Longer, Save More
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            The longer you stay, the more you save – great news for those
            looking for hassle free long term rentals, extended business trips
            or relocations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
          {discounts.map((discount) => (
            <DiscountCard key={discount.period} {...discount} />
          ))}
        </div>
      </div>
    </section>
  );
}
