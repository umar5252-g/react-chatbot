import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import robot from "./assets/robot.png";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages)) || [];
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
      "what are you?": function () {
        return "I am a chatbot and I am here to help you.";
      },
      "whats your name ": "my name is Umars Chatbot ",
      "what can you do for me ":
        "wale khair kho de za sa sta nokar yam sa? da tizar zweya lakho",
    });

    // [] tells useEffect to only run once. We only want to run
  }, []);

  return (
    <>
      <link rel="icon" href={robot} />
      <title>Chatbot</title>
      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project! Send a message using the textox
            below
          </p>
        )}
        <ChatMessages chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App;
