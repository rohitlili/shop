import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, Filter } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface CategoryPageProps {
  category: "cement" | "kirana";
  bannerImage: string;
  title: string;
  onAddToCart: (product: Product) => void;
}

export default function CategoryPage({
  category,
  bannerImage,
  title,
  onAddToCart,
}: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", category],
    queryFn: async () => {
      const response = await fetch(`/api/products?category=${category}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-low") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === "price-high") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Banner Section */}
      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
        <img
          src={bannerImage}
          alt={title}
          className="h-full w-full object-cover"
          data-testid={`img-banner-${category}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center px-4 drop-shadow-lg" data-testid={`text-title-${category}`}>
            {title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4 sm:space-y-0 sm:flex gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-md">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                data-testid={`input-search-${category}`}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white font-medium"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-slate-600 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="p-16 text-center border-2 border-dashed border-slate-300 bg-slate-50">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg font-medium" data-testid={`text-no-products-${category}`}>
              {searchQuery
                ? "No products found matching your search"
                : "No products available in this category"}
            </p>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600 font-medium">
                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
