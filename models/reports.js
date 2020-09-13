const db = require("../db/database.js");

const reports = {
    getReport: async function(res, kmomP2) {
        let sql = "SELECT * FROM reports WHERE kmom = ?";

        let kmomP1 = "kmom0" + kmomP2;

        db.get(
            sql,
            kmomP1,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            detail: "No reports found",
                        }
                    });
                }

                return res.status(200).json({
                    data: rows
                });
            });
    },
    createReport: function(res, body) {
        const kmom = body.kmom;
        const text = body.kmomText;

        let sql = "INSERT INTO reports (kmom, texts) VALUES (?, ?)";

        db.run(
            sql,
            kmom,
            text, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "Report successfully created."
                    }
                });
            });
    },
};

module.exports = reports;
