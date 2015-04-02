var express = require('express');
var router = express.Router();

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send('respond with all experiment IDs');
});

router.get('/:id', function (req, res) {
    res.send('respond with an experiment');
});

module.exports = router;