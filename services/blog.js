const MongoLib = require('../libs/mongo');

class BlogService {
    constructor() {
        this.collection = 'blog';
        this.mongoDB = new MongoLib();
    }

    async getPosts({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const post = this.mongoDB.getAll(this.collection, query);
        return post || [];
    }

    async getPost({ postId }) {
        const post = this.mongoDB.get(this.collection, postId);
        return post || {};
    }

    async createPost({ post }) {
        const createdPostId = this.mongoDB.create(this.collection, post);
        return createdPostId;
    }

    async deletePost({ postId }) {
        const deletePostId = this.mongoDB.delete(this.collection, postId);
        return deletePostId;
    }

    async updatePost({ postId, post }) {
        const updatePostId = this.mongoDB.update(this.collection, postId, post);
        return updatePostId;
    }
}

module.exports = BlogService;