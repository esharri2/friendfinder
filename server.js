const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const viewRoutes = require("./app/routing/htmlRoutes.js");
const apiRoutes = require("./app/routing/apiRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'app/public')));

viewRoutes(express, app, path);
apiRoutes(app, path, __dirname);

app.listen(port, () => {
  console.log("App listening on PORT " + port);
});
