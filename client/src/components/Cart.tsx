import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@shared/schema";

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  const isEmpty = items.length === 0;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" 
        data-testid="cart-overlay"
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-display font-bold text-slate-900" data-testid="text-cart-title">
              Shopping Cart
            </h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="hover:bg-slate-100"
            data-testid="button-close-cart"
          >
            <X className="h-5 w-5 text-slate-600" />
          </Button>
        </div>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2" data-testid="text-empty-cart">
              Your cart is empty
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Add products from our stores to get started
            </p>
            <Button onClick={onClose} variant="default">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <Card 
                    key={item.product.id} 
                    className="p-4 border-slate-200 hover:shadow-md transition-shadow"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-24 w-24 rounded-lg object-cover bg-gradient-to-br from-slate-100 to-slate-200"
                          data-testid={`img-cart-item-${item.product.id}`}
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-display font-semibold text-sm text-slate-900 line-clamp-2 mb-1" data-testid={`text-cart-item-name-${item.product.id}`}>
                          {item.product.name}
                        </h4>
                        <p className="text-sm font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text mb-3" data-testid={`text-cart-item-price-${item.product.id}`}>
                          ₹{parseFloat(item.product.price).toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-1 mt-auto">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-slate-200 hover:bg-slate-100"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-bold text-slate-900" data-testid={`text-quantity-${item.product.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-slate-200 hover:bg-slate-100"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto hover:bg-red-50 text-red-500"
                            onClick={() => onRemoveItem(item.product.id)}
                            data-testid={`button-remove-${item.product.id}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-slate-200 p-5 space-y-4 bg-gradient-to-t from-slate-50 to-white">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-slate-600">Total Amount:</span>
                <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text" data-testid="text-cart-total">
                  ₹{total.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#25D366] to-[#1FAD52] hover:from-[#1FAD52] hover:to-[#0d8c3f] text-white font-bold py-6 shadow-lg transition-all duration-300 text-base"
                size="lg"
                onClick={onCheckout}
                data-testid="button-whatsapp-checkout"
              >
                <SiWhatsapp className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
