const blockchainService = require('../services/blockchainService');

exports.addToBlacklist = async (req, res) => {
    const { ip } = req.body;
    try {
        const result = await blockchainService.addToBlacklist(ip);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.removeFromBlacklist = async (req, res) => {
    const { ip } = req.body;
    try {
        const result = await blockchainService.removeFromBlacklist(ip);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};

exports.checkBlacklisted = async (req, res) => {
    const { ip } = req.params;
    try {
        const result = await blockchainService.checkBlacklisted(ip);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
