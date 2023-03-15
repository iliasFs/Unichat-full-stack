import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  //we manage the users data. Children will render all the jsx passed in to this provider

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    //we get the user data from firebase authentication
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // thats going to renavigate us to '/chat'

      if (user) history.push("/chats");
    });
    // so whenever the user changes(add user) or we renavigate the useEffect with execute
  }, [user, history]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
