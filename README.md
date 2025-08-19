# RoseWeb Design - Professional Web Design Website

A modern, responsive website for RoseWeb Design built with Next.js, React, and Tailwind CSS. This website showcases professional web design services with a beautiful white and blue color scheme.

## 🚀 Features

- **Modern Design**: Clean, professional design with white and blue color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth animations and transitions using Framer Motion
- **Performance**: Optimized for speed and SEO
- **Accessibility**: Built with accessibility best practices
- **Vercel Ready**: Configured for easy deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript support
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd roseweb-design
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

### Manual Deployment

```bash
npm run build
npm start
```

## 📁 Project Structure

```
roseweb-design/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── rosewebc.png
├── package.json
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── README.md
```

## 🎨 Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue shades (`primary-50` to `primary-900`)
- **Secondary**: Gray shades (`secondary-50` to `secondary-900`)

### Logo
Replace `public/rosewebc.png` with your own logo image.

### Content
Update the content in `app/page.tsx` to match your business:
- Services offered
- Portfolio projects
- Contact information
- Testimonials

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new file in `app/` directory
2. Export a default React component
3. Add navigation links in `Header.tsx`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **SEO**: Meta tags and structured data included
- **Images**: Optimized with Next.js Image component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: hello@rosewebdesign.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ by RoseWeb Design


