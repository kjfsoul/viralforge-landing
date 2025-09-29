// Temporarily disable database functionality for deployment
// TODO: Re-enable once Prisma configuration is fixed for Vercel

export const prisma = {
  // Mock implementation to prevent build errors
  $connect: async () => Promise.resolve(),
  $disconnect: async () => Promise.resolve(),
  // Add other mock methods as needed
}
