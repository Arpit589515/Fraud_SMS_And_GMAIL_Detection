import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginCard from "./LoginCard";
import NextPage from "./NextPage";
import SmsDetection from "./SMSDetection";
import GmailDetection from "./GmailDetection";
import Report from "./Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/sms" element={<SmsDetection />} />
        <Route path="/gmail" element={<GmailDetection />} />
        <Route path="/reports" element={<Report />} />  
      </Routes>
    </Router>
  );
}

export default App;
