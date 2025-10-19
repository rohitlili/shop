import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Fresh Kirana Store",
    subtitle: "Daily essentials delivered to your doorstep",
    image: "/attached_assets/WhatsApp Image 2025-10-19 at 12.00.09_4647d0e7_1760858150967.jpg",
    alt: "Kumawat Traders Kirana Store",
  },
  {
    id: 2,
    title: "Premium Cement Products",
    subtitle: "Quality building materials for your projects",
    image: "/attached_assets/WhatsApp Image 2025-10-19 at 12.00.10_8171b2dd_1760858150968.jpg",
    alt: "Kumawat Traders Cement Products",
  },
];

export default function BannerCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentBanner]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    setAutoPlay(false);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    setAutoPlay(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl mb-12">
      {/* Banner Container */}
      <div className="relative h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden group">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-3">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-slate-600 text-center">
              Unable to load image
            </p>
          </div>
        )}

        {/* Current Banner */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banners[currentBanner].image}
            alt={banners[currentBanner].alt}
            className="h-full w-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Banner Text Overlay */}
        <div className="absolute inset-0 flex items-end p-6 sm:p-8 z-10">
          <div className="text-white w-full">
            <p className="text-sm sm:text-base font-semibold text-white/90 mb-2 tracking-wide">
              Welcome to Kumawat Traders
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {banners[currentBanner].title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-xl mb-6">
              {banners[currentBanner].subtitle}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next banner"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 py-5 bg-gradient-to-r from-slate-50 to-white">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentBanner(index);
              setAutoPlay(false);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentBanner
                ? "bg-gradient-to-r from-primary to-secondary w-8"
                : "bg-slate-300 hover:bg-slate-400 w-3"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
