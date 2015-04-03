var express = require('express');
var router = express.Router();

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send('respond with all experiment IDs');
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(id);
});

module.exports = router;