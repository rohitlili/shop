import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";

// Simple in-memory session storage for demo
const sessions = new Map<string, { userId: string; username: string; isAdmin: boolean }>();

// Middleware to check authentication
function requireAuth(req: Request, res: Response, next: Function) {
  const sessionId = req.headers["x-session-id"] as string;
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  (req as any).session = sessions.get(sessionId);
  next();
}

// Middleware to check admin role
function requireAdmin(req: Request, res: Response, next: Function) {
  const sessionId = req.headers["x-session-id"] as string;
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const session = sessions.get(sessionId);
  if (!session?.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  
  (req as any).session = session;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(validatedData.username);
      
      if (!user || !verifyPassword(validatedData.password, user.password)) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Create session
      const sessionId = crypto.randomBytes(32).toString("hex");
      sessions.set(sessionId, {
        userId: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      });
      
      res.json({
        user: {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        sessionId,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.get("/api/auth/me", (req, res) => {
    const sessionId = req.headers["x-session-id"] as string;
    
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const session = sessions.get(sessionId);
    res.json(session);
  });

  app.post("/api/auth/logout", (req, res) => {
    const sessionId = req.headers["x-session-id"] as string;
    if (sessionId) {
      sessions.delete(sessionId);
    }
    res.json({ message: "Logged out successfully" });
  });

  // Product Routes (public read, admin write)
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      
      if (category && typeof category === "string") {
        const products = await storage.getProductsByCategory(category);
        return res.json(products);
      }
      
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.patch("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Password hashing helper functions (using simple crypto for demo)
function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, "salt", 1000, 64, "sha512")
    .toString("hex");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
