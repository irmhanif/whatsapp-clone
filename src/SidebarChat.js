import React, { useEffect, useState } from "react";
import './SidebarChat.css'
import db from './firebase';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";


function SidebarChat({addNewChart, id, name}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
      if(id) {
        db.collection('rooms').doc(id)
        .collection('messages').orderBy('timestamp','desc')
        .onSnapshot(snapshot => (
          setMessages(snapshot.docs.map((doc) =>
          doc.data()))
        ))
      }
    }, [id])
    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, []);

    const toggleProfile = () =>{
      var w = window.innerWidth;
      if(w<=600) {
        document.getElementsByClassName("sidebar")[0].style.display = "none";
      }
    }

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName) {
            db.collection('rooms').add({
              name: roomName,
            })
        }
    }

    return !addNewChart ? (
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat" onClick={toggleProfile}>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
      </div>
    );
}

export default SidebarChat
