const express = require("express");
const Dive = require("../models/Dive.model");
const User = require("../models/User.model");
const isUserLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

//display global dive log

router.get(
  "/dive",
  isUserLoggedIn,  (req, res, next) => {
    Dive.find()
    .populate("username")
      .then((diveArr) => {
        diveArr.reverse()
        
        const data = {
          dive: diveArr,
        };

        res.render("dive/dive", data);
      })
    
      .catch((e) => {
        console.log("error getting dives from DB", e);
        next(e);
      });
  }
);

// display users logbook
router.get("/dive/my-logbook", isUserLoggedIn, (req, res, next) => {
 
  Dive.find({userId :req.session.currentUser._id})
  
    .then(divesArr =>{
      divesArr.reverse()
      
      const data = {
        dive: divesArr,
      };
      
      console.log()
      res.render("dive/my-logbook", data);
    })
})
      
    

// Create dive form
router.get("/dive/create", isUserLoggedIn, (req, res, next) => {

  User.findById(req.session.currentUser._id)
  .then(user=>{
    res.render("dive/dive-create", user);
  })
});

// Post dive form
router.post("/dive", isUserLoggedIn, async (req, res, next) => {
  console.log(".............creating form..............");
  const diveDetails = {
    userId:req.body.userId,
    username: req.body.username,
    location: req.body.location,
    date: new Date(req.body.date).toDateString(),
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
      res.redirect("dive/my-logbook");
    })
    .catch((e) => {
      console.log("error creating new dive", e);
      next(e);
    });
});

// READ Dive details

router.get("/dive/:id/details", function (req, res) {
  Dive.findById(req.params.id, function (err, dive) {
    if (err) {
      console.log(err);
    } else {
      res.render("dive/dive-details", { dive: dive });
    }
  });
});

// Update Dive details
router.get("/dive/:diveId/dive-edit", isUserLoggedIn, (req, res, next) => {
  const diveId = req.params.diveId;

  Dive.findById(diveId)
    .then((diveFromDB) => {
      const data = {
        dive: diveFromDB,
      };
      res.render("dive/dive-edit", data);
      console.log(req.params.diveId);
    })
    .catch((error) => next(error));
});

// Uptade process form
router.post("/dive/:diveId/dive-edit", isUserLoggedIn, (req, res, next) => {
  console.log(req.body);
  const diveId = req.params.diveId;
  const {
    username,
    location,
    date,
    diveNumber,
    timeIn,
    timeOut,
    bottomTime,
    depth,
    airStart,
    airEnd,
    visibility,
    comment,
  } = req.body;

  Dive.findByIdAndUpdate(
    diveId,
    {
      username,
      location,
      date,
      diveNumber,
      timeIn,
      timeOut,
      bottomTime,
      depth,
      airStart,
      airEnd,
      visibility,
      comment,
    },
    { new: true }
  )
    .then((updatedDive) => {
      res.redirect(`/dive`); //redirects to dive details page
    })
    .catch((error) => next(error));
});

// Get updated form
router.get("/dive/:diveId/dive-details", isUserLoggedIn, (req, res, next) => {
  const diveId = req.params.diveId;

  Dive.findById(diveId)
    .then((dive) => {
      res.render(`dive/dive-details`, { dive });
    })
    .catch((error) => next(error));
});

// Delete
router.post("/dive/:diveId/delete", isUserLoggedIn, (req, res, next) => {
  const { diveId } = req.params;
 console.log("req.body", req.body)
  if (req.body.deleteMethod === "DELETE") {
      Dive.findByIdAndDelete(diveId)
          .then(() => res.redirect("/dive/my-logbook"))
          .catch((error) => next(error));
  } else {
      // Handle invalid request method
      res.status(405).send("Method Not Allowed");
  }
});

module.exports = router;