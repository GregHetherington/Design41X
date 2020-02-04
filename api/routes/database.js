var express = require("express");
var router = express.Router();
require("dotenv").config();

var MongoClient = require("mongodb").MongoClient;

router.get("/", function(req, res, next) {
  MongoClient.connect(encodeURI(process.env.DB_CONN), function(err, db) {
    if (err) throw err;
    var dbo = db.db("GarbageDevice");
    dbo
      .collection("GarbageCans")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
        db.close();
      });
  });
});

module.exports = router;
