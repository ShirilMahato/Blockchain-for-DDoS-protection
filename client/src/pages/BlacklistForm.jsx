import React, { useState } from 'react';
import axios from 'axios';

function BlacklistForm() {
    const [ip, setIp] = useState('');
    const [message, setMessage] = useState(null);

    const validateIP = (ip) => {
        return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    };

    const handleRequest = async (url, method = 'post', data = {}) => {
        if (!ip || !validateIP(ip)) {
            setMessage({ text: "Please enter a valid IP address.", type: 'error' });
            return;
        }

        try {
            const response = await axios({ method, url, data });
            const messageText = formatMessage(response.data);
            setMessage({ text: messageText, type: 'success' });
            logAction(`${ip} - ${messageText}`);  // Enhance log message with IP and action result
        } catch (error) {
            const errorMsg = error.response ? error.response.data : error.message;
            setMessage({ text: `Failed to process request: ${errorMsg}`, type: 'error' });
            logAction(`${ip} - Failed request: ${errorMsg}`);  // Log errors with more context
        }
    };

    const formatMessage = (data) => {
        if (typeof data === 'object' && data.ip !== undefined) {
            return `IP Status: ${data.ip} is ${data.isBlacklisted ? 'Blacklisted' : 'Not Blacklisted'}`;
        } else {
            return JSON.stringify(data);
        }
    };

    const logAction = async (message) => {
        await axios.post('http://localhost:3001/logs', { log: message })
        .catch(error => console.error('Logging failed:', error));  // Log to console if logging fails
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Blacklist IP Address</h1>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="Enter IP to blacklist"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-between gap-3">
                    <button onClick={() => handleRequest('http://localhost:3001/blacklist', 'post', { ip })}
                        className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add to Blacklist
                    </button>
                    <button onClick={() => handleRequest('http://localhost:3001/removeFromBlacklist', 'post', { ip })}
                        className="flex-1 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                        Remove from Blacklist
                    </button>
                    <button onClick={() => ip && handleRequest(`http://localhost:3001/isBlacklisted/${ip}`, 'get')}
                        className="flex-1 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Check IP Status
                    </button>
                </div>
                
                {message && (
                    <p className={`text-center mt-4 p-2 rounded-md ${message.type === 'error' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
                        {message.text}
                    </p>
                )}
            </form>
        </div>
    );
}

export default BlacklistForm;
