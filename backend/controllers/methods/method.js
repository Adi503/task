const mongoose = require("mongoose");
const db = require("../../models/User");

module.exports = {
  updateData: function(req, res) {
    db.findById({ _id: mongoose.Types.ObjectId(req.body._id) })
      .then(data => {
        var query = { _id: mongoose.Types.ObjectId(data._id) };
        var update = {};
        if (req.body.name) update.name = req.body.name;
        if (req.body.phone_no) update.phone_no = req.body.phone_no;
        if (req.body.profile_pic != undefined)
          update.profile_pic = req.body.profile_pic;
        db.findOneAndUpdate(query, update, (err, doc) => {
          if (err) throw err;
          res.send({
            message: "Data updated"
          });
        });
      })
      .catch(err => console.log(err));
  }
};
