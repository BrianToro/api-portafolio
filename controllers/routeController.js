const express = require("express");
const ProjectsService = require("../services/projects");
const { check, validationResult } = require("express-validator");

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
                message: "Projects listed",
            });
        } catch (err) {
            next(err);
        }
    });

    router.get("/:projectId", async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const projects = await projectsService.getProject({ projectId });
            res.status(200).json({
                data: projects,
                message: "Project retrieved",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post(
        "/",
        [
            check("project_title")
                .isString()
                .isLength({ min: 10, max: 50 })
                .notEmpty(),
            check("project_description")
                .isString()
                .isLength({ min: 10, max: 500 })
                .notEmpty(),
            check("project_img").isURL().notEmpty(),
            check("tags").isArray().notEmpty(),
            check("publicated_at").isString().notEmpty(),
        ],
        async (req, res, next) => {
            const { body: project } = req;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                console.log(req.body.project_title);
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
        }
    );
}

module.exports = {
    projectsAPI,
};
