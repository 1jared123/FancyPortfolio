//Dependencies
var express = require("express");
var router = express.Router();
var Client = require("node-rest-client").Client;
// var algorithm = require("../lib/algorithmOnly.js");
var path = require("path");

var db = require("../models");

var client = new Client();

//Router to render the index page
router.get("/", function(req, res) {
    res.render("index");
});


//Router to get the admin page. Checks if you are an admin before rendering. If you aren't render the 404 page.
//If admin, have sequelize grabs all the doctor and patient data and renders the admin page with the following datasets
router.get("/admin", isLoggedIn, function(req, res) {
    //Updated Admin block, you can only use one res.render per block
    //Have to do the second query in a callback from the initial callback
    if (req.user.isAdmin) {
        db.Doctors.findAll({}).then(function(doctorData) {
            db.Patients.findAll({}).then(function(patientsData) {
                // console.log(patientsData);
                res.render("admin", {
                    isAdmin: patientsData,
                    doctors: doctorData,
                    patients: patientsData
                });
            });
        });
    } else {
        res.render("404");
    }
});

//Router to update the current doctor and diagnosis for the logged in patient
router.post("/dashboard/update-patient/", function(req, res) {
        // console.log(req.body);
        console.log(`Activating dashboard update patient
            Doctor: ${req.body.current_doctor}
            Diagnosis: ${req.body.diagnosis}`);
        console.log(req.body);
        db.Patients.update({
            current_doctor: req.body.current_doctor,
            diagnosis: req.body.diagnosis
        }, {
            where: {
                patient_id: req.user.patient_id
            }
        }).then(function(dbPatients) {
            //send the results of the doctor match as a response object

            res.json(dbPatients);

        });
});

//Router to update to add an admin based on the current Patients table
router.put("/admin/add-admin/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Patients.update({
        isAdmin: req.body.isAdmin
        }, {
        where: {
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to unremove a doctor
router.put("/admin/unremove-doc/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Doctors.update({
        removed: req.body.removed
        }, {
        where: {
            doc_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});
//Router to unremove a patient
router.put("/admin/unremove-patient/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Patients.update({
        removed: req.body.removed
        }, {
        where: {
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to "delete" a patient from the current Patient table
router.put("/admin/remove-patient/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Patients.update({
        removed: req.body.removed
        }, {
        where: {
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to "delete" a doctor from the current Doctors table
router.put("/admin/remove-doc/:id", function(req, res) {
    // console.log(req.body);
    // console.log(req.body.id);
    db.Doctors.update({
        removed: req.body.removed
        }, {
        where: {
            doc_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    });
});

//Router to remove an admin based on the current Patients table
router.put("/admin/remove-admin/:id", function(req,res) {
    db.Patients.update({
        isAdmin: req.body.isAdmin
    }, {
        where:{
            patient_id: req.params.id
        }
    }).then(function() {
        res.redirect("/admin");
    })
})

//Router to render all of the available doctors on the docs page
router.get("/docs", function(req, res) {
    db.Doctors.findAll({}).then(function(results) {
        res.render("docs", { doctors: results });
    });
});

router.get("/about", function(req, res) {
    res.render("about");
});


 
module.exports = router;