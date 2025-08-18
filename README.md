# Rose Web Creation

A professional web development company website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach that works on all devices
- **Fast Performance**: Optimized for speed and SEO
- **Contact Form**: Functional contact form for client inquiries
- **Portfolio Showcase**: Display of past projects and services
- **SEO Optimized**: Built with search engine optimization in mind

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rose-web-creation
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Services.tsx       # Services showcase
│   ├── About.tsx          # About section
│   ├── Portfolio.tsx      # Portfolio projects
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Colors
The primary color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    // ... more shades
    600: '#ea580c', // Main brand color
  }
}
```

### Content
Update the content in each component file to match your business:
- Company information in `components/About.tsx`
- Services in `components/Services.tsx`
- Portfolio projects in `components/Portfolio.tsx`
- Contact information in `components/Contact.tsx`

## 📞 Contact

For questions or support, contact us at:
- Email: hello@rosewebcreation.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License.
