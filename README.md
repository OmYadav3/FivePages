# FivePages

FivePages is a full-stack web application designed for novel enthusiasts to discover, read, and discuss a wide range of literary works. Built with Next.js and Node.js, the platform offers an intuitive interface for browsing popular titles, exploring new releases, and engaging with a community of readers and authors.

🔧 Tech Stack
Frontend: Next.js, React, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Deployment: Vercel (Frontend), Railway (Backend)

🌟 Features
Browse and read novels across various genres

Discover trending and newly released titles

User authentication and profile management

Community engagement through Discord integration

Admin dashboard for content and user management

## 📂 Project Structure

```text
fivepages-FE/
├── .next/                     # Next.js build output (auto-generated)
├── node_modules/              # Installed npm packages
├── public/                    # Static assets like images, icons, etc.
├── src/                       # Source code
│   ├── app/                   # App directory for routing (Next.js App Router)
│   │   ├── admin-page/        # Admin panel pages
│   │   ├── allnovels/         # All novels page
│   │   ├── chapters/          # Chapter detail pages
│   │   ├── contact/           # Contact page
│   │   ├── forgot-password/   # Forgot password page
│   │   ├── login/             # Login page
│   │   ├── new-releases-page/ # New releases section
│   │   ├── novels/            # Individual novel pages
│   │   ├── otp/               # OTP verification pages
│   │   ├── popularbooks/      # Popular books section
│   │   ├── profile/           # User profile page
│   │   ├── search/            # Search results page
│   │   ├── favicon.ico        # Favicon
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout component
│   │   └── page.js            # Main index route
│
│   ├── components/            # Reusable UI components
│   │   ├── auth/              # Auth-related components
│   │   ├── chapter/           # Chapter-related components
│   │   ├── CommentSection/    # Comment section UI
│   │   ├── layout/            # Layout components
│   │   ├── novel/             # Novel-related components
│   │   ├── shared/            # Shared utilities (e.g., loaders)
│   │   └── LazyRender.jsx     # Lazy load render component
│
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useBooks.js
│   │   ├── useChapterData.js
│   │   ├── useForgotPassword.js
│   │   ├── useNovelData.js
│   │   ├── useSearchResults.js
│   │   └── useUser.js
│
│   ├── lib/                   # Helper functions or libraries
│   │   └── utils.js
│
│   ├── services/              # API service handlers
│   │   └── _api.js
│
├── .env                       # Environment variables
├── .env.local                 # Local environment config
├── .gitignore                 # Git ignore rules
├── components.json            # Component metadata (optional)
├── eslint.config.mjs          # ESLint configuration
└── tsconfig.json              # TypeScript config (if using TS)


🚀 Live Demo
Experience FivePages live: https://five-pages-delta.vercel.app/
