const express = require("express");
const { config } = require("./config/index.js");
const cors = require("cors");
const { projectsAPI } = require("./controllers/routeController");

//Inicio del servidor
const app = express();

//Middleware CORS
app.use(cors());

//Parser a json
app.use(express.json());

//Routes controller
projectsAPI(app);

app.listen(config.port, () => {
    console.log(`Server listen on port: ${config.port}`);
});
