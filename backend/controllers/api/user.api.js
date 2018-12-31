const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../../models/User");
const config = require("../../config/config");
const METHODS = require("../methods/method");

//@type         GET
//@route        /user/list
//@desc         getting all task
//@access       PUBLIC
router.get("/list", (req, res) => {
  db.find({}, { name: 1, phone_no: 1, _id: 1 }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//@type         GET
//@route        user/profile/:id
//@desc         getting profile
//@access       PUBLIC
router.get("/profile/:id", (req, res) => {
  db.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//@type         POST
//@route        /user/save
//@desc         save task
//@access       PUBLIC
router.post("/save", (req, res) => {
  db.findOne({ phone_no: req.body.phone_no }, (err, exist) => {
    if (exist) {
      return res.send({
        success: false,
        message: "phone no already used by another user ..."
      });
    } else {
      var data = {};
      if (req.body.firstname && req.body.lastname)
        data.name = req.body.firstname + " " + req.body.lastname;
      if (req.body.phone_no) data.phone_no = req.body.phone_no;
      if (req.body.imageData === undefined) {
        data.profile_pic = config.image;
      } else {
        data.profile_pic = req.body.imageData;
      }
      data.created = new Date();
      var newRecord = new db(data);
      newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({
          message: "All details saved successfully",
          user: docs
        });
      });
    }
  });
});

//@type         PUT
//@route        /user/update/
//@desc         update task
//@access       PUBLIC
router.put("/update", (req, res) => {
  db.findOne({ phone_no: req.body.phone_no }, (err, exist) => {
    if (exist) {
      if (exist._id == req.body._id) {
        console.log("data");

        METHODS.updateData(req, res);
      } else {
        return res.send({
          success: false,
          message: "phone no already used by another user ..."
        });
      }
    } else {
      METHODS.updateData(req, res);
    }
  });
});

module.exports = router;
