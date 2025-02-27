const fs = require('fs');
const axios = require('axios');

// Path to the file containing detected DDoS IPs
const DDOS_IPS_FILE = './ddos_ips.json';

// Function to read the DDoS IPs from the JSON file
function readDdosIps() {
    return new Promise((resolve, reject) => {
        fs.readFile(DDOS_IPS_FILE, 'utf8', (err, data) => {
            if (err) {
                return reject(`Error reading file: ${err.message}`);
            }
            try {
                const ips = JSON.parse(data);
                resolve(ips);
            } catch (parseError) {
                reject(`Error parsing JSON: ${parseError.message}`);
            }
        });
    });
}

// Fun￼ction to blacklist each IP
async function blacklistIps(ips) {
    const baseUrl = 'http://localhost:3001'; 
    for (const ip of ips) {
        try {
            const response = await axios.post(`${baseUrl}/blacklist`, { ip });
            console.log(`Successfully blacklisted IP: ${ip}`);
        } catch (error) {
            console.error(`Failed to blacklist IP ${ip}:`, error.message);
        }
    }
}

// Main function to read IPs and blacklist them
async function main() {
    try {
        const ddosIps = await readDdosIps();
        if (ddosIps.length === 0) {
            console.log('No IPs to blacklist.');
        } else {
            console.log(`Blacklisting ${ddosIps.length} IP(s)...`);
            await blacklistIps(ddosIps);
            console.log('Done.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
