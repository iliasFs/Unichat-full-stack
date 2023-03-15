import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import {
  
  signInWithRedirect,
  GoogleAuthProvider,
  
  FacebookAuthProvider
} from "firebase/auth";
import "firebase/app";
import { auth } from "../firebase";


const Login = () => {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };


  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithRedirect(auth, provider)
      
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Unichat</h2>
        <div className="login-button google" onClick={signInWithGoogle}>
          <GoogleOutlined /> Sign In with Google
        </div>
        <br /> <br />
        <div
          className="login-button facebook"
          onClick={signInWithFacebook}
        >
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
