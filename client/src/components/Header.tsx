import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary via-primary to-secondary/90 shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-3 group" data-testid="link-home">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                KT
              </span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-display text-xl font-bold text-white leading-tight">
                Kumawat
              </span>
              <span className="text-xs font-semibold text-white/90">
                Traders
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/20 transition-colors"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold border-2 border-white shadow-lg"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
