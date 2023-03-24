const express = require('express');
const Dive = require('../models/dive.model');

const isUserLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();


//Get display dive

router.get("/dive", isUserLoggedIn, (req, res, next) => {
  Dive.find()
    .populate("user")
    .then((diveArr) => {
      const data = {
        dive: diveArr,
      };

      res.render("dive-logs", data);
    })
    .catch((e) => {
      console.log("error getting dives from DB", e);
      next(e);
    });
});


// Create dive form
router.get("/dive/create", isUserLoggedIn, (req, res, next) => {
    res.send("hello")
    res.render("dive/create")
})



// Post dive form
router.post("/dive", isUserLoggedIn, (req, res, next) => {

    const diveDetails = {
        username: req.body.username,
        location: req.body.location,
        date: req.body.date,
        diveNumber: req.body.diveNumber,
        timeIn: req.body.timeIn,
        timeOut: req.body.timeOut,
        bottomTime: req.body.bottomTime,
        depth: req.body.depth,
        airStart: req.body.airStart,
        airEnd: req.body.airEnd,
        visibility: req.body.visibility,
        comment: req.body.comment,
    }

    Dive.create(diveDetails)
    .then(diveFromDB => {
        res.redirect("/dive");
    })
    .catch(e => {
        console.log("error creating new dive", e);
        next(e);
      });
})