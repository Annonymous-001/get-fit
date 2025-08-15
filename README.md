# GetFit App - Authentication System

This is a frontend-only authentication system for the GetFit fitness app. The authentication is purely for demonstration purposes and works entirely on the frontend.

## Features

- **Login Page**: Any email and password combination will log the user in
- **Register Page**: Any data entered will create a new account
- **Google Sign-In**: Mock Google OAuth functionality for both login and registration
- **Password Strength Indicator**: Shows password requirements (for demo purposes)
- **Responsive Design**: Works on both desktop and mobile
- **Dark Mode Support**: Includes dark/light theme support
- **Toast Notifications**: Shows success/error messages

## How to Use

### Login
1. Navigate to the login page
2. **Option 1 - Google Sign-In**: Click "Continue with Google" (simulated)
3. **Option 2 - Email/Password**: Enter any email address (e.g., `user@example.com`) and password (e.g., `password123`)
4. Click "Sign In"
5. You'll be logged in and redirected to the main app

### Register
1. Navigate to the register page
2. **Option 1 - Google Sign-In**: Click "Continue with Google" (simulated)
3. **Option 2 - Email/Password**: Fill in any name, email, and password
4. Click "Create Account"
5. You'll be registered and logged in automatically

### Demo Credentials
Since this is a frontend-only demo, you can use any credentials:
- **Email**: `user@example.com` (or any email)
- **Password**: `password123` (or any password)
- **Google Sign-In**: Click the Google button (simulated OAuth)

## File Structure

```
components/auth/
├── auth-wrapper.tsx      # Main authentication wrapper
├── login-page.tsx        # Login page component with Google sign-in
└── register-page.tsx     # Register page component with Google sign-in
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Notes

- This is a **frontend-only demo** - no real authentication is performed
- All data is stored in memory and will be lost on page refresh
- The logout button appears in the top-right corner when logged in
- Google OAuth is simulated - clicking the Google button will create a mock user
- In a real application, you would integrate with a proper backend and database

## Authentication Methods

### Email/Password
- Any email and password combination will work
- Password strength indicator shows requirements (for demo)
- Form validation for password matching on registration

### Google Sign-In
- Mock Google OAuth flow
- Simulates the Google sign-in experience
- Creates a mock user with Google profile data
- Works for both login and registration

## Customization

You can easily customize the authentication flow by:
- Modifying the mock user data in the login/register components
- Adding additional validation rules
- Integrating with a real backend API
- Adding more authentication providers (Facebook, Apple, etc.)
- Implementing real Google OAuth with Google Cloud Console

## Real Google OAuth Integration

To implement real Google OAuth:

1. Create a Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add environment variables:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
5. Replace the mock Google functions with real OAuth calls
