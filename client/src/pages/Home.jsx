import React, { useState } from 'react';
import BlacklistForm from './BlacklistForm';
import LogsPage from './LogsPage';
import BlacklistedIPsPage from './BlacklistedIPsPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Home() {
  const [activeTab, setActiveTab] = useState('ips');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'blacklist':
        return <BlacklistForm />;
      case 'logs':
        return <LogsPage />;
      case 'ips':
        return <BlacklistedIPsPage />;
      default:
        return <div className="text-center p-5">Select a tab</div>;
    }
  };

  return (
    <>
    
      <div className='relative pt-4 bg-gray-900'>
      <button onClick={handleLogout} className=" absolute right-4 mb-5 py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white transition duration-300 ease-out">
        Logout
      </button>
      </div>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mt-5 mb-3">Welcome to the IP Blacklist Manager</h1>
      <p className="text-lg mb-5">Secure and manage your network effectively.</p>
      <div className="space-x-2">
        <TabButton title="Blacklisted IPs" isActive={activeTab === 'ips'} onClick={() => setActiveTab('ips')} />
        <TabButton title="Manage Blacklist" isActive={activeTab === 'blacklist'} onClick={() => setActiveTab('blacklist')} />
        <TabButton title="View Logs" isActive={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
      </div>
      <div className="mt-5 w-full flex flex-col items-center">
        {renderContent()}
      </div>
    </div>
    </>
  );
}

const TabButton = ({ title, isActive, onClick }) => (
  <button
    className={`px-4 py-2 rounded text-sm font-medium transition ease-in-out duration-200 ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    onClick={onClick}
  >
    {title}
  </button>
  
);

export default Home;
