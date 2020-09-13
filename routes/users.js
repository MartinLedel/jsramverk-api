var express = require('express');
var router = express.Router();

const users = require("../models/users.js");

router.get('/', function(req, res) {
    const data = {
        data: {
            text: `Heter Martin och går tredje året på BTH inom Webbprogrammering.
            Ska bli ett intressant år med massa bra kurser.
            På fritiden spelar jag spel, gymmar och träffar kompisar.`
        }
    };

    res.json(data);
});

router.post('/login', (req, res) => users.login(res, req.body));
router.post('/register', (req, res) => users.register(res, req.body));

module.exports = router;
