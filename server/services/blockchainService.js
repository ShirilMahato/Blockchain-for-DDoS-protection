const web3 = require('../utils/web3Setup');
const contractABI = require('../../build/contracts/IPBlacklist.json').abi;
const contractAddress = '0xa4F5E8f9D95e29c6b1d0511BAa132aFa292f5a45'; // Update this with your contract's address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function addToBlacklist(ip) {
    const accounts = await web3.eth.getAccounts();
    return contract.methods.addToBlacklist(ip).send({ from: accounts[0] });
}

async function removeFromBlacklist(ip) {
    const accounts = await web3.eth.getAccounts();
    return contract.methods.removeFromBlacklist(ip).send({ from: accounts[0] });
}

async function checkBlacklisted(ip) {
    return contract.methods.isBlacklisted(ip).call();
}

module.exports = {
    addToBlacklist,
    removeFromBlacklist,
    checkBlacklisted
};
