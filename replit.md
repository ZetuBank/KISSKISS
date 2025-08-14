# KISS - Keep It Simple & Secure

## Overview

KISS is a React-based web application that provides a secure environment for rendering and displaying HTML content. The system allows users to load external HTML content (like flipbooks, media galleries, and interactive demos) in a controlled, themed interface. It features a modern design system with multiple theme options, smooth animations, and a focus on user experience and security.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **TailwindCSS** for utility-first styling with custom CSS variables for theming
- **Shadcn/ui** components built on Radix UI primitives for accessible, customizable UI components

### Component Structure
- **Theme System**: Dynamic theme switching with CSS custom properties supporting light, dark, ocean, sunset, forest, and purple themes
- **HTML Viewer**: Secure component for rendering external HTML content with `dangerouslySetInnerHTML`
- **Loader Component**: Animated loading screen with security-focused branding
- **Theme Provider**: Context-based theme management with localStorage persistence

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **File-based content storage** in `server/html-content/` directory for HTML templates
- **Development/Production** environment handling with Vite integration
- **Static file serving** for built client assets

### API Design
- RESTful endpoint `/api/html-content/:id` for fetching HTML content by ID
- Content includes automatic title extraction from HTML `<title>` tags
- Error handling for missing content with appropriate HTTP status codes

### State Management
- **React Query (TanStack Query)** for server state management and caching
- **React Context** for theme state management
- **Local Storage** for theme preference persistence
- Component-level state for UI interactions

### Development Experience
- **Hot Module Replacement** via Vite for instant development feedback
- **TypeScript** with strict configuration for type safety
- **Path aliases** configured for clean imports (@/, @shared/, @assets/)
- **ESLint and Prettier** integration through Replit environment

### Security Considerations
- HTML content is sanitized through controlled rendering environment
- External content is loaded from trusted sources only
- No direct database access - uses file-based content storage
- Session-based approach ready for future authentication implementation

### Styling Architecture
- **CSS Custom Properties** for dynamic theming without CSS-in-JS overhead
- **TailwindCSS** utility classes with custom color system
- **Responsive design** with mobile-first approach
- **Dark mode support** with automatic theme detection

### Content Management
- Static HTML files stored in server directory structure
- Automatic title extraction and metadata generation
- Support for interactive HTML elements including forms and media
- External asset loading (images, videos) from CDN sources

## External Dependencies

### Core Framework Dependencies
- **React 18** - Frontend framework with hooks and modern features
- **Express.js** - Backend web framework for API routes
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and enhanced development experience

### UI and Styling
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (@radix-ui/*)
- **Lucide React** - Icon library for consistent iconography
- **Class Variance Authority** - Utility for managing component variants

### State and Data Management
- **TanStack React Query** - Server state management and caching
- **React Hook Form** - Form state management with validation
- **Zod** - Schema validation for type-safe data handling

### Development Tools
- **Wouter** - Lightweight routing library
- **Date-fns** - Date manipulation utilities
- **Nanoid** - Unique ID generation
- **CMDK** - Command palette component

### Database and Storage
- **Drizzle ORM** - Type-safe database ORM
- **Drizzle Zod** - Schema validation integration
- **@neondatabase/serverless** - Serverless PostgreSQL driver
- **Connect-pg-simple** - PostgreSQL session store

### External Services
- **Unsplash** - External image CDN for sample media content
- **Google Fonts** - Web fonts (DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Heyzine** - Flipbook embedding service (placeholder integration)

### Build and Development
- **PostCSS** - CSS processing with Autoprefixer
- **ESBuild** - Fast JavaScript bundler for production builds
- **TSX** - TypeScript execution for development server