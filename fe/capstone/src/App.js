import React, { useState } from "react";
import { FaComment } from "react-icons/fa"; // Icon cho chatbot
import Chatbot from "../src/public/chatbot";
import RegisterForm from "../src/public/RegisterForm";

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Trạng thái mở/đóng chatbot
  const [userId, setUserId] = useState(""); // Lưu ID người dùng
  const [isRegistered, setIsRegistered] = useState(false); // Kiểm tra đã đăng ký hay chưa

  const [position, setPosition] = useState({ x: 20, y: 20 }); // Vị trí của icon chatbot
  const [isDragging, setIsDragging] = useState(false); // Trạng thái kéo thả

  const handleRegister = (id) => {
    setUserId(id);
    setIsRegistered(true);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition((prevPosition) => {
      const newX = Math.max(0, Math.min(prevPosition.x + e.movementX, window.innerWidth - 50));
      const newY = Math.max(0, Math.min(prevPosition.y + e.movementY, window.innerHeight - 50));
      return { x: newX, y: newY };
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="App"
      onMouseMove={handleMouseMove} // Lắng nghe sự kiện di chuyển chuột
      onMouseUp={handleMouseUp} // Kết thúc kéo khi chuột nhả
      style={{ height: "100vh", position: "relative", overflow: "hidden" }} // Đảm bảo vùng kéo nằm trong màn hình
    >
      {!isRegistered ? (
        <RegisterForm onRegister={handleRegister} />
      ) : (
        <>
          <div
            className="chatbot-icon"
            onClick={toggleChatbot}
            onMouseDown={handleMouseDown} // Bắt đầu kéo khi nhấn chuột
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              backgroundColor: "#25d366",
              borderRadius: "50%",
              padding: "8px",
              cursor: isDragging ? "grabbing" : "grab",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaComment size={20} color="white" />
          </div>

          {isChatbotOpen && <Chatbot />}
        </>
      )}
    </div>
  );
};

export default App;
