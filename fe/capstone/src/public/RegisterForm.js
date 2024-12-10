import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [userId, setUserId] = useState("");

  const handleRegister = () => {
    if (userId.trim()) {
      onRegister(userId); // Gửi userId lên parent component
    } else {
      alert("Vui lòng nhập tên hoặc ID của bạn!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Đăng ký để sử dụng Chatbot</h2>
        <input
          type="text"
          placeholder="Nhập tên hoặc ID của bạn"
          className="p-2 border rounded-lg w-full mb-4"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleRegister}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
