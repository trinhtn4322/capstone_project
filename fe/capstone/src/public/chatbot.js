import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import chatbotIcon from "../assets/Artboard 8.png";
import { FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ resetStep }) => {  // Thêm props resetStep
  const [messages, setMessages] = useState([
    { sender: "user2", text: "XIN CHÀO CYNOBOT CÓ THỂ GIÚP BẠN ĐIỀU GÌ ?", logo: chatbotIcon },
  ]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  let isBotReplying = false;

  const fetchChatbotResponse = async (query) => {
    try {
      const response = await axios.post("https://cynosure.id.vn:5362/gemini", {
        messages: [query]
      });
      if (response.data.success) {
        return response.data.data[0];
      } else {
        return "Có lỗi xảy ra, vui lòng thử lại sau.";
      }
    } catch (error) {
      console.error("Error calling backend API:", error);
      return "Có lỗi xảy ra, vui lòng thử lại sau.";
    }
  };

  const handleSendMessage = async () => {
    if (!isBotReplying && message.trim() !== "") {
      isBotReplying = true;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user1", text: message },
      ]);
      setMessage("");

      try {
        const chatbotResponse = await fetchChatbotResponse(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "user2", text: chatbotResponse, logo: chatbotIcon },
        ]);
      } catch (error) {
        console.error("Error handling send:", error);
      }

      isBotReplying = false;
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.value += "\n";
        handleInputResize();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="flex h-screen p-4">
      <div className="w-1/5 p-4 bg-gray-900 rounded-3xl relative flex-col">
        <div className="p-4 md:p-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white font-bold rounded-3xl mb-4">
          <h2 className="text-lg font-bold mb-4">RAG Mode</h2>
          <div className="mb-4">
            <label className="block text-white mb-2">Tải PDF lên:</label>
          </div>
          <button 
            className="bg-green-500 text-white p-2 rounded w-full"
            onClick={resetStep}  // Gọi hàm reset khi bấm nút
          >
            Quay lại Upload
          </button>
        </div>
      </div>
      <div className="w-4/5 flex flex-col ml-4 p-4 bg-gray-800 rounded-3xl shadow-lg text-2xl">
        <div className="flex-1 overflow-auto bg-gray-900 p-10 rounded-3xl shadow-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center mb-3 ${
                msg.sender === "user1" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`message ${
                  msg.sender === "user1"
                    ? "user-message bg-blue-300 text-blue-800 ml-[10vw]"
                    : "bot-message bg-green-100 text-blue-900 mr-[10vw]"
                } px-5 py-2.5 rounded-3xl`}
              >
                {msg.sender === "user2" && (
                  <img
                    src={msg.logo}
                    alt="Chatbot Icon"
                    className="w-8 h-8 mr-2 inline-block"
                  />
                )}
                <span className="content">{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="relative flex items-center w-full max-w-[60vw]">
            <textarea
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              className="flex-1 p-2 border rounded-[2rem] resize-none overflow-hidden border-0 py-4 px-4 max-h-[4vw] bg-gray-700 w-full text-white"
              style={{ height: "4vw" }}
              onInput={handleInputResize}
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-1 bg-green-500 text-white rounded-full flex items-center justify-center"
              style={{ width: "3.5vw", height: "3.5vw" }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
