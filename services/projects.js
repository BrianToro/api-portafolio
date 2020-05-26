const MongoLib = require('../libs/mongo');

class ProjectsService {
    constructor(){
        this.collection = 'proyectos';
        this.mongoDB = new MongoLib();
    }
    async getProjects( { tags } ){
        const query = tags && { tags:   { $in: tags } };
        const projects = this.mongoDB.getAll(this.collection, query);
        return projects || [];
    }

    async createProject({ project }){
        const createdProjectId = this.mongoDB.create(this.collection, project);
        return createdProjectId;
    }
}

module.exports = ProjectsService;