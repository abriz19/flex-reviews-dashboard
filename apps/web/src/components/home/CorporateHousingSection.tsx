import ServiceCard from "./ServiceCard";

export default function CorporateHousingSection() {
  const services = [
    {
      title: "Booking Service",
      description:
        "Skip the hassle — we'll handle your searches. Whether you need one apartment or several, we'll quickly deliver the best options tailored to your specific needs.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      title: "Dedicated Account Manager",
      description:
        "Enjoy personalised service with a dedicated account manager as your single point of contact. From new bookings to ongoing stays, you'll have expert support every step of the way.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Flexible Renting",
      description:
        "We know plans change. That's why our flexible rental terms let you book for as short or long as you need—with month-to-month leases, hassle-free extensions, and easy exits to keep your business agile.",
      icon: (
        <svg
          className="w-10 h-10 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm6 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3M3 12h18"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Corporate Housing
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            The Flex partners with over 150 companies worldwide to deliver
            corporate housing solutions for staffing, employee relocation, and
            temporary accommodations for insurance claims. Our flexible, fully
            furnished rentals are ideal for businesses and insurers seeking
            reliable, move-in ready stays across global locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
