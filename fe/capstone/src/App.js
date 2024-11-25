import { MdChat } from "react-icons/md"; // Thêm biểu tượng chat

import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa'; // Import icon (bạn có thể thay thế bằng bất kỳ icon nào bạn thích)
import Chatbot from "../src/public/chatbot"; // Import component Chatbot


const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="App">
      {/* Icon button để mở/đóng Chatbot */}
      <div
        className="chatbot-icon"
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25d366',
          borderRadius: '50%',
          padding: '15px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000, // Đảm bảo icon luôn hiển thị trên cùng
        }}
      >
        <FaComment size={30} color="white" />
      </div>

      {/* Hiển thị Chatbot nếu isChatbotOpen là true */}
      {isChatbotOpen && <Chatbot />}
    </div>
  );
};

export default App;
