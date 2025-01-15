// const express = require('express');
// const Web3 = require('web3');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = 3001; // Use a different port from your frontend application    npm install web3@2.0.0-beta.1

// const web3 = new Web3('http://127.0.0.1:7545'); // Adjust to match your Ganache settings
// const contractAddress = '0xa7925dB1ddb5132eff341958A76b315537c13CCc'; // Use your deployed contract address    IPBlacklist.new().then(inst => {console.log("Deployed at:", inst.address);instance = inst;});

// // Import your compiled contract ABI
// const contractABI = require('../build/contracts/IPBlacklist.json').abi;

// // Create a contract instance
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // Define API routes
// app.post('/blacklist', async (req, res) => {
//   const { ip } = req.body;
//   try {
//     const accounts = await web3.eth.getAccounts();
//     await contract.methods.addToBlacklist(ip).send({ from: accounts[0] });
//     res.send(`IP ${ip} has been added to the blacklist.`);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

// // Remove an IP address from the blacklist
// app.post('/removeFromBlacklist', async (req, res) => {
//     const { ip } = req.body;
//     try {
//         const accounts = await web3.eth.getAccounts();
//         await contract.methods.removeFromBlacklist(ip).send({ from: accounts[0] });
//         res.send(`IP ${ip} has been removed from the blacklist.`);
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });

// // Check if an IP address is blacklisted
// app.get('/isBlacklisted/:ip', async (req, res) => {
//     const { ip } = req.params;
//     try {
//         const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
//         res.send({ ip, isBlacklisted });
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// const express = require('express');
// const Web3 = require('web3');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = 3001; // Use a different port from your frontend application

// const web3 = new Web3('http://127.0.0.1:8545');// Adjust to match your Ganache settings
// const contractAddress = '0xa4F5E8f9D95e29c6b1d0511BAa132aFa292f5a45'; // Use your deployed contract address  command==  IPBlacklist.new().then(inst => {console.log("Deployed at:", inst.address);instance = inst;});

// // Import your compiled contract ABI
// const contractABI = require('../build/contracts/IPBlacklist.json').abi;

// // Create a contract instance
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // POST endpoint for adding an IP to the blacklist
// app.post('/blacklist', async (req, res) => {
//   const { ip } = req.body;
//   try {
//       const accounts = await web3.eth.getAccounts();
//       await contract.methods.addToBlacklist(ip).send({ from: accounts[0] })
//           .then(response => res.send(`IP ${ip} has been added to the blacklist.`))
//           .catch(err => {
//               console.error(err);
//               res.status(400).send(`Failed to add IP ${ip} to the blacklist: ${err.message}`);
//           });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send(error.toString());
//   }
// });


// // POST endpoint for removing an IP from the blacklist
// app.post('/removeFromBlacklist', async (req, res) => {
//     const { ip } = req.body;
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const isAlreadyBlacklisted = await contract.methods.isBlacklisted(ip).call();
//         if (isAlreadyBlacklisted) {
//           await contract.methods.removeFromBlacklist(ip).send({ from: accounts[0] });
//           res.send(`IP ${ip} has been removed from the blacklist.`);
//         } else {
//           res.status(400).send(`IP ${ip} is not blacklisted.`);
//         }
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });

// // GET endpoint to check if an IP is blacklisted
// app.get('/isBlacklisted/:ip', async (req, res) => {
//     const { ip } = req.params;
//     try {
//         const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
//         res.send({ ip, isBlacklisted });
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });

// app.get('/getAllBlacklisted', async (req, res) => {
//     try {
//         let blacklistedIPs = await contract.methods.getAllBlacklisted().call();
//         blacklistedIPs = blacklistedIPs.filter(ip => ip.trim() !== '');
//         res.send(blacklistedIPs);
//     } catch (error) {
//         console.error('Error in getting all blacklisted IPs:', error);
//         res.status(500).send('Failed to fetch blacklisted IPs');
//     }
// });



// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



// const express = require('express');
// const cors = require('cors');

// const blockchainRoutes = require('./routes/blockchainRoutes');
// const logRoutes = require('./routes/logRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/blockchain', blockchainRoutes);
// app.use('/api/logs', logRoutes);

// const port = 3001;
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

// require('dotenv').config();
// const express = require('express');
// const Web3 = require('web3');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 3001; // Use a single port for both the frontend API and log server
// const web3 = new Web3(process.env.GANACHE_RPC_URL);
// const contractAddress = process.env.CONTRACT_ADDRESS; // Adjust this as per your actual deployed contract address
// const contractABI = require('../build/contracts/IPBlacklist.json').abi; // Ensure the path is correct based on your directory structure

// const contract = new web3.eth.Contract(contractABI, contractAddress);

// web3.eth.getAccounts()
//     .then(accounts => console.log("Accounts:", accounts))
//     .catch(err => console.error("Error fetching accounts:", err));

// // Blockchain interaction endpoints
// app.post('/blacklist', async (req, res) => {
//     const { ip } = req.body;
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const result = await contract.methods.addToBlacklist(ip).send({ from: accounts[0] });
//         logAction(`Added ${ip} to blacklist.`);
//         res.send(`IP ${ip} has been added to the blacklist.`);
//     } catch (error) {
//         logAction(`Failed to add ${ip} to blacklist: ${error.message}`);
//         res.status(500).send(`Failed to add IP ${ip} to the blacklist: ${error.message}`);
//     }
// });

