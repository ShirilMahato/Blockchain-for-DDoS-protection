const logService = require('../services/logService');

exports.getLogs = async (req, res) => {
    try {
        const logs = await logService.fetchLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
