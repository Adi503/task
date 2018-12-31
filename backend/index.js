var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//@paths
const db = require("./config/config").mongoURL1;
const userAPI = require("./controllers/api/user.api");

//@access controls----------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});

//@middleware --- body-parser
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(bodyParser.json({ limit: "20mb", extended: true }));

//@connect database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(err => console.log(err));

//@actual routes
app.use("/user", userAPI);

app.listen(port, () => console.log(`Server is running at PORT: ${port} ...`));
