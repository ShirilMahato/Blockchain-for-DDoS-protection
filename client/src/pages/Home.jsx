import React from 'react';

function Home() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">Welcome to the IP Blacklist Manager</h1>
      <p className="text-gray-600 text-lg">Secure and manage your network effectively.</p>
      <div className="mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
