// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
import crypto from "crypto";
function hashPassword(password) {
  return crypto.pbkdf2Sync(password, "salt", 1e3, 64, "sha512").toString("hex");
}
var MemStorage = class {
  products;
  users;
  constructor() {
    this.products = /* @__PURE__ */ new Map();
    this.users = /* @__PURE__ */ new Map();
    this.seedInitialData();
  }
  seedInitialData() {
    const adminUser = {
      id: randomUUID(),
      username: "promax",
      password: hashPassword("promax@69"),
      isAdmin: true
    };
    this.users.set(adminUser.username, adminUser);
    const sampleProducts = [
      {
        name: "Premium Cement Blocks",
        description: "High-quality cement blocks for construction. Durable and weather-resistant.",
        price: "45.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop"
      },
      {
        name: "Hollow Blocks",
        description: "Lightweight hollow cement blocks, perfect for walls and partitions.",
        price: "38.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop"
      },
      {
        name: "Decorative Jali Blocks",
        description: "Beautiful decorative cement jali blocks for aesthetic appeal.",
        price: "120.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop"
      },
      {
        name: "Standard Bricks",
        description: "Traditional red clay bricks for all construction needs.",
        price: "12.00",
        category: "cement",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
      },
      {
        name: "Atta (Wheat Flour) 5kg",
        description: "Premium quality whole wheat flour for fresh rotis and parathas.",
        price: "220.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"
      },
      {
        name: "Basmati Rice 5kg",
        description: "Long grain aromatic basmati rice, perfect for biryani and pulao.",
        price: "450.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop"
      },
      {
        name: "Toor Dal 1kg",
        description: "Fresh toor dal (pigeon peas) for nutritious dal preparations.",
        price: "140.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a0b52c8f7862?w=400&h=400&fit=crop"
      },
      {
        name: "Cooking Oil 1L",
        description: "Refined cooking oil for healthy everyday cooking.",
        price: "185.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop"
      },
      {
        name: "Sugar 1kg",
        description: "Pure white sugar for sweetening and cooking.",
        price: "45.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop"
      },
      {
        name: "Tea Powder 500g",
        description: "Premium quality tea powder for authentic Indian chai.",
        price: "320.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1597318996386-e59e5f90e5be?w=400&h=400&fit=crop"
      },
      {
        name: "Masala Pack",
        description: "Complete spice pack with turmeric, chili, coriander powder.",
        price: "95.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a0b52c8f7862?w=400&h=400&fit=crop"
      },
      {
        name: "Biscuits Variety Pack",
        description: "Assorted biscuits pack with multiple flavors for family.",
        price: "150.00",
        category: "kirana",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop"
      }
    ];
    sampleProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }
  async getProducts() {
    return Array.from(this.products.values());
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = randomUUID();
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  async updateProduct(id, insertProduct) {
    const existing = this.products.get(id);
    if (!existing) return void 0;
    const updated = { ...insertProduct, id };
    this.products.set(id, updated);
    return updated;
  }
  async deleteProduct(id) {
    return this.products.delete(id);
  }
  async getUserByUsername(username) {
    return this.users.get(username);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull()
});
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false)
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// server/routes.ts
import { z as z2 } from "zod";
import crypto2 from "crypto";
var sessions = /* @__PURE__ */ new Map();
function requireAdmin(req, res, next) {
  const sessionId = req.headers["x-session-id"];
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const session = sessions.get(sessionId);
  if (!session?.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  req.session = session;
  next();
}
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(validatedData.username);
      if (!user || !verifyPassword(validatedData.password, user.password)) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      const sessionId = crypto2.randomBytes(32).toString("hex");
      sessions.set(sessionId, {
        userId: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      });
      res.json({
        user: {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        },
        sessionId
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to login" });
    }
  });
  app2.get("/api/auth/me", (req, res) => {
    const sessionId = req.headers["x-session-id"];
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const session = sessions.get(sessionId);
    res.json(session);
  });
  app2.post("/api/auth/logout", (req, res) => {
    const sessionId = req.headers["x-session-id"];
    if (sessionId) {
      sessions.delete(sessionId);
    }
    res.json({ message: "Logged out successfully" });
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      if (category && typeof category === "string") {
        const products3 = await storage.getProductsByCategory(category);
        return res.json(products3);
      }
      const products2 = await storage.getProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
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
  app2.post("/api/products", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });
  app2.patch("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  app2.delete("/api/products/:id", requireAdmin, async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}
function hashPassword2(password) {
  return crypto2.pbkdf2Sync(password, "salt", 1e3, 64, "sha512").toString("hex");
}
function verifyPassword(password, hash) {
  return hashPassword2(password) === hash;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const attachedAssetsPath = path2.resolve(
    import.meta.dirname,
    "..",
    "attached_assets"
  );
  app2.use("/attached_assets", express.static(attachedAssetsPath));
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith("/api/")) {
      return next();
    }
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  const attachedAssetsPath = path2.resolve(
    import.meta.dirname,
    "..",
    "attached_assets"
  );
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use("/attached_assets", express.static(attachedAssetsPath));
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    if (_req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "Not found" });
    }
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({ limit: "50mb" }));
app.use(express2.urlencoded({ limit: "50mb", extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "localhost";
  server.listen({
    port,
    host
  }, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
