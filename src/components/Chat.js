import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import Messages from './Messages'
import { db } from "../firebase";
import firebase from "firebase";
import moment from "moment";
// import FlipMove from 'react-flip-move'
// import Loader from './Loader'

const Chat = ({ user }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      // setMessages([...messages, {username: username, text: input, id: id}])
      db.collection("messages").add({
        text: input,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: user.uid,
      });
      setInput("");
    } else {
      setInput("");
    }
    // console.log(messages);
    // console.log("hi");
  };

  // const handleChange = (e) => {
  //     let localData = JSON.parse(localStorage.getItem("USERNAME"))
  //     let newUserName = prompt("Please enter your new username")
  //     if(newUserName) {
  //         let userDetails = {id: localData.id, username: newUserName}
  //         localStorage.setItem("USERNAME", JSON.stringify(userDetails))
  //         setUser(newUserName)
  //     }
  // }

  const text = messages.length ? (
    messages.map((message) => {
      return (
        <div  className={`message ${user.uid === message.id && "message-user"}`}  key={Math.random()}>
          <span  className={user.uid === message.id ? "user-right" : "user-left"} >
            {message.username}
          </span>{" "}
          <br />
          <p className={`message-content ${ user.uid === message.id  ? "message-user-card"  : "message-guest-card"}`} >
            {message.text} <br />
            <span className="chat-time">
              {message.timestamp &&
                moment(message.timestamp.toDate()).fromNow()}
            </span>
          </p>
        </div>
      );
    })
  ) : (
    <div className="preloader-wrapper small active preloader">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
  // username={username}

  const userIsLogin = !user ? (
    <Redirect to="/signup" />
  ) : (
    <div className="container chat-container p-top">
      <form onSubmit={sendMessage} className="chat-form">
        <input
          className="black-text"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button
          disabled={!input}
          className="btn-small btn-style z-depth-1 black"
        >
          Send
        </button>
      </form>
      <div className="all-msg">
        {/* <FlipMove duration={500} easing="ease-in-out">{text}</FlipMove> */}
        {text}
      </div>
    </div>
  );
  return <div>{userIsLogin}</div>;
};

export default Chat;
