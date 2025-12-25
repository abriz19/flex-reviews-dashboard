interface PropertyImageGalleryProps {
  images?: string[];
}

export default function PropertyImageGallery({
  images,
}: PropertyImageGalleryProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  ];

  const imageList = images && images.length > 0 ? images : defaultImages;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="col-span-1 row-span-2">
        <div className="relative h-full min-h-[500px] rounded-lg overflow-hidden bg-gray-200">
          <img
            src={
              imageList[0] ||
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            }
            alt="Living room"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={
              imageList[1] ||
              "https://images.unsplash.com/photo-1631889992176-aa38e141a4f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            }
            alt="Bedroom 1"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={
              imageList[2] ||
              "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            }
            alt="Bedroom 2"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={
              imageList[3] ||
              "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            }
            alt="Bathroom"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="col-span-1 relative h-64 rounded-lg overflow-hidden bg-gray-200 group cursor-pointer">
        <img
          src={
            imageList[4] ||
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          }
          alt="Kitchen"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View all photos
          </button>
        </div>
      </div>
    </div>
  );
}
