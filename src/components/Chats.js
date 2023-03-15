import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);

  const handleLogout = async () => {
    await signOut(auth);
    history.push("/");
  };

  //function for handling our images in the chat
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob(); //the blob contains our image
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
// if we got the user from above we want to see now if the user has been created to the chatengine api.so we make the call with headers etc.
// the information about the user is coming from above.Specifically from the useAuth function.
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "16492559-44b8-46da-9e76-12090a7de71e",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      //so if there is a user we can immediately show the chat for this specific user.and we set loading to false.
      .then(() => {
        setLoading(false);
      }) //what happens if we dont already have a chat engine profile?? We have to create it .catch-->
      .catch(() => {
        //we want to prepare all of our data to create a new user. its like a schema i suppose
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.displayName);
        formdata.append("secret", user.uid);
        getFile(user.photoUrl).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "5ee1c075-4167-4983-a03d-03b782c08359",
              },
            })
            .then(() => setLoading(false)); 
            .catch((error)=> console.log(error))
            //if its not
            
        });
      });
  }, [user, history]);

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
