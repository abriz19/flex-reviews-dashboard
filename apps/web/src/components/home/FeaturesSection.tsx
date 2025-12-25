import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      title: "True Flexibility",
      description:
        "Stay nights, weeks or months — book anytime, use self-check lockboxes, and depart stress-free.",
      imageUrl: "https://theflex.global/home/Flexibility_Desktop.webp",
    },
    {
      title: "Move-in Ready",
      description:
        "Hotel bedding, premium amenities, fast Wi-Fi, and smart TVs await — you just unpack and start living.",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Curated Spaces",
      description:
        "All our apartments are to The Flex standard: prime locations, quality buildings, and polished off with our signature interior design.",
      imageUrl:
        "https://images.unsplash.com/photo-1578301978162-7aae4d755744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "24/7 Support",
      description:
        "Text, call, or email us anytime, we're here to make your stay seamless. Need parking, a crib, late checkout? No problem – We're on it.",
      imageUrl:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="bg-[#f5f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          Live Better With The Flex
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
