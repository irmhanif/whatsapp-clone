import React, { useEffect, useState } from "react";
import './Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic} from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import db from './firebase'
import firebase from "firebase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] =useStateValue(); 

  useEffect(() => {
    if(roomId) {
      db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
      db.collection('rooms')
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot => 
           setMessages(snapshot.docs.map(doc =>
             doc.data()))
        );
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }

  }
  const callProfile = () => {
    document.getElementsByClassName("sidebar")[0].style.display = "block";
  };
  let w = window.innerWidth;
  let button;
  if (w) {
    button = <ArrowBackIcon onClick={callProfile} />;
  } 

  
    return (
      <div className="chat">
        <div className="chat__header">
          {button}
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${Math.floor(
              Math.random() * 5000
            )}.svg`}
          />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>
              last message {" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>

            <IconButton>
              <AttachFile />
            </IconButton>

            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>

        <div className="chat__body">
          {messages.map((message, index) => {
            if (message.message !== "") {
              return (
                <p
                  key={index}
                  className={`chat_message ${
                    message.email === user.email && "chat__receiver"
                  }`}
                >
                  <span className="chat__name">{message.name}</span>
                  {message.message}
                  <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
                </p>
              );
            }
          })}
        </div>

        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type a message"
            />
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
          </form>
          <Mic />
        </div>
      </div>
    );
}

export default Chat
