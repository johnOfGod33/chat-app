import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import socket from "~/utils/socket";
interface Message {
  name: string;
  profileImgUrl: string;
  text: string;
}

const Chat = () => {
  const location = useLocation();
  const { username } = location.state || { from: { pathname: "/" } }; // Get username from location sta
  const [message, setMessage] = useState("");
  const [isInChat, setIsInChat] = useState(true); // State to toggle chat form
  const [messages, setMessages] = useState<Message[]>([]); // State to store chat messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

  const handleLeaveChat = () => {
    if (isInChat) {
      setIsInChat(false); // Toggle to leave chat
      socket.disconnect(); // Emit disconnect event
    } else {
      // Logic to join another room (e.g., redirect to a room selection page)
      setIsInChat(true); // Reset to join chat
      setMessages([]); // Clear messages when joining a new room
      socket.connect();
      console.log("messages cleared");
      console.log("Joining another room...");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        name: username ? username : "Anonymous",
        profileImgUrl:
          "https://preview.redd.it/yta0xtiii3m21.jpg?width=640&crop=smart&auto=webp&s=e025206b98f5bc3e3628b8bb433e6085b4a2929f", // Replace with actual user image URL
        text: message,
      };

      socket.emit("new_message", newMessage);
    }
  };

  // Scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (username) {
      socket.auth = { username };
      socket.connect();
    }

    socket.on("connect_error", (error) => {
      if (error.message === "invalid username") {
        console.error("Invalid username");
      }
    });

    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(""); // Clear the input after sending
    });

    return () => {
      socket.off("receive_message"); // Clean up the event listener
      socket.off("connect_error"); // Clean up the event listener
      socket.off("send_message"); // Clean up the event listener
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" onClick={() => socket.disconnect()}>
          <h1 className="text-3xl font-bold">Chat Room</h1>
        </Link>
        <button
          onClick={handleLeaveChat}
          className={`font-bold py-2 px-4 rounded transition duration-300 cursor-pointer ${
            isInChat
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#9300EE] hover:bg-[#7a00b3]"
          }`}
        >
          {isInChat ? "Leave Room" : "Next"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 border border-gray-700 rounded-lg p-4">
        {/* Chat messages will go here */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start mb-4 border-b border-gray-700"
          >
            <img
              src={msg.profileImgUrl}
              alt={`${msg.name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex flex-col">
              <span className="font-bold">{msg.name}</span>
              <div className=" text-white p-2 rounded-lg">{msg.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
      </div>
      {isInChat && (
        <form onSubmit={handleSendMessage} className="flex mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-700 bg-gray-800 text-white p-2 rounded-l-lg outline-none"
          />
          <button
            type="submit"
            className="bg-[#9300EE] hover:bg-[#7a00b3] text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
