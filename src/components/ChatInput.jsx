import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

// this function is for handling the chat input
export function ChatInput({ chatMessages, setChatMessages }) {
  const [isloading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem("messages", JSON.stringify(chatMessages)) || [];
  }
  // this function is for sending input msg or receiving output message
  async function sendMessage() {
    if (isloading || inputText === "") {
      return;
    }

    // Set isLoading to true at the start, and set it to
    // false after everything is done.
    setIsLoading(true);
    setInputText("");
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
        sender: "chatbot",
        id: crypto.randomUUID(),
      },
    ]);
    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "chatbot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setIsLoading(false);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="send a message"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