// app.post('/removeFromBlacklist', async (req, res) => {
//     const { ip } = req.body;
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
//         if (isBlacklisted) {
//             await contract.methods.removeFromBlacklist(ip).send({ from: accounts[0] });
//             logAction(`Removed ${ip} from blacklist.`);
//             res.send(`IP ${ip} has been removed from the blacklist.`);
//         } else {
//             res.status(400).send(`IP ${ip} is not blacklisted.`);
//         }
//     } catch (error) {
//         logAction(`Failed to remove ${ip} from blacklist: ${error.message}`);
//         res.status(500).send(`Failed to remove IP ${ip} from the blacklist: ${error.message}`);
//     }
// });

// app.get('/isBlacklisted/:ip', async (req, res) => {
//     const { ip } = req.params;
//     try {
//         const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
//         res.send({ ip, isBlacklisted });
//     } catch (error) {
//         res.status(500).send(`Error checking if IP ${ip} is blacklisted: ${error.message}`);
//     }
// });

// // Log management endpoints
// app.get('/logs', (req, res) => {
//     fs.readFile('./logs.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading logs:', err);
//             res.status(500).send('Failed to fetch logs');
//             return;
//         }
//         res.json(JSON.parse(data || '[]'));
//     });
// });

// function logAction(action) {
//     const filepath = './logs.json';
//     fs.readFile(filepath, 'utf8', (err, data) => {
//         const logs = err || !data ? [] : JSON.parse(data);
//         logs.push(`${new Date().toISOString()} - ${action}`);
//         fs.writeFile(filepath, JSON.stringify(logs, null, 2), (err) => {
//             if (err) {
//                 console.error('Error writing to logs:', err);
//             }
//         });
//     });
// }

// // Add this endpoint to your Express server
// app.get('/getAllBlacklisted', async (req, res) => {
//     try {
//         const blacklistedIPs = await contract.methods.getAllBlacklisted().call();
//         res.json(blacklistedIPs);
//     } catch (error) {
//         console.error("Error fetching blacklisted IPs:", error);
//         res.status(500).send(`Failed to fetch blacklisted IPs: ${error.message}`);
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const web3 = new Web3(process.env.GANACHE_RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('../build/contracts/IPBlacklist.json').abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const BLACKLISTED_IPS_FILE = './blacklistedIPs.json';

// Utility functions for handling file operations
function readBlacklistedIPs() {
    return new Promise((resolve, reject) => {
        fs.readFile(BLACKLISTED_IPS_FILE, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data || '[]'));
            }
        });
    });
}

function writeBlacklistedIPs(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(BLACKLISTED_IPS_FILE, JSON.stringify(data, null, 2), err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Fetch accounts and log them
web3.eth.getAccounts()
    .then(accounts => console.log("Accounts:", accounts))
    .catch(err => console.error("Error fetching accounts:", err));

// Blockchain interaction endpoints
app.post('/blacklist', async (req, res) => {
    const { ip } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addToBlacklist(ip).send({ from: accounts[0] });
        logAction(`Added ${ip} to blacklist.`);
        const blacklistedIPs = await contract.methods.getAllBlacklisted().call();
        await writeBlacklistedIPs(blacklistedIPs);
        res.send(`IP ${ip} has been added to the blacklist.`);
    } catch (error) {
        logAction(`Failed to add ${ip} to blacklist: ${error.message}`);
        res.status(500).send(`Failed to add IP ${ip} to the blacklist: ${error.message}`);
    }
});

app.post('/removeFromBlacklist', async (req, res) => {
    const { ip } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
        if (isBlacklisted) {
            await contract.methods.removeFromBlacklist(ip).send({ from: accounts[0] });
            logAction(`Removed ${ip} from blacklist.`);
            const blacklistedIPs = await contract.methods.getAllBlacklisted().call();
            await writeBlacklistedIPs(blacklistedIPs);
            res.send(`IP ${ip} has been removed from the blacklist.`);
        } else {
            res.status(400).send(`IP ${ip} is not blacklisted.`);
        }
    } catch (error) {
        logAction(`Failed to remove ${ip} from blacklist: ${error.message}`);
        res.status(500).send(`Failed to remove IP ${ip} from the blacklist: ${error.message}`);
    }
});

app.get('/isBlacklisted/:ip', async (req, res) => {
    const { ip } = req.params;
    try {
        const isBlacklisted = await contract.methods.isBlacklisted(ip).call();
        res.send({ ip, isBlacklisted });
    } catch (error) {
        res.status(500).send(`Error checking if IP ${ip} is blacklisted: ${error.message}`);
    }
});

// Add this endpoint to your Express server
app.get('/getAllBlacklisted', async (req, res) => {
    try {
        const blacklistedIPs = await contract.methods.getAllBlacklisted().call();
        res.json(blacklistedIPs);
    } catch (error) {
        console.error("Error fetching blacklisted IPs:", error);
        res.status(500).send(`Failed to fetch blacklisted IPs: ${error.message}`);
    }
});

// Endpoint to get blacklisted IPs from file
app.get('/getBlacklistedIPsFromFile', async (req, res) => {
    try {
        const blacklistedIPs = await readBlacklistedIPs();
        res.json(blacklistedIPs);
    } catch (error) {
        console.error("Error reading blacklisted IPs from file:", error);
        res.status(500).send(`Failed to fetch blacklisted IPs from file: ${error.message}`);
    }
});

// Log management endpoints
app.get('/logs', (req, res) => {
    fs.readFile('./logs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading logs:', err);
            res.status(500).send('Failed to fetch logs');
            return;
        }
        res.json(JSON.parse(data || '[]'));
    });
});

function logAction(action) {
    const filepath = './logs.json';
    fs.readFile(filepath, 'utf8', (err, data) => {
        const logs = err || !data ? [] : JSON.parse(data);
        logs.push(`${new Date().toISOString()} - ${action}`);
        fs.writeFile(filepath, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Error writing to logs:', err);
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
