import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlacklistedIPsPage() {
    const [blacklistedIPs, setBlacklistedIPs] = useState([]);

    useEffect(() => {
        fetchBlacklistedIPs();
    }, []);

    const fetchBlacklistedIPs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getAllBlacklisted');
            setBlacklistedIPs(response.data);
        } catch (error) {
            console.error('Failed to fetch blacklisted IPs:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center">Blacklisted IP Addresses</h1>
            <div className="mt-5">
                {blacklistedIPs.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IP Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {blacklistedIPs.map((ip, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ip}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Blacklisted</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No blacklisted IPs found.</p>
                )}
            </div>
        </div>
    );
}

export default BlacklistedIPsPage;
