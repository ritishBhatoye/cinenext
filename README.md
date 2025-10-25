# 🎬 CineNext - AI-Powered Movie Streaming Platform

A modern, intelligent movie streaming platform built with cutting-edge AI technology for personalized recommendations and enhanced user experience.

## ✨ Features

### 🤖 AI-Powered Recommendations

- **Smart Content Discovery**: Gemini AI analyzes viewing patterns and preferences
- **Personalized Suggestions**: Machine learning algorithms for tailored movie recommendations
- **Mood-Based Recommendations**: AI understands user context and suggests content accordingly
- **Similar Content Matching**: Advanced similarity algorithms for "More Like This" features

### 🎥 Streaming Experience

- **High-Quality Streaming**: Adaptive bitrate streaming for optimal viewing experience
- **Multi-Device Support**: Seamless experience across desktop, tablet, and mobile
- **Offline Downloads**: Save content for offline viewing
- **Watch History**: Track and resume viewing progress across devices

### 👤 User Experience

- **Intelligent Search**: AI-enhanced search with natural language processing
- **Smart Playlists**: Auto-generated playlists based on preferences
- **Social Features**: Share recommendations and create watchlists with friends
- **Accessibility**: Full screen reader support and keyboard navigation

### 📊 Analytics & Insights

- **Viewing Analytics**: Detailed insights into user behavior and preferences
- **Content Performance**: Track popular content and engagement metrics
- **A/B Testing**: Optimize recommendations through continuous testing

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions

### Backend & Database

- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[Supabase Auth](https://supabase.com/auth)** - Authentication and user management
- **[Supabase Storage](https://supabase.com/storage)** - File storage for media assets
- **[Supabase Edge Functions](https://supabase.com/edge-functions)** - Serverless functions

### AI & Machine Learning

- **[Google Gemini AI](https://deepmind.google/technologies/gemini/)** - Advanced AI for recommendations
- **[TensorFlow.js](https://www.tensorflow.org/js)** - Client-side ML models
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration and streaming

### State Management & Data

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Predictable state management
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching and caching
- **[React Query](https://tanstack.com/query/latest)** - Server state management

### Media & Streaming

- **[Video.js](https://videojs.com/)** - HTML5 video player
- **[HLS.js](https://github.com/video-dev/hls.js/)** - HTTP Live Streaming support
- **[FFmpeg.wasm](https://ffmpegwasm.netlify.app/)** - Client-side video processing

### Development & Deployment

- **[Vercel](https://vercel.com/)** - Deployment and hosting
- **[ESLint](https://eslint.org/)** - Code linting with strict rules
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for quality assurance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud account (for Gemini AI)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cinenext.git
   cd cinenext
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Gemini AI
   GOOGLE_AI_API_KEY=your_gemini_api_key

   # Other APIs
   TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Database Setup**

   ```bash
   npm run db:setup
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
cinenext/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Main app routes
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── features/          # Feature-specific components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utility functions
│   │   ├── ai/                # AI integration
│   │   ├── supabase/          # Supabase client
│   │   └── utils.ts           # Helper functions
│   ├── store/                 # Redux store
│   │   ├── slices/            # Redux slices
│   │   └── api/               # RTK Query APIs
│   ├── types/                 # TypeScript definitions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── supabase/                  # Supabase configuration
│   ├── migrations/            # Database migrations
│   └── functions/             # Edge functions
└── docs/                      # Documentation
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Database
npm run db:setup     # Setup database schema
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database with sample data

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

## 🤖 AI Features Implementation

### Recommendation Engine

The AI recommendation system uses multiple approaches:

1. **Collaborative Filtering**: Analyzes user behavior patterns
2. **Content-Based Filtering**: Matches content attributes
3. **Hybrid Approach**: Combines multiple algorithms for better accuracy
4. **Real-time Learning**: Continuously improves based on user interactions

### Gemini AI Integration

```typescript
// Example: Getting AI recommendations
const getAIRecommendations = async (
  userId: string,
  preferences: UserPreferences
) => {
  const prompt = `Based on user preferences: ${JSON.stringify(preferences)}, 
                  recommend 10 movies with explanations.`;

  const result = await gemini.generateContent(prompt);
  return parseRecommendations(result.response.text());
};
```

## 🔐 Authentication & Security

- **Supabase Auth**: Secure authentication with multiple providers
- **Row Level Security (RLS)**: Database-level security policies
- **JWT Tokens**: Secure API communication
- **Rate Limiting**: API protection against abuse
- **Content Security Policy**: XSS protection

## 📱 Responsive Design

Built with mobile-first approach:

- **Breakpoints**: Tailored for all screen sizes
- **Touch Gestures**: Optimized for mobile interactions
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Core functionality works offline

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Docker

```bash
docker build -t cinenext .
docker run -p 3000:3000 cinenext
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Unsplash](https://unsplash.com/) for placeholder images
- [Lucide](https://lucide.dev/) for beautiful icons
- Open source community for amazing tools and libraries

## 📞 Support

- 📧 Email: support@cinenext.com
- 💬 Discord: [Join our community](https://discord.gg/cinenext)
- 📖 Documentation: [docs.cinenext.com](https://docs.cinenext.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/cinenext/issues)

---

<div align="center">
  <p>Built with ❤️ by the CineNext Team</p>
  <p>
    <a href="https://cinenext.com">Website</a> •
    <a href="https://twitter.com/cinenext">Twitter</a> •
    <a href="https://linkedin.com/company/cinenext">LinkedIn</a>
  </p>
</div>
