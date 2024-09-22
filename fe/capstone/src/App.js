import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadComponent from '../src/public/UploadComponent';
import LoadingComponent from '../src/public/LoadingComponent';
import ChatbotComponent from "../src/public/chatbot";

function App() {
  const [step, setStep] = useState(1); 

  const handleUploadSuccess = () => {
    setStep(2); 
    setTimeout(() => {
      setStep(3);  
    }, 3000); 
  };

  const resetStep = () => {
    setStep(1);  // Chuyển về bước 1: Upload
  };

  return (
    <div>
      {step === 1 && <UploadComponent onUploadSuccess={handleUploadSuccess} resetStep={resetStep} />}
      {step === 2 && <LoadingComponent />}
      {step === 3 && <ChatbotComponent resetStep={resetStep} />}
    </div>
  );
}

export default App;
