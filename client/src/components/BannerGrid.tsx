import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface Banner {
  id: number;
  title: string;
  image: string;
  alt: string;
  description: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "कुमावत ट्रेडर्स",
    image: "/attached_assets/WhatsApp Image 2025-10-19 at 12.00.09_4647d0e7_1760858150967.jpg",
    alt: "Kumawat Traders Kirana Store",
    description: "Complete grocery and kirana store essentials",
  },
  {
    id: 2,
    title: "कुमावत ट्रेडर्स",
    image: "/attached_assets/WhatsApp Image 2025-10-19 at 12.00.10_8171b2dd_1760858150968.jpg",
    alt: "Kumawat Traders Cement Products",
    description: "Premium cement and construction materials",
  },
];

export default function BannerGrid() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Our Businesses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-80 overflow-hidden bg-slate-200">
                {/* Loading Skeleton */}
                {!loadedImages[banner.id] && !imageErrors[banner.id] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
                )}

                {/* Error State */}
                {imageErrors[banner.id] && (
                  <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-3">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                    <p className="text-slate-600 text-center text-sm">
                      Unable to load image
                    </p>
                  </div>
                )}

                <img
                  src={banner.image}
                  alt={banner.alt}
                  className={`h-full w-full object-cover transition-all duration-300 ${
                    loadedImages[banner.id] ? "group-hover:scale-110" : "scale-100"
                  } ${imageErrors[banner.id] ? "hidden" : ""}`}
                  onLoad={() => handleImageLoad(banner.id)}
                  onError={() => handleImageError(banner.id)}
                />

                {/* Hover Overlay */}
                {loadedImages[banner.id] && !imageErrors[banner.id] && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {banner.title}
                    </h3>
                    <p className="text-white/90 text-sm">{banner.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
