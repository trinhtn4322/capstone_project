import React from 'react';
import chatbotIcon from "../assets/Artboard 8.png"; // Hình ảnh của bạn

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Hình ảnh chính */}
        <img
          src={chatbotIcon}
          alt="Chatbot Loading"
          className="w-40 h-40 mb-4 animate-bounce"
        />

        {/* Biểu tượng đang xoay */}
        <div className="flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4 animate-spin border-t-blue-500"></div>
        </div>

        {/* Thông điệp trích xuất */}
        <p className="text-lg font-semibold text-gray-700">
          Đang trích xuất thông tin, vui lòng đợi...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
