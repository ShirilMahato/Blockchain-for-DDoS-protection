
require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connection established');
});

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

// Token generation function
function generateToken(user) {
    return jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
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

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).send('Username, password, and email are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
        db.query(sql, [username, hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Signup failed:', err);
                return res.status(500).send('Signup failed');
            }
            res.send('User registered successfully');
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Server error');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Login failed:', err);
            return res.status(500).send('Login failed');
        }
        if (results.length === 0) {
            return res.status(401).send('Incorrect username or password');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = generateToken(user);
            const updateLastLogin = 'UPDATE users SET last_login = NOW() WHERE user_id = ?';
            db.query(updateLastLogin, [user.user_id], (error, updateResults) => {
                if (error) {
                    console.error('Failed to update last login:', error);
                    return res.status(500).send('Failed to update user data');
                }
                res.json({ token, username: user.username });
            });
        } else {
            res.status(401).send('Incorrect username or password');
        }
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
