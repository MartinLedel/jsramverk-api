const express = require('express');
const router = express.Router();

const reports = require("../models/reports.js");
const auth = require("../models/auth.js");

router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reports.createReport(res, req.body));
router.get("/week/:kmom", (req, res) => reports.getReport(res, req.params.kmom));

module.exports = router;
