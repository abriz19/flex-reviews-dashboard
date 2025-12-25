import Link from "next/link";

interface CityCardProps {
  name: string;
  imageUrl: string;
  href?: string;
}

export default function CityCard({ name, imageUrl, href }: CityCardProps) {
  const content = (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div
        className="aspect-[4/3] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group cursor-pointer">
        {content}
      </Link>
    );
  }

  return <button className="group cursor-pointer">{content}</button>;
}
