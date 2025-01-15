// migrations/2_deploy_IPBlacklist.js

const IPBlacklist = artifacts.require("IPBlacklist");
const fs = require('fs');
const path = require('path');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(IPBlacklist);
    const ipBlacklistInstance = await IPBlacklist.deployed();

    // Assuming the 'server' folder is in the root and at the same level as the 'migrations' folder
    const envPath = path.resolve(__dirname, '..', 'server', '.env');
    const envConfig = {};

    if (fs.existsSync(envPath)) {
        const envContents = fs.readFileSync(envPath, 'utf8');
        envContents.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key) envConfig[key.trim()] = value.trim();
        });
    }

    envConfig['CONTRACT_ADDRESS'] = ipBlacklistInstance.address;
    envConfig['OWNER_ADDRESS'] = accounts[0];

    const updatedEnvContents = Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n');
    fs.writeFileSync(envPath, updatedEnvContents, 'utf8');

    console.log(`IPBlacklist deployed at: ${ipBlacklistInstance.address}`);
    console.log(`.env updated: CONTRACT_ADDRESS=${ipBlacklistInstance.address}`);
};
