# Rice Purity Test 2025 🎓

A modern, responsive remake of the classic Rice Purity Test built with Next.js, TailwindCSS, and TypeScript. This single-page application faithfully recreates the original college quiz experience with contemporary updates and premium polish.

![Rice Purity Test 2025](https://img.shields.io/badge/Rice%20Purity%20Test-2025-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Functionality
- **100 Authentic Questions**: Classic Rice Purity Test questions updated for modern relevance
- **Single-Page Layout**: Fast, scrollable experience without pagination
- **Real-Time Scoring**: Live progress tracking and automatic score calculation
- **Checkbox Interface**: Traditional format faithful to the original test
- **Organized Categories**: Questions grouped into semantic fieldsets

### Modern UX/UI
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Sticky Header**: Progress bar and score counter always visible
- **Dark/Light Mode**: Automatic system preference detection
- **Smooth Interactions**: Subtle hover effects and transitions
- **Clean Typography**: Inter + Poppins font combination for readability

### Technical Excellence
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Cards
- **Fast Performance**: Static generation with optimized builds
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Type Safety**: Full TypeScript implementation
- **Production Ready**: Deployable to Vercel/Netlify immediately

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rice-purity-test-2025.git
cd rice-purity-test-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
rice-purity-test-2025/
├── app/
│   ├── layout.tsx          # Root layout with SEO and fonts
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and TailwindCSS
├── components/
│   └── RicePurityTest.tsx  # Main test component
├── data/
│   └── questions.ts        # Questions data and types
├── public/
│   ├── site.webmanifest    # PWA manifest
│   └── favicon files...    # App icons
├── tailwind.config.js      # TailwindCSS configuration
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Question Categories

The test includes 100 questions across 5 categories:

1. **Relationships & Romance** (25 questions) - Dating, relationships, romantic encounters
2. **Sexual Activity** (30 questions) - Sexual experiences and encounters  
3. **Substances & Partying** (20 questions) - Alcohol, drugs, party experiences
4. **Legal & Risky Behavior** (15 questions) - Legal troubles and risky activities
5. **Academic & Professional** (10 questions) - School and workplace misconduct

## 🏆 Scoring System

- **Score Range**: 0-100 (higher = more "pure")
- **Calculation**: 100 minus number of checked items
- **Results Include**: 
  - Final numerical score
  - Personality badge (from "Innocent Soul" to "Irredeemably Corrupt")
  - Humorous description
  - Social sharing capabilities

## 🎨 Customization

### Adding Questions
Edit `data/questions.ts` to add or modify questions:

```typescript
{ id: 101, text: "Your new question", category: "Your Category" }
```

### Styling Changes
The app uses TailwindCSS. Key files:
- `app/globals.css` - Custom component styles
- `tailwind.config.js` - Theme configuration
- `components/RicePurityTest.tsx` - Main component styling

### Score Badges
Modify the `scoreBadges` array in `RicePurityTest.tsx` to customize result messages.

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build the project
npm run build

# Upload the 'out' folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables
Create `.env.local` for local development:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📱 PWA Support

The app includes a web manifest for Progressive Web App capabilities:
- Install on mobile devices
- Offline-ready structure
- Native app-like experience

## 🔒 Privacy

- **No Data Collection**: All responses are stored locally
- **No Tracking**: No analytics or user tracking
- **Anonymous**: No personal information required
- **Secure**: HTTPS only in production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- Classic Rice Purity Test concept updated for modern audiences
- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

- Create an issue for bug reports
- Start a discussion for feature requests
- Check existing issues before submitting

---

**Made with ❤️ for the college experience**

*Disclaimer: This is a recreation of the classic Rice Purity Test for entertainment purposes. Results are not scientifically validated and should be taken with humor.* 