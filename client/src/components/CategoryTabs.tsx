import { Link, useLocation } from "wouter";
import { Package, ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryTab {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const tabs: CategoryTab[] = [
  { id: "cement", label: "Cement Products", path: "/cement", icon: <Package className="h-5 w-5" /> },
  { id: "kirana", label: "Kirana Store", path: "/kirana", icon: <ShoppingBasket className="h-5 w-5" /> },
];

export function CategoryTabs() {
  const [location] = useLocation();

  return (
    <div className="border-b border-slate-200 bg-white sticky top-20 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = location === tab.path;
            return (
              <Link key={tab.id} href={tab.path}>
                <a
                  className={cn(
                    "relative px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-all duration-300 flex items-center gap-2",
                    "hover:text-primary",
                    isActive
                      ? "text-primary border-b-4 border-primary"
                      : "text-slate-600 border-b-4 border-transparent"
                  )}
                  data-testid={`tab-${tab.id}`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
