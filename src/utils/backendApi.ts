
import { BACKEND_URL, BACKEND_JWT } from '@/config/backend';

export interface CreateUserRequest {
  email: string;
  password: string;
}

export const createUserInBackend = async (userData: CreateUserRequest): Promise<void> => {
  try {
    const response = await fetch(`${BACKEND_URL}/webhook/create/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BACKEND_JWT}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
    }

    console.log('User created successfully in backend');
  } catch (error) {
    console.error('Error creating user in backend:', error);
    throw error;
  }
};
