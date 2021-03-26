import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
import MessageText from "../../components/messageText/messageText";
import ScrollToBottom from "react-scroll-to-bottom";
import InfoBar from "../../components/infoBar/InfoBar";

let socket;
let currentUser = "";

function Chat({ location, history }) {
  
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  let END_POINT = "localhost:5500";

  useEffect(() => {
    let { name, room } = queryString.parse(location.search);
    currentUser = name.trim().toLowerCase();

    setRoom(room);
    
    // Server initiation 
    socket = io(END_POINT);

    // Join to conversation
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        history.replace("/");
      }
    });
  }, [END_POINT, location.search, history]);

  useEffect(() => {
    // Handle the messages  
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (text !== "") {
      socket.emit("send-message", text);
      setText("");
    }
  };

  return (
    <div className="outer d-flex justify-content-center">
      <div className="message_container">
        <InfoBar roomName={room} />

        <ScrollToBottom className="scroll">
          {messages.map((element, index) => {
            return (
              <div key={index} className="m-2">
                <MessageText
                  text={element.text}
                  user={element.user}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </ScrollToBottom>

        <div className="container fixed-bottom">
          <div>
            <form>
              <div className="form-group d-flex">
                <input
                  onChange={(e) => {
                    e.preventDefault();
                    setText(e.target.value);
                  }}
                  type="text"
                  value={text}
                  className="form-control form-control-lg mx-2"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter message"
                />
                <button
                  onClick={(e) => sendMessage(e)}
                  className="btn btn-primary mx-2"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
