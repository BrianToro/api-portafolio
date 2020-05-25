const express = require("express");

function projectsAPI(app) {
    const router = express.Router();
    app.use("/api/projects", router);
    router.get("/", (req, res, next) => {
        try {
            res.json({ data: "Funcionando" });
        } catch (err) {
            next(err);
        }
    });
}

module.exports = {
    projectsAPI
}
