# Rose Web Creation - Professional Web Design Services

A modern, responsive website for Rose Web Creation, offering professional web design and development services.

## Features

### Landing Page
- **Professional Hero Section**: Eye-catching design with typewriter effect
- **Service Showcase**: Three-tier pricing structure ($28/month, $180/year, custom development)
- **Client Testimonials**: Real client feedback with rotating carousel
- **Contact Information**: Easy access to phone and email
- **Responsive Design**: Works perfectly on all devices

### Secure Bookings Management
- **Password Protection**: Admin access with secure authentication
- **Booking Dashboard**: Complete management system for consultation requests
- **Analytics**: Detailed insights and statistics
- **Export Functionality**: CSV export for booking data
- **Status Management**: Track bookings through different stages

## Authentication

The bookings management system is protected with a secure password:
- **Password**: `1Marnie4242`
- **Session Management**: Uses sessionStorage for persistent login
- **Security Features**: 
  - Password masking with show/hide toggle
  - Rate limiting with loading states
  - Secure session handling

## How to Access Bookings

1. **From Footer**: Click the "Bookings" link in the footer (with lock icon)
2. **Direct URL**: Navigate to `/bookings`
3. **Authentication**: Enter the admin password when prompted
4. **Management**: Once logged in, you can view, manage, and export all booking data

## Booking Management Features

- **View All Bookings**: Complete list with filtering options
- **Status Updates**: Mark bookings as pending, contacted, completed, or cancelled
- **Analytics Dashboard**: View statistics and trends
- **Export Data**: Download booking information as CSV
- **Search & Filter**: Find specific bookings quickly

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom shadcn/ui components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── bookings/
│   │   └── page.tsx      # Secure bookings management
│   └── layout.tsx        # Root layout with AuthProvider
├── components/
│   ├── AuthProvider.tsx  # Authentication context
│   ├── LoginModal.tsx    # Login component
│   └── ui/               # Reusable UI components
└── lib/
    └── utils.ts          # Utility functions
```

## Security Notes

- The password is hardcoded for simplicity but should be moved to environment variables in production
- Session storage is used for authentication persistence
- All booking data is stored in localStorage (consider a backend database for production)

## Contact Information

- **Phone**: 289-213-0256
- **Email**: rosewebc@gmail.com
- **Location**: Ontario, Canada

---

Built with ❤️ by Rose Web Creation
