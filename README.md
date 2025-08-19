# Rose Web Creation & Mobile Mountain Detail

A Next.js web application featuring two businesses:
- **Rose Web Creation**: Web design and development services
- **Mobile Mountain Detail**: Professional mobile car detailing services

## 🚀 Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

1. **Fork or clone this repository**
2. **Sign up for Vercel** at [vercel.com](https://vercel.com)
3. **Import your repository** in Vercel dashboard
4. **Deploy automatically** - Vercel will detect Next.js and deploy

### Option 2: Deploy to Netlify

1. **Fork or clone this repository**
2. **Sign up for Netlify** at [netlify.com](https://netlify.com)
3. **Connect your GitHub repository**
4. **Set build command**: `npm run build`
5. **Set publish directory**: `.next`
6. **Deploy**

### Option 3: Deploy to GitHub Pages

1. **Push your code to GitHub**
2. **Go to repository Settings > Pages**
3. **Select GitHub Actions as source**
4. **The workflow will automatically deploy**

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                 # Rose Web Creation homepage
│   ├── mobile-mountain/
│   │   ├── page.tsx            # Mobile Mountain Detail homepage
│   │   ├── bookings/
│   │   │   └── page.tsx        # Booking page
│   │   └── admin/
│   │       └── page.tsx        # Admin dashboard
│   └── components/
│       ├── Header.tsx          # Rose Web Creation header
│       ├── Footer.tsx          # Rose Web Creation footer
│       ├── MobileMountainHeader.tsx
│       └── MobileMountainFooter.tsx
├── lib/
│   └── firebase.ts             # Firebase configuration
├── public/                     # Static assets
└── firestore.rules            # Firebase security rules
```

## 🔥 Firebase Setup

1. **Create a Firebase project** at [firebase.google.com](https://firebase.google.com)
2. **Enable Firestore Database**
3. **Update security rules** in `firestore.rules`
4. **Add Firebase config** to `lib/firebase.ts`

## 🌐 Live URLs

- **Rose Web Creation**: `https://your-domain.vercel.app/`
- **Mobile Mountain Detail**: `https://your-domain.vercel.app/mobile-mountain`
- **Admin Dashboard**: `https://your-domain.vercel.app/mobile-mountain/admin`

## 📝 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔐 Admin Access

- **Mobile Mountain Detail Admin**: Password `6741`
- **Access URL**: `/mobile-mountain/admin`

## 🎨 Features

### Rose Web Creation
- Professional web design services
- Portfolio showcase
- Contact form
- Service booking system

### Mobile Mountain Detail
- Mobile car detailing services
- Interactive booking system
- Admin dashboard with analytics
- Availability management
- Password-protected admin area

## 📱 Responsive Design

Both websites are fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Performance

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Firebase for backend services

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support or questions, contact the development team.



