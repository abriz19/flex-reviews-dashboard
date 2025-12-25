import SearchBar from "@/components/ui/SearchBar";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://theflex.global/home/Hero_Desktop_Large.webp)",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Book
            <br />
            Beautiful Stays
          </h1>
        </div>

        <SearchBar variant="hero" />
      </div>
    </section>
  );
}
