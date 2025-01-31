const fs = require('fs');
const path = require('path');
const AutograderCode = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8');
const getDatabase = require('./storage');
const express = require('express');
const router = express();

router.get(
    '/:author/:name.js',
    async (req, res) => {
        const {author, name} = req.params;
        const storage = getDatabase();
        const autograder = await storage.findOne({author, name});
        if (!autograder) {
            return res.sendStatus(404);
        }

        const code = AutograderCode.replace(
            'AUTOGRADER_CONFIG',
            JSON.stringify(autograder.config)
        );
        return res.send(code);
    }
);

module.exports = router;
