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
src/
├── app/                          # App Router Pages
│   ├── layout.js                 # Shared layout (Navbar, Footer)
│   ├── page.js                   # Homepage
│   ├── chapters/
│   │   └── [id]/
│   │       └── page.jsx          # Chapter page
│   ├── novels/
│   │   └── page.jsx              # All Novels page
│   ├── profile/
│   │   └── page.jsx              # Profile page
│   └── ...                       # Other routes (otp, login, search, etc.)
│
├── components/                   # Reusable UI Components
│   ├── layout/                   # Navbar, Footer, etc.
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── SearchBar.jsx
│   ├── chapter/                  # Chapter‑specific components
│   │   ├── ChapterList.jsx
│   │   ├── ChapterHeader.jsx
│   │   └── CommentSection.jsx
│   ├── novel/                    # Novel‑related components
│   │   ├── RecommendedNovels.jsx
│   │   ├── NovelHeader.jsx
│   │   └── NovelActions.jsx
│   ├── auth/                     # Forms for login / register / reset
│   │   ├── ProfileForm.jsx
│   │   ├── PasswordForm.jsx
│   │   └── LoginForm.jsx
│   └── shared/                   # Carousel, Dashboard, Modal, etc.
│       ├── Carousel.jsx
│       └── Dashboard.jsx
│
├── hooks/                        # Custom React Hooks
│   ├── useUser.js
│   ├── useChapterData.js
│   └── useAuth.js
│
├── lib/                          # Utility libraries (non‑fetch logic)
│   └── utils.js
│
├── services/                     # API wrappers
│   ├── chapterAPI.js
│   ├── novelAPI.js
│   ├── authAPI.js
│   └── commentAPI.js
│
├── styles/
│   └── globals.css
│
└── public/


🚀 Live Demo
Experience FivePages live: https://five-pages-delta.vercel.app/
