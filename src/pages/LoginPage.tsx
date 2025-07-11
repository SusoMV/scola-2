
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-scola-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
