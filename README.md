# Todo List Challenge

Welcome to the technical interview exercise! This project is a fully functional Todo List application built with modern technologies. Your task is to **add a Tags feature** on top of this existing codebase.

## Table of Contents

- [Setup](#setup)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Current Features](#current-features)
- [Your Assignment: Add Tags Feature](#your-assignment-add-tags-feature)
- [Evaluation Criteria](#evaluation-criteria)

## Setup

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm start
```

The production server will run at [http://localhost:3000](http://localhost:3000)

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
todo-list-challenge/
├── src/
│   ├── server/              # Backend (Hono API)
│   │   ├── db.ts           # In-memory database with CRUD operations
│   │   ├── schemas.ts      # Zod validation schemas
│   │   └── index.ts        # API routes (GET, POST, PATCH, DELETE)
│   │
│   ├── routes/             # Tanstack Router routes
│   │   ├── __root.tsx      # Root layout with providers
│   │   └── index.tsx       # Home page
│   │
│   ├── api/                # Frontend API integration
│   │   └── todos.ts        # Tanstack Query hooks
│   │
│   ├── components/         # React components
│   │   ├── todo-form.tsx   # Create todo form
│   │   ├── todo-item.tsx   # Individual todo display
│   │   └── todo-list.tsx   # List of todos
│   │
│   └── main.tsx            # React entry point
│
├── index.html              # HTML entry
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Technology Stack

- **Backend**: [Hono](https://hono.dev/) - Fast web framework
- **Frontend**: [React 19](https://react.dev/) - UI library
- **Router**: [Tanstack Router](https://tanstack.com/router) - Type-safe routing
- **Data Fetching**: [Tanstack Query](https://tanstack.com/query) - Async state management
- **UI Components**: [Mantine](https://mantine.dev/) - Component library
- **Validation**: [Zod](https://zod.dev/) - Schema validation
- **Build Tool**: [Vite](https://vite.dev/) - Fast build tool
- **Language**: TypeScript with strict mode

## Current Features

The application currently implements a complete CRUD Todo List:

### Backend (API)

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo (title or completed status)
- `DELETE /api/todos/:id` - Delete a todo

### Frontend

- Display list of todos
- Create new todos
- Toggle completion status
- Delete todos
- Loading states during mutations
- Empty state when no todos exist

### Data Model

```typescript
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
```

## Your Assignment: Add Tags Feature

Your task is to extend this application by adding a **Tags** feature. Users should be able to create tags (eg: chore, admistrative, ...) and assign them to todos.

Bonus: if time permits you can implement filtering on the tags.

Feel free to use coding assistants (Claude Code, Copilot...) or not depending on which workflow you are most comfortable with. You should be ready to explain and show your understanding of the generated code however.
