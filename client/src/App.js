import React from 'react';
import './App.css';
import Home from './pages/Home';
import BlacklistForm from './pages/BlacklistForm';
import LogsPage from './pages/LogsPage';
import BlacklistedIPsPage from './pages/BlacklistedIPsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blacklist" element={<BlacklistForm />} />
        <Route path="/logs" element={<LogsPage />} />        
        <Route path="/ips" element={<BlacklistedIPsPage />} />        
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
