const express = require("express");
const { config } = require("./config/index.js");
const cors = require("cors");
const { projectsAPI } = require("./controllers/routes/routeProjects");
const { blogAPI } = require('./controllers/routes/routeBlog');

//Inicio del servidor
const app = express();

//Middleware CORS
app.use(cors());

//Parser a json
app.use(express.json());

//Routes controller
projectsAPI(app);
blogAPI(app);

app.listen(config.port, () => {
    console.log(`Server listen on port: ${config.port}`);
});
