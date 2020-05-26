const MongoLib = require('../libs/mongo');

class ProjectsService {
    constructor(){
        this.collection = 'proyectos';
        this.mongoDB = new MongoLib();
    }

    async createProject({ project }){
        const createdProjectId = this.mongoDB.create(this.collection, project);
        return createdProjectId;
    }
}

module.exports = ProjectsService;