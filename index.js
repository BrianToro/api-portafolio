const express = require("express");
const { config } = require("./config/index.js");
const cors = require("cors");
const { projectsAPI } = require("./controllers/routes/routeProjects");
const { blogAPI } = require('./controllers/routes/routeBlog');
const { logErrors, wrapErrors ,errorHandler } = require('./controllers/middlewares/errorHandler');
const { notFoundHandler } = require('./controllers/middlewares/notFoundHandler')

//Inicio del servidor
const app = express();

//Middleware CORS
app.use(cors());

//Parser a json
app.use(express.json());

//Routes controller
projectsAPI(app);
blogAPI(app);

//Catch errors
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

//Catch not found
app.use(notFoundHandler)

app.listen(config.port, () => {
    console.log(`Server listen on port: ${config.port}`);
});
