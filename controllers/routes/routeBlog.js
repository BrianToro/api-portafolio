const express = require("express");
const BlogService = require("../../services/blog");
const { check, validationResult } = require("express-validator");

function blogAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/blog", router);
    const blogService = new BlogService();

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
}

module.exports = { blogAPI }