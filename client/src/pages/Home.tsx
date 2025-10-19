import { useState } from "react";
import { Package, ShoppingBasket, Truck, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BannerCarousel from "@/components/BannerCarousel";

export default function Home() {
  const [cementImageLoaded, setCementImageLoaded] = useState(false);
  const [kiranaImageLoaded, setKiranaImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-primary/95 to-secondary/95 text-white py-3 shadow-md">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>9929490257</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>6376751010</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Hero Section */}
        <div className="text-center mb-16 mt-12">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Welcome to Kumawat Traders
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your one-stop destination for premium cement products and complete kirana store essentials. 
            Quality you can trust, prices you'll love.
          </p>
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <Link href="/cement">
              <Button size="lg" className="px-8 gap-2">
                <Package className="h-5 w-5" />
                Cement Store
              </Button>
            </Link>
            <Link href="/kirana">
              <Button size="lg" variant="secondary" className="px-8 gap-2">
                <ShoppingBasket className="h-5 w-5" />
                Kirana Store
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Quality Products</h3>
            <p className="text-sm text-slate-600">Premium cement and genuine kirana products</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-sm text-slate-600">Quick and reliable delivery to your location</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Easy Ordering</h3>
            <p className="text-sm text-slate-600">Simple WhatsApp ordering process</p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">
            Explore Our Collections
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link href="/cement">
              <Card 
                className="group cursor-pointer overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105" 
                data-testid="card-cement"
              >
                <div className="h-80 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 relative">
                  {!cementImageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 animate-pulse" />
                  )}
                  <img
                    src="/attached_assets/WhatsApp Image 2025-10-19 at 12.00.10_8171b2dd_1760858150968.jpg"
                    alt="Cement Products"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      cementImageLoaded ? "opacity-100" : "opacity-50"
                    }`}
                    onLoad={() => setCementImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                      <Package className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-slate-900">
                      Cement Products
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Premium quality cement blocks, bricks, and construction materials for your building needs. 
                    Sourced directly for authenticity and value.
                  </p>
                  <Button className="w-full py-6 text-base font-semibold" data-testid="button-browse-cement">
                    Browse Cement Products →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/kirana">
              <Card 
                className="group cursor-pointer overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105" 
                data-testid="card-kirana"
              >
                <div className="h-80 overflow-hidden bg-gradient-to-br from-orange-50 to-pink-100 relative">
                  {!kiranaImageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 animate-pulse" />
                  )}
                  <img
                    src="/attached_assets/WhatsApp Image 2025-10-19 at 12.00.09_4647d0e7_1760858150967.jpg"
                    alt="Kirana Store"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      kiranaImageLoaded ? "opacity-100" : "opacity-50"
                    }`}
                    onLoad={() => setKiranaImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                      <ShoppingBasket className="h-7 w-7 text-secondary" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-slate-900">
                      Kirana Store
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Complete range of grocery items, daily essentials, and household products. 
                    Fresh stock delivered straight to your doorstep.
                  </p>
                  <Button className="w-full py-6 text-base font-semibold" variant="secondary" data-testid="button-browse-kirana">
                    Browse Kirana Products →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center text-white max-w-2xl mx-auto">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="font-display text-3xl font-bold mb-4">
              Order via WhatsApp
            </h3>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              Browse products, add to cart, and place your order directly through WhatsApp for quick delivery. 
              Our team will confirm your order within minutes.
            </p>
            <a 
              href="https://wa.me/916376751010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Start Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
