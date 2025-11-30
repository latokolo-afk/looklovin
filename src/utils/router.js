// Simple client-side router for SPA navigation
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    // Register a route
    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    // Navigate to a route
    navigate(path) {
        window.location.hash = path;
    }

    // Handle route changes
    async handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, ...params] = hash.split('/').filter(Boolean);
        const route = '/' + (path || '');

        // Find matching route
        const handler = this.routes[route] || this.routes['/'];

        if (handler) {
            this.currentRoute = route;

            // Scroll to top on route change
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Execute route handler
            await handler(params);
        }
    }

    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }
}

export const router = new Router();
