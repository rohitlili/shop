# ShopSavvy Traders - E-Commerce Platform

A modern, professional e-commerce platform built with React, Express.js, and Vite. Perfect for selling cement products and kirana store essentials with WhatsApp integration.

## 🌟 Features

### 🛍️ Shopping Features
- Browse cement products and kirana essentials
- Advanced search and filtering
- Shopping cart with quantity management
- WhatsApp ordering integration
- Responsive mobile-friendly design
- Professional UI with smooth animations

### 👨‍💼 Admin Features
- Secure admin login
- Add/Edit/Delete products
- Manage product categories
- Upload product images
- View product inventory
- Real-time updates

### 🎨 Design
- Modern, professional interface
- Vibrant gradient backgrounds
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Accessibility-compliant design

## 📦 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack React Query
- **Language**: TypeScript
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ShopSavvyConnect

# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5000
```

### Build & Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📋 Admin Access

- **Username**: `promax`
- **Password**: `promax@69`
- **URL**: http://localhost:5000/admin-login

## 🌐 Site Structure

- **Homepage** (`/`) - Main landing page with category selection
- **Cement Store** (`/cement`) - Browse cement products
- **Kirana Store** (`/kirana`) - Browse grocery essentials
- **Admin Login** (`/admin-login`) - Admin authentication
- **Admin Panel** (`/admin`) - Admin dashboard

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products?category=cement` - Get products by category

### Admin Endpoints (Protected)
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Auth Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

## 📱 Contact Information

- **Phone**: 9929490257
- **WhatsApp**: 6376751010

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Using Vercel CLI
npm install -g vercel
vercel

# Or push to GitHub and connect to Vercel dashboard
```

**See `QUICK_START_DEPLOYMENT.md` for detailed instructions**

## 📖 Documentation

- **Deployment Guide**: `VERCEL_DEPLOYMENT.md`
- **Quick Start Deployment**: `QUICK_START_DEPLOYMENT.md`
- **UI Enhancements**: `UI_ENHANCEMENTS.md`
- **Admin Credentials**: `ADMIN_CREDENTIALS.md`

## 🛠️ Development Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production build
npm run check     # Type check with TypeScript
npm run db:push   # Push database schema (if using database)
```

## 📁 Project Structure

```
ShopSavvyConnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   └── App.tsx
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types
│   └── schema.ts          # Zod schemas
├── vercel.json           # Vercel configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies
```

## 🎨 Customization

### Change Store Name
Edit `Header.tsx` and `Footer.tsx` to change "Kumawat Traders"

### Change Colors
Edit `client/src/index.css` to modify color variables

### Add Products
1. Login to admin panel
2. Navigate to Add Product
3. Fill in product details
4. Upload image
5. Submit

### Change WhatsApp Number
Update phone number in:
- `App.tsx` (handleCheckout function)
- `Home.tsx` (CTA section)
- `Footer.tsx` (contact info)

## 🔐 Security Notes

- Admin credentials are demo credentials for development
- For production, implement:
  - Database-backed authentication
  - HTTPS enforcement
  - CSRF protection
  - Rate limiting
  - Environment variables for sensitive data

## 🐛 Known Limitations

- Data stored in memory (resets on server restart)
- No persistent database
- No email notifications
- No user authentication (only admin)
- Images use external URLs

## 🚀 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication system
- [ ] Order history
- [ ] Email notifications
- [ ] Payment integration
- [ ] Review system
- [ ] Wishlist
- [ ] Analytics dashboard
- [ ] SMS notifications
- [ ] Inventory tracking

## 📝 License

MIT License - Feel free to use for personal and commercial projects

## 🤝 Support

For issues or questions, please contact:
- **Email**: info@kumawattraders.com
- **WhatsApp**: +916376751010
- **Phone**: 9929490257

## 🎉 Ready to Deploy?

Your project is configured and ready for Vercel!

1. See `QUICK_START_DEPLOYMENT.md` for fastest deployment
2. See `VERCEL_DEPLOYMENT.md` for detailed instructions
3. Push to GitHub and connect to Vercel

**Deploy in 5 minutes! 🚀**

---

**Built with ❤️ using React, Express, and Tailwind CSS**
