const MongoLib = require('../libs/mongo');

class BlogService {
    constructor(){
        this.collection = 'blog';
        this.mongoDB = new MongoLib();
    }

    async getPosts( { tags } ){
        const query = tags && { tags:   { $in: tags } };
        const post = this.mongoDB.getAll(this.collection, query);
        return post|| [];
    }

    async createPost({ post }){
        const createdPostId = this.mongoDB.create(this.collection, post);
        return createdPostId;
    }
}

module.exports = BlogService;