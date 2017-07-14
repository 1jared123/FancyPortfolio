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

router.get("/about", function(req, res) {
    res.render("index");
});

router.get("/projects", function(req, res) {
    res.render("projects");
});

router.get("/projects/scraped", function(req, res) {
    res.render("project2");
});

router.get("/projects/error", function(req, res) {
    res.render("project2");
});

router.get("/contact", function(req, res) {
    // db.Contacts.findAll({}).then(function(contact) {
    //     console.log(contact);
    //     res.render("contacts", {
    //         contacts: contact
    //     });
    // });
    res.render("404");
});

//Router to update the current doctor and diagnosis for the logged in patient
router.post("/", function(req, res) {

    console.log(req.body);

    db.Contact.save({}).then(function(contacts) {
        //send the results of the doctor match as a response object
        // console.log(res.json(contacts));
        console.log(contacts);

    });
});

//Router to update to add an admin based on the current Patients table
// router.put("/", function(req, res) {
//     // console.log(req.body);
//     // console.log(req.body.id);
//     db.Patients.update({
//         isAdmin: req.body.isAdmin
//         }, {
//         where: {
//             patient_id: req.params.id
//         }
//     }).then(function() {
//         res.redirect("/admin");
//     });
// });

//Router to render all of the available doctors on the docs page
// router.get("/docs", function(req, res) {
//     db.Doctors.findAll({}).then(function(results) {
//         res.render("docs", { doctors: results });
//     });
// });

// router.get("/about", function(req, res) {
//     res.render("about");
// });


 
module.exports = router;