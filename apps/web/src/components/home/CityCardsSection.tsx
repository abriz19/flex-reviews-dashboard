import CityCard from "./CityCard";

export default function CityCardsSection() {
  const cities = [
    {
      name: "LONDON",
      imageUrl: "https://theflex.global/home/London_Desktop.webp",
      href: "/short-term-rentals/london",
    },
    {
      name: "ALGIERS",
      imageUrl: "https://theflex.global/home/Algiers_Desktop.webp",
    },
    {
      name: "PARIS",
      imageUrl: "https://theflex.global/home/Paris_Desktop.webp",
    },
    {
      name: "LISBON",
      imageUrl: "https://theflex.global/home/Lisbon_Desktop.webp",
    },
  ];

  return (
    <section className="bg-[#f5f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Furnished apartments in top locations
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            The Flex apartments are designed with you in mind – all you have to
            do is unpack your bags and start living. With flexible terms and
            seamless service, we offer move-in ready apartments across top
            cities around the globe. Stay for days, weeks or months, and leave
            when it suits you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              name={city.name}
              imageUrl={city.imageUrl}
              href={city.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
