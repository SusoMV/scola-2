

import { BACKEND_URL, BACKEND_JWT } from '@/config/backend';

export interface CreateUserRequest {
  email: string;
  password: string;
}

// Base64 URL encode function
const base64UrlEncode = (str: string): string => {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// Generate JWT token using HS256 algorithm for n8n authentication (browser-compatible)
const generateJWTToken = async (): Promise<string> => {
  const header = {
    typ: 'JWT',
    alg: 'HS256'
  };

  const payload = {
    iss: 'scola-app', // issuer
    iat: Math.floor(Date.now() / 1000), // issued at
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // expires in 1 hour
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  const message = `${encodedHeader}.${encodedPayload}`;
  
  // Create signature using Web Crypto API
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(BACKEND_JWT),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
  
  return `${message}.${encodedSignature}`;
};

// Generic function to call any backend endpoint with JWT authentication
export const callBackendApi = async (endpoint: string, data: any): Promise<any> => {
  try {
    const token = await generateJWTToken();
    
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

