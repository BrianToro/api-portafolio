const express = require("express");
const ProjectsService = require("../services/projects");

function projectsAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/projects", router);
    const projectsService = new ProjectsService();

    //Control de rutas
    router.get("/", (req, res, next) => {
        try {
            res.json({ data: "Funcionando" });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async (req, res, next) => {
        const { body: project } = req;
        try {
            const createdProjectId = await projectsService.createProject({
                project,
            });
            res.status(201).json({
                data: createdProjectId,
                message: "Project created",
            });
        } catch (err) {
            next(err);
        }
    });
}

module.exports = {
    projectsAPI,
};
