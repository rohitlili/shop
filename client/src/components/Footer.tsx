import { MapPin, Phone, Mail, MessageCircle, Package, Truck, Shield } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KT</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Kumawat Traders</h3>
                <p className="text-xs text-slate-300">कुमावत ट्रेडर्स</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Your trusted source for premium cement products and quality kirana essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cement" className="text-slate-400 hover:text-white transition-colors">
                  Cement Store
                </Link>
              </li>
              <li>
                <Link href="/kirana" className="text-slate-400 hover:text-white transition-colors">
                  Kirana Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Why Choose Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 text-slate-400">
                <Package className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Quality Products</span>
              </li>
              <li className="flex gap-2 text-slate-400">
                <Truck className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>Fast Delivery</span>
              </li>
              <li className="flex gap-2 text-slate-400">
                <Shield className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>100% Authentic</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 text-slate-400">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">9929490257</p>
                  <p className="text-xs">Call us</p>
                </div>
              </div>
              <div className="flex gap-3 text-slate-400">
                <MessageCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">6376751010</p>
                  <p className="text-xs">WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {currentYear} Kumawat Traders. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

      {/* Top Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  );
}
