import { prisma } from '@/lib/db';
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function syncUser(clerkId: string, email: string) {
  try {
    const response = await fetch(`${API_URL}/api/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clerkId, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to sync user');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
}
