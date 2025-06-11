import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import app from '../utils/FirebaseApp.jsx';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
        toast('User logged out successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(`${errorMessage}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
   const githubLogin = () => {
      setLoading(true);
    return signInWithPopup(auth, GithubProvider);
  };

 

  const authData = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
    handleLogout,
    handleGoogleSignIn,
    githubLogin,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
