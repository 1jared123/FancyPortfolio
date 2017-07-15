//Dependencies
var express = require("express");
var router = express.Router();
// var algorithm = require("../lib/algorithmOnly.js");
var path = require("path");

var db = require("../models");

//Router to render the index page
router.get("/", function(req, res) {
    res.render("index");
});

//will also render index page D:
router.get("/about", function(req, res) {
    res.render("index");
});

// render projecs
router.get("/projects", function(req, res) {
    res.render("projects");
});

// render a project, the only real product...
router.get("/scraped", function(req, res) {
    res.render("project2");
});

// render the error projects cuz i haven't added them yet. 
router.get("/error", function(req, res) {
    res.render("error");
});

// render contacts if there is any. 
router.get("/contact", function(req, res) {
    db.Contacts.findAll({}).then(function(contact) {
        console.log(contact);
        res.render("contacts", {
            contacts: contact
        });
    });
});

//post call to save a new contact to our database. 
router.post("/contact", function(req, res) {

    console.log(req.body);

    // db.Contact.save({}).then(function(contacts) {
    //     //send the results of the doctor match as a response object
    //     // console.log(res.json(contacts));
    //     console.log(contacts + "Saved!");

    // });
});

module.exports = router;