interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function FeatureCard({
  title,
  description,
  imageUrl,
}: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div
          className="aspect-[4/3] rounded-2xl bg-cover bg-center bg-no-repeat mx-auto max-w-md"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
