import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;