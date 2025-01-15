const fs = require('fs');
const logFilePath = './logs.json'; // Ensure this path is correct and the file exists or is creatable

function fetchLogs() {
    return new Promise((resolve, reject) => {
        fs.readFile(logFilePath, (err, data) => {
            if (err) {
                reject('Error reading log file: ' + err);
            } else {
                resolve(JSON.parse(data.toString() || '[]'));
            }
        });
    });
}

function logAction(action) {
    return new Promise((resolve, reject) => {
        fetchLogs().then(logs => {
            logs.push(`${new Date().toLocaleString()} - ${action}`);
            fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), err => {
                if (err) {
                    reject('Error writing to log file: ' + err);
                } else {
                    resolve('Log added successfully');
                }
            });
        }).catch(reject);
    });
}

module.exports = {
    fetchLogs,
    logAction
};
