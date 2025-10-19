# Admin Access Credentials

## Login Details
- **Username:** `promax`
- **Password:** `promax@69`

## How to Access Admin Panel

1. Go to the login page: `http://localhost:5000/admin-login`
2. Enter the credentials above
3. Click "Login"
4. You'll be redirected to the admin dashboard

## Admin Features
- ✅ View all products
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Manage products by category (Cement/Kirana)
- ✅ Upload product images

## Changes Made
- Updated `server/storage.ts` to set admin credentials to `promax` / `promax@69`
- The credentials are now configured in the MemStorage initialization
- All admin functionality is protected and requires authentication

## Security Notes
- These are demo credentials for development
- For production, consider:
  - Using environment variables for credentials
  - Implementing proper database authentication
  - Using stronger password hashing
  - Adding CSRF protection
  - Using HTTPS
  - Implementing proper session management with database persistence
