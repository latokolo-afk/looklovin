---
description: Start the development server
---

# Development Server Workflow

This workflow starts the Vite development server for local development.

## Steps

// turbo
1. Install dependencies (if not already installed):
```bash
npm install
```

// turbo
2. Start the development server:
```bash
npm run dev
```

3. The development server will start at `http://localhost:5173`
   - Hot module replacement is enabled
   - Changes to files will automatically reload the browser
   - The server will continue running until you stop it (Ctrl+C)

## Notes

- Make sure Node.js is installed on your system
- The dev server uses port 5173 by default
- If port 5173 is in use, Vite will automatically try the next available port
