import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/_firebase_init_";
import {
  loginWithEmail,
  loginWithGoogle,
  logOut,
  registerWithEmail,
} from "../services/firebaseAuth";
import secureApi from "../services/secureApi";

const AuthProvider = ({ children }) => {
  // states for loading, observer
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // auth observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const user = { email: currentUser?.email };

      if (currentUser) {
        try {
          await secureApi.post("/jwt", user);
        } catch (error) {
          console.log("jwt setup failed", error);
        }
      } else {
        try {
          await secureApi.post("/logout");
        } catch (error) {
          console.log("logout sync failed", error);
        }
      }

      // loading is truly done
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // register with email
  const registerUser = (email, password) => {
    setLoading(true);
    return registerWithEmail(email, password).catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // login with email
  const loginUser = (email, password) => {
    setLoading(true);
    return loginWithEmail(email, password).catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // login with google
  const loginGoogle = () => {
    setLoading(true);
    return loginWithGoogle().catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // logout with google
  const logOutUser = () => {
    setLoading(true);
    return logOut().catch((error) => {
      setLoading(false);
      throw error;
    });
  };

  // authInfo
  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginGoogle,
    logOutUser,
  };

  // return
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
