import { type Product, type InsertProduct, type User } from "@shared/schema";
import { randomUUID } from "crypto";
import crypto from "crypto";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getUserByUsername(username: string): Promise<User | undefined>;
}

function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, "salt", 1000, 64, "sha512")
    .toString("hex");
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private users: Map<string, User>;

  constructor() {
    this.products = new Map();
    this.users = new Map();
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed users
    const adminUser: User = {
      id: randomUUID(),
      username: "promax",
      password: hashPassword("promax@69"),
      isAdmin: true,
    };
    this.users.set(adminUser.username, adminUser);

    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Cement Blocks",
        description: "High-quality cement blocks for construction. Durable and weather-resistant.",
        price: "45.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
      },
      {
        name: "Hollow Blocks",
        description: "Lightweight hollow cement blocks, perfect for walls and partitions.",
        price: "38.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
      },
      {
        name: "Decorative Jali Blocks",
        description: "Beautiful decorative cement jali blocks for aesthetic appeal.",
        price: "120.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
      },
      {
        name: "Standard Bricks",
        description: "Traditional red clay bricks for all construction needs.",
        price: "12.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      },
      {
        name: "Atta (Wheat Flour) 5kg",
        description: "Premium quality whole wheat flour for fresh rotis and parathas.",
        price: "220.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      },
      {
        name: "Basmati Rice 5kg",
        description: "Long grain aromatic basmati rice, perfect for biryani and pulao.",
        price: "450.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop",
      },
      {
        name: "Toor Dal 1kg",
        description: "Fresh toor dal (pigeon peas) for nutritious dal preparations.",
        price: "140.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a0b52c8f7862?w=400&h=400&fit=crop",
      },
      {
        name: "Cooking Oil 1L",
        description: "Refined cooking oil for healthy everyday cooking.",
        price: "185.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      },
      {
        name: "Sugar 1kg",
        description: "Pure white sugar for sweetening and cooking.",
        price: "45.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
      },
      {
        name: "Tea Powder 500g",
        description: "Premium quality tea powder for authentic Indian chai.",
        price: "320.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1597318996386-e59e5f90e5be?w=400&h=400&fit=crop",
      },
      {
        name: "Masala Pack",
        description: "Complete spice pack with turmeric, chili, coriander powder.",
        price: "95.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a0b52c8f7862?w=400&h=400&fit=crop",
      },
      {
        name: "Biscuits Variety Pack",
        description: "Assorted biscuits pack with multiple flavors for family.",
        price: "150.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
      },
    ];

    sampleProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(
    id: string,
    insertProduct: InsertProduct
  ): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...insertProduct, id };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.get(username);
  }
}

export const storage = new MemStorage();
