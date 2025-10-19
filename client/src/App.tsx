import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { Cart } from "@/components/Cart";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import type { CartItem, Product } from "@shared/schema";

function Router() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart",
    });
  };

  const handleCheckout = () => {
    const phoneNumber = "+916376751010";
    const message = generateWhatsAppMessage(cartItems);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateWhatsAppMessage = (items: CartItem[]): string => {
    let message = "*New Order from Kumawat Traders*\n\n";
    message += "*Items:*\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: Rs.${parseFloat(item.product.price).toFixed(2)} each\n`;
      message += `   Subtotal: Rs.${(parseFloat(item.product.price) * item.quantity).toFixed(2)}\n\n`;
    });

    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    );
    message += `*Total Amount: Rs.${total.toFixed(2)}*\n\n`;
    message += "Please confirm this order. Thank you!";
    
    return message;
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          
          <Route path="/cement">
            <CategoryTabs />
            <CategoryPage
              category="cement"
              bannerImage="/attached_assets/WhatsApp Image 2025-10-19 at 12.00.10_8171b2dd_1760858150968.jpg"
              title="Cement Products"
              onAddToCart={handleAddToCart}
            />
          </Route>
          
          <Route path="/kirana">
            <CategoryTabs />
            <CategoryPage
              category="kirana"
              bannerImage="/attached_assets/WhatsApp Image 2025-10-19 at 12.00.09_4647d0e7_1760858150967.jpg"
              title="Kirana Store"
              onAddToCart={handleAddToCart}
            />
          </Route>
          
          <Route path="/admin-login" component={AdminLogin} />
          
          <Route path="/admin">
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
