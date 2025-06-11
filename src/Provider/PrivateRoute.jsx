import React, { useContext } from 'react';
import { Navigate } from 'react-router'; 
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); 

 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default PrivateRoute;

