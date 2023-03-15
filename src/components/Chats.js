import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  console.log(user);

  const handleLogout = async() => {
   await signOut(auth);
    history.push("/");
  };

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectId="16492559-44b8-46da-9e76-12090a7de71e"
        userName="."
        userSecret="."
      />
    </div>
  );
};

export default Chats;
