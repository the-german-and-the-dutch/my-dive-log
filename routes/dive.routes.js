const express = require("express");
const Dive = require("../models/dive.model");

const isUserLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

//Get display dive

router.get("/dive", /*isUserLoggedIn,*/ (req, res, next) => {
  Dive.find()
    .populate("username")
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
  res.render("dive/dive-create");
});

// Post dive form
router.post("/dive",  isUserLoggedIn, async (req, res, next) => {
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
      res.redirect("dive");
    })
    .catch((e) => {
      console.log("error creating new dive", e);
      next(e);
    });
});



// READ Dive details

router.get('/dive/:id/details', function(req, res) {
  
  Dive.findById(req.params.id, function(err, dive) {
    if (err) {
      console.log(err);
    } else {
      
      res.render('dive/dive-details', { dive: dive });
    }
  });
});


// Update Dive details
router.get("/dive/:diveId/dive-details", /*isUserLoggedIn,*/ (req, res, next) =>{
  const  diveId  = req.params.diveId;

  Dive.findById(diveId)
  .then(diveFromDB => {
    const data = {
      dive: diveFromDB,
    }
    res.render("dive/dive-details", data);
    console.log( req.params.diveId)
  })
  .catch(error => next(error));
});

// Uptade process form
router.post("/dive/:diveId/dive-details", /*isUserLoggedIn,*/ (req, res, next) => {
  const diveId = req.params.diveId;
  const { username, location, date, diveNumber, timeIn, timeOut, bottomTime, depth, airStart, airEnd, visibility, comment } = req.body;

  Dive.findByIdAndUpdate(diveId, { username, location, date, diveNumber, timeIn, timeOut, bottomTime, depth, airStart, airEnd, visibility, comment }, { new: true })
  .then(updateDive => {
    res.redirect(`/dive/${updateDive.id}`); //redirects to dive details page
  })
  .catch(error => next(error));
});


// Delete
router.post("/dive/:diveId/delete", /*isUserLoggedIn,*/ (req, res, next) => {
  const { dive_Id } = req.params;

  Dive.findByIdAndDelete(diveId)
  .then(() => res.redirect("/dive"))
  .catch(error => next(error));
});



module.exports = router;