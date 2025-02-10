import React, { useState, useEffect } from 'react';

function LogsPage() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch logs from an API instead of localStorage
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await fetch('http://localhost:3001/logs');
            const data = await response.json();
            setLogs(data);
        } catch (error) {
            console.log('Failed to fetch logs:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-800 text-white rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Action Logs</h1>
            <div className="bg-gray-900 shadow-md rounded-lg p-4">
                {logs.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                        {logs.map((log, index) => (
                            <li key={index} className="text-gray-400">{log}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No logs to display.</p>
                )}
            </div>
        </div>
    );
}

export default LogsPage;
