# Gantt Chart Example

A MERN stack application featuring an interactive Gantt chart with timezone support, task management, and real-time updates.

## Features

- Interactive Gantt chart with drag-and-drop support
- Multi-timezone support with automatic conversion (19 timezones including fractional offsets)
- Task CRUD operations with real-time updates
- Priority levels (Low, Normal, High)
- Task duration and progress tracking
- Persistent timezone preferences
- Responsive design with Tailwind CSS
- Toast notifications for operation feedback

## Prerequisites

- Node.js version 20.9 or higher
- npm version 10 or higher
- Docker and Docker Compose
- MongoDB (handled via Docker)

### Important Notes for Linux Users

If you haven't added your user to the docker group, you'll need to use `sudo` for Docker commands. In this case, the npm scripts that use Docker won't work directly. Run these commands separately:

The application will be available at:

- sudo docker compose up -d
- sudo docker compose down
- ts-node src/database/seed.ts

## Environment Setup

Create a `.env` file in the server package:
with variables :
MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD
PORT
DB_NAME

## Development server starts with:

1. Install dependencies:

- npm run install:all

2. Start MongoDB and seed data:

- npm run dev:init

3. Start development server:

- npm run dev

- Frontend(Built and copied to server static folder and every build is copied while dev server is running): http://localhost:${PORT}
- Backend API: http://localhost:${PORT}/api

## Available Scripts

### Root Level

- `npm run dev` - Starts both client and server in development mode
- `npm run dev:server` - Starts only the server
- `npm run dev:client` - Starts only the client
- `npm run dev:init` - Initializes and seeds the database
- `npm run build` - Builds both client and server
- `npm run start` - Starts the production server
- `npm run install:all` - Installs all dependencies
- `npm run clean` - Removes all node_modules
- `npm run clean:install` - Clean install of all dependencies

### Server Package

- `npm run dev` - Starts server with nodemon
- `npm run db:up` - Starts MongoDB container
- `npm run db:down` - Stops MongoDB container
- `npm run db:seed` - Seeds the database
- `npm run db:init` - Initializes and seeds database
- `npm run build` - Builds TypeScript
- `npm run start` - Starts production server

### Client Package

- `npm run dev` - Starts development server
- `npm run build` - Production build
- `npm run lint` - Runs ESLint
- `npm run preview` - Preview production build

## Project Structure

gantt-chart-example/
├── packages/
│ ├── client/ # React frontend
│ │ ├── src/
│ │ │ ├── components/ # React components
│ │ │ ├── hooks/ # Custom hooks
│ │ │ ├── context/ # React context
│ │ │ └── types/ # TypeScript types
│ │ └── package.json
│ └── server/ # Express backend
│ ├── src/
│ │ ├── database/ # MongoDB models and connection
│ │ ├── routes/ # API routes
│ │ └── app.ts # Express application
│ └── package.json
└── package.json # Root package.json

## Technical Stack

### Frontend

- React 18 with TypeScript
- DHTMLX Gantt (v6.2.2)
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API requests
- React Hot Toast for notifications

### Backend

- Node.js with Express
- MongoDB with Mongoose
- TypeScript
- Docker for containerization

## Features Implementation

### Timezone Support

The application supports 19 different timezones including:

- UTC (Universal Time Coordinated)
- Americas (EDT, CDT, MDT, PDT, BRT)
- Europe (BST, CEST, MSK)
- Asia (GST, IST, SGT, JST, CST, KST)
- Oceania (AEST, AWST, NZST)

### Task Management

Tasks support the following features:

- Task name and description
- Start and end dates
- Duration tracking
- Progress percentage
- Priority levels (Low, Normal, High)
- Parent-child relationships
- Drag-and-drop rescheduling

### Real-time Updates

All task operations (create, update, delete) are immediately synchronized with the backend and reflect in the UI with status notifications.

## Development

### Adding New Features

1. Create feature branch from main
2. Implement changes
3. Add tests if applicable
4. Submit pull request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Follow React hooks guidelines

### Testing

- Run `npm run lint` for static analysis
- Test across different timezones
- Verify CRUD operations

## Known Issues and Limitations

1. Docker commands require sudo on Linux if user is not in docker group
2. Node.js version must be exactly 20.9
3. Limited to 19 predefined timezones
4. Responsiveness Issues

## Troubleshooting

### Common Issues

1. MongoDB Connection:

   - Verify Docker is running
   - Check MongoDB container status
   - Confirm correct connection string

2. Build Failures:

   - Clear node_modules: `npm run clean`
   - Reinstall dependencies: `npm run clean:install`
   - Verify Node.js version

3. Timezone Issues:
   - Check browser timezone settings
   - Verify task dates in database
   - Confirm timezone conversion logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

- GitHub Issues
- Documentation Wiki
- Stack Overflow Tags: gantt-chart, dhtmlx-gantt

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DHTMLX Gantt for the chart component
- MongoDB team for the database
- React community for hooks and components
