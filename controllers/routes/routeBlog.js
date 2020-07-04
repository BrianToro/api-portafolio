const express = require("express");
const BlogService = require("../../services/blog");
const { check, validationResult } = require("express-validator");

function blogAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/blog", router);
    const blogService = new BlogService();

    //Control de rutas 

    //Traer todas las entradas del blog
    router.get("/", async (req, res, next) => {
        const { tag } = req.query;
        try {
            const posts = await blogService.getPosts({ tag });
            res.status(200).json({
                data: posts,
                message: "Posts listed",
            });
        } catch (err) {
            next(err);
        }
    });

    //Trae una entrada del blog
    router.get("/:postId", async (req, res, next) => {
        const { postId } = req.params;
        try {
            const post = await blogService.getPost({ postId });
            res.status(200).json({
                data: post,
                message: "Post retrieved",
            });
        } catch (err) {
            next(err);
        }
    });

    //Entra una entrada al blog
    router.post(
        "/",
        [
            check("post_title")
                .isString()
                .isLength({ min: 10, max: 50 })
                .notEmpty(),
            check("post_description")
                .isString()
                .isLength({ min: 10, max: 500 })
                .notEmpty(),
            check("post_img").isURL().notEmpty(),
            check("tags").isArray().notEmpty(),
            check("publicated_at").isString().notEmpty(),
        ],
        async (req, res, next) => {
            const { body: post } = req;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                console.log(req.body.project_title);
                const createdPostId = await blogService.createPost({
                    post,
                });
                res.status(201).json({
                    data: createdPostId,
                    message: "Post created",
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Elimina una nueva entrada del blog
    router.delete("/:postId", async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const deletePostId = await blogService.deletePost({
                postId,
            });
            res.status(201).json({
                data: deletePostId,
                message: "Project removed",
            });
        } catch (err) {
            next(err);
        }
    });

    //Actualizar entrada del blog
    router.put(
        "/:postId",
        [
            check("post_title")
                .isString()
                .isLength({ min: 10, max: 50 }),
            check("post_description")
                .isString()
                .isLength({ min: 10, max: 500 }),
            check("post_img").isURL(),
            check("tags").isArray(),
            check("publicated_at").isString(),
        ],
        async (req, res, next) => {
            const { postId } = req.params;
            const { body: post } = req;
            try {
                const updatePostId = await blogService.updatePost({
                    postId,
                    post,
                });
                res.status(201).json({
                    data: updatePostId,
                    message: "Post updated",
                });
            } catch (err) {
                next(err);
            }
        }
    );
}

module.exports = { blogAPI }