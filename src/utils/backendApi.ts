
import jwt from 'jsonwebtoken';
import { BACKEND_URL, BACKEND_JWT } from '@/config/backend';

export interface CreateUserRequest {
  email: string;
  password: string;
}

// Generate JWT token using HS256 algorithm for n8n authentication
const generateJWTToken = (): string => {
  const payload = {
    iss: 'scola-app', // issuer
    iat: Math.floor(Date.now() / 1000), // issued at
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // expires in 1 hour
  };

  return jwt.sign(payload, BACKEND_JWT, { 
    algorithm: 'HS256',
    header: {
      typ: 'JWT',
      alg: 'HS256'
    }
  });
};

// Generic function to call any backend endpoint with JWT authentication
export const callBackendApi = async (endpoint: string, data: any): Promise<any> => {
  try {
    const token = generateJWTToken();
    
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
    }

    console.log(`Backend request to ${endpoint} successful`);
    
    // Return response data if there is any
    const responseText = await response.text();
    return responseText ? JSON.parse(responseText) : null;
  } catch (error) {
    console.error(`Error calling backend endpoint ${endpoint}:`, error);
    throw error;
  }
};

// Specific function for creating users (using the generic function)
export const createUserInBackend = async (userData: CreateUserRequest): Promise<void> => {
  await callBackendApi('/webhook/create/user', userData);
};
