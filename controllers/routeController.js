const express = require("express");
const ProjectsService = require("../services/projects");

function projectsAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/projects", router);
    const projectsService = new ProjectsService();

    //Control de rutas
    router.get("/", async (req, res, next) => {
        const { tag } = req.query;
        try {
            const projects = await projectsService.getProjects({ tag });
            res.status(200).json({
                data: projects,
                message: 'Projects listed',
            });
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
