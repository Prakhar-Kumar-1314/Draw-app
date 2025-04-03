# Draw App - Collaborative Drawing Platform

A real-time collaborative drawing application built with Next.js, WebSocket, and TypeScript. This application allows multiple users to draw together in real-time, with features like chat rooms and persistent storage.

## Features

- 🎨 Real-time collaborative drawing
- 💬 Built-in chat functionality
- 🔗 Room-based collaboration
- 🎯 Real-time cursor tracking
- 💾 Persistent storage
- 🚀 Modern tech stack
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, WebSocket
- **Database**: Prisma with SQL database
- **Styling**: CSS Modules
- **Build Tool**: Turborepo
- **Package Manager**: pnpm

## Project Structure

```
draw-app/
├── apps/
│   ├── web/               # Next.js frontend application
│   ├── http-backend/      # HTTP API server
│   └── ws-backend/        # WebSocket server for real-time features
├── packages/
│   ├── common/            # Shared types and utilities
│   ├── db/               # Database layer with Prisma
│   ├── ui/               # Shared UI components
│   └── eslint-config/    # ESLint configurations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- SQL database (for persistent storage)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Prakhar-Kumar-1314/Draw-app.git
cd Draw-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/http-backend/.env.example apps/http-backend/.env
cp apps/ws-backend/.env.example apps/ws-backend/.env
```

4. Start the development servers:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Development

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Run linting
- `pnpm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Real-time features powered by WebSocket
- UI components inspired by modern design systems
