import React, { useEffect, useState } from "react";
import './SidebarChat.css'

import { Avatar, IconButton } from "@material-ui/core";


function SidebarChat({addNewChart}) {
    const [seed, setSeed] = useState('');

    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName) {
            
        }
    }

    return !addNewChart ? (
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>Name</h2>
          <p>last message...</p>
        </div>
      </div>
    ) : (
      <div onClick={createChat} className="sidebarChat">
          <h2>Add new Chat</h2>
      </div>
    );
}

export default SidebarChat
