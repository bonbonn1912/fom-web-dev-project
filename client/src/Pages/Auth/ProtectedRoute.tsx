// ProtectedWrapper.tsx
import React from 'react';
import { useAuth } from './authContext';

interface ProtectedWrapperProps {
  authElement: React.ReactElement;
  altElement: React.ReactElement;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ authElement, altElement } : ProtectedWrapperProps) => {
  const { isAuthenticated } = useAuth();

 /* if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } */

  return isAuthenticated ? authElement : altElement;
};

export default ProtectedWrapper;