// Maintenance mode flag for OPN WRLD website
// When true, the site renders the full-screen maintenance / coming soon landing page
export const IS_MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'false';
