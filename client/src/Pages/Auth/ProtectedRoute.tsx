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
  if(isAuthenticated){
    return authElement;
  }else{
    window.history.replaceState(null, "", "/");
    return altElement;
  }
};

export default ProtectedWrapper;