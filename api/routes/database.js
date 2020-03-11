var express = require("express");
var router = express.Router();
require("dotenv").config();

var MongoClient = require("mongodb").MongoClient;

router.get("/", function(req, res, next) {
  const dbConnect = process.env.DB_CONN;
  MongoClient.connect(dbConnect, { useUnifiedTopology: true }, function(
    err,
    db
  ) {
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

router.post("/update", function(req, res) {
  let { deviceId, percentFull, irbits } = req.query;
  console.log(
    "ID: " +
      deviceId +
      ", irbits: " +
      irbits +
      " (requires one of irbits or percentFull)"
  );

  if (!percentFull && irbits[2] === "1") {
    percentFull = "1";
  } else if (!percentFull && irbits[1] === "1") {
    percentFull = "0.66";
  } else if (!percentFull && irbits[0] === "1") {
    percentFull = "0.33";
  } else if (!percentFull) {
    percentFull = "0";
  }

  const dbConnect = process.env.DB_CONN;
  MongoClient.connect(dbConnect, { useUnifiedTopology: true }, function(
    err,
    db
  ) {
    if (err) throw err;
    var dbo = db.db("GarbageDevice");

    try {
      dbo.collection("GarbageCans").updateOne(
        { deviceId: deviceId },
        {
          $set: {
            percentFull: percentFull,
            irbits: irbits,
            lastUpdated: Date.now()
          }
        },
        { upsert: false }
      );
    } catch (e) {
      res.send(e);
    }

    try {
      dbo.collection("UpdateHistory").insert({
        updatedTime: Date.now(),
        deviceId: deviceId,
        percentFull: percentFull
      });
    } catch (e) {
      res.send(e);
    }

    res.send("Update Success");
  });
});

router.get("/history", function(req, res, next) {
  const { deviceId } = req.query;

  const dbConnect = process.env.DB_CONN;
  MongoClient.connect(dbConnect, { useUnifiedTopology: true }, function(
    err,
    db
  ) {
    if (err) throw err;
    var dbo = db.db("GarbageDevice");
    dbo
      .collection("UpdateHistory")
      .find({ deviceId: deviceId })
      .toArray(function(err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
        db.close();
      });
  });
});

module.exports = router;
