import React, { useState } from 'react';
import chatbotIcon from "../assets/Artboard 8.png";

const UploadComponent = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false); // State quản lý modal lỗi

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNextStep = () => {
    if (!selectedFile) {
      setErrorModalVisible(true); // Hiển thị modal lỗi nếu chưa chọn file
    } else {
      onUploadSuccess(); // Chuyển sang bước tiếp theo
    }
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <img src={chatbotIcon} alt="Chatbot" className="w-32 h-32 mb-6" />
      <h2 className="text-2xl font-bold mb-6">Upload PDF</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        className="border rounded px-3 py-2 mb-4"
      />
      <button
        onClick={handleNextStep}
        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Bắt đầu trích xuất
      </button>

      {/* Modal thông báo lỗi */}
      {errorModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 max-w-sm">
            <h3 className="text-lg font-bold mb-2">Lỗi</h3>
            <p>Bạn chưa tải lên file PDF.</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
