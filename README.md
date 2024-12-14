# Portfolio Analysis Application

A modern web application built with React, TypeScript, and Vite that provides portfolio analysis capabilities using the Lyzr API.

## Features

- Portfolio analysis and visualization
- Real-time data processing
- Interactive chat interface
- Modern, responsive UI with Tailwind CSS
- Authentication using Clerk
- Data persistence with Prisma and Supabase

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables:
```
LYZR_API_KEY=your-api-key-here
```

## Development

To run the development server:

```bash
npm run dev
```

This will start both the frontend and backend servers concurrently:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

Other available scripts:
- `npm run dev:frontend`: Run only the frontend development server
- `npm run dev:backend`: Run only the backend development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint for code quality checks

## Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion
  - React Router DOM
  - Recharts for data visualization

- **Backend**:
  - Express.js
  - Prisma ORM
  - Supabase
  - Netlify Functions

- **Authentication**:
  - Clerk

## Deployment

The application is configured for deployment on Netlify. The `netlify.toml` file contains the necessary deployment configurations.

To deploy:
1. Push your changes to the main branch
2. Netlify will automatically build and deploy your application

## Project Structure

```
├── src/
│   ├── features/        # Feature-based components and services
│   ├── server/          # Backend API code
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── netlify/             # Netlify function configurations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
