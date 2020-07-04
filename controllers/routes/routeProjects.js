const express = require("express");
const ProjectsService = require("../../services/projects");
const { check, validationResult } = require("express-validator");

function projectsAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/projects", router);
    const projectsService = new ProjectsService();

    //Control de rutas

    //Traer todos los proyectos
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

    //Trae un proyecto
    router.get("/:projectId", async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const project = await projectsService.getProject({ projectId });
            res.status(200).json({
                data: project,
                message: "Project retrieved",
            });
        } catch (err) {
            next(err);
        }
    });

    //Entra un nuevo proyecto
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

    //Elimina un proyecto
    router.delete("/:projectId", async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const deleteProjectId = await projectsService.deleteProject({
                projectId,
            });
            res.status(201).json({
                data: deleteProjectId,
                message: "Project removed",
            });
        } catch (err) {
            next(err);
        }
    });

    //Actualiza un proyecto
    router.put(
        "/:projectId",
        [
            check("project_title")
                .isString()
                .isLength({ min: 10, max: 50 }),
            check("project_description")
                .isString()
                .isLength({ min: 10, max: 500 }),
            check("project_img").isURL(),
            check("tags").isArray(),
            check("publicated_at").isString(),
        ],
        async (req, res, next) => {
            const { projectId } = req.params;
            const { body: project } = req;
            try {
                const updateProjectId = await projectsService.updateProject({
                    projectId,
                    project,
                });
                res.status(201).json({
                    data: updateProjectId,
                    message: "Project updated",
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
