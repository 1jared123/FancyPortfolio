//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3308;

//Serve static content from public directory
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));

//Setting up Handlebars
var exphbs = require("express-handlebars");

//Adding Partial Directory
var hbs = exphbs.create({
    defaultLayout: "main",
    partialsDir: ["views/partials/"]
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Importing routes
var opinions = require("./controllers/opinions_controller.js");

app.use("/", opinions);

//Default Page for all unknown url
app.get("*", function(req, res) {
	res.redirect("/404");
});
// //404 pages
// app.use(function (req, res) {
//   // res.status(404).send("Sorry can't find that!");
//   //sets status for 404 error
//   res.status(404);
//   //for now, just rendering the index page
//   res.render('index');
// });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Server Operational - Listening to Port " + PORT);
    });
});