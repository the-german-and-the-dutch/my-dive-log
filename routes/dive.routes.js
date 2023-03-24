const express = require("express");
const Dive = require("../models/dive.model");

const isUserLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

//Get display dive

router.get("/dive",  (req, res, next) => {
  Dive.find()
    .populate("user")
    .then((diveArr) => {
      const data = {
        dive: diveArr,
      };

      res.render("dive/dive", data);
    })
    .catch((e) => {
      console.log("error getting dives from DB", e);
      next(e);
    });
});

// Create dive form
router.get("/dive/create", isUserLoggedIn, (req, res, next) => {
  res.send("hello");
  //res.render("dive/create");
});

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
  };

  Dive.create(diveDetails)
    .then((diveFromDB) => {
      res.redirect("/dive");
    })
    .catch((e) => {
      console.log("error creating new dive", e);
      next(e);
    });
});



// READ Dive details
router.get("/dive/:diveID", (req, res, next) =>{

  const { diveID } = req.params;

  Dive.findById(diveId)
  .populate("user")
  .then(diveDetails => {

    console.log(diveDetails)

    res.render("dive/dive-details", diveDetails);
  })
  .catch(e => {
    console.log("error getting dive details from DB", e);
    next(e);
  });
});

// Update Dive details
router.get("/dive/:diveId/edit", isUserLoggedIn, (req, res, next) =>{
  const { diveId } = req.params;

  let diveDetails;

  Dive.findById(diveId)
  .then(diveFromDB => {
    diveDetails = diveFromDB;
    return User.find();
  })
  .then( diveArr => {

    const data = {
      dive: diveDetails,
    }

    res.render("dive/dive-edit.hbs", data);
  })
  .catch(error => next(error));
});



// Uptade process form
router.post("/dive/:diveId/edit", isUserLoggedIn, (req, res, next) => {
  const { diveId } = req.params;
  const { username, location, date, diveNumber, timeIn, timeOut, bottomTime, depth, airStart, airEnd, visibility, comment } = req.body;

  Dive.findByIdAndUpdate(diveId, { username, location, date, diveNumber, timeIn, timeOut, bottomTime, depth, airStart, airEnd, visibility, comment }, { new: true })
  .then(updateDive => {
    res.redirect(`/dive/${updateDive.id}`); //redirects to dive details page
  })
  .catch(error => next(error));
});


// Delete
router.post("/dive/:diveId/delete", isUserLoggedIn, (req, res, next) => {
  const { diveId } = req.params;

  Dive.findByIdAndDelete(diveId)
  .then(() => res.redirect("/dive"))
  .catch(error => next(error));
});



module.exports = router;
