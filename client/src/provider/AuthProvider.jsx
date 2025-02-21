import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUSer] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign Up
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signIn
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  //update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const authInfo = {
    user,
    loading,
    signUpUser,
    signInUser,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
