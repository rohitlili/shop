import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white" 
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          data-testid={`img-product-${product.id}`}
        />
        {/* Overlay Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          New
        </div>
      </div>
      <CardContent className="p-4 sm:p-5">
        <h3 
          className="font-display font-semibold text-base sm:text-lg line-clamp-2 mb-2 text-slate-900 group-hover:text-primary transition-colors" 
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text" data-testid={`text-product-price-${product.id}`}>
            ₹{parseFloat(product.price).toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md transition-all duration-300"
          onClick={() => onAddToCart(product)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
