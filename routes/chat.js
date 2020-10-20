var express = require('express');
var router = express.Router();

const chat = require("../models/chat.js");

router.get("/history", (req, res, next) => chat.getHistory(req, res, next));

module.exports = router;
