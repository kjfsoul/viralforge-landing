# ViralForge Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS. This project features an oracle reading system, product showcase, and e-commerce integration.

## Features

- 🎯 **Modern Landing Page** - Clean, responsive design with smooth animations
- 🔮 **Oracle Reading System** - Interactive oracle card readings and surveys
- 🛍️ **Product Showcase** - Dynamic product display with Printify integration
- 📱 **Mobile-First Design** - Fully responsive across all devices
- ⚡ **Performance Optimized** - Built with Next.js 14 for optimal performance
- 🎨 **Beautiful UI Components** - Custom UI components built with Radix UI
- 🔐 **Secure** - Environment variables and secrets properly configured

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Prisma + Supabase
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account (for database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kjfsoul/viralforge-landing.git
cd viralforge-landing
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
DATABASE_URL="your-database-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="your-nextauth-secret"

# Printify API
PRINTIFY_API_TOKEN="your-printify-token"
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3002](http://localhost:3002) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── shop/              # Shop pages
│   └── social/            # Social media pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
├── data/                 # Static data files
├── prisma/               # Database schema
└── public/               # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Environment Variables

Make sure to set up the following environment variables:

- `DATABASE_URL` - Database connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXTAUTH_URL` - NextAuth.js URL
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `PRINTIFY_API_TOKEN` - Printify API token

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

Built with ❤️ by [kjfsoul](https://github.com/kjfsoul)
