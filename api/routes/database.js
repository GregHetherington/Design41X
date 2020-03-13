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

function calculatePercentFull(irbits) {
  if (irbits) {
    //verify IR sensors are not in error state
    for (i = 0; i < 2; i++) {
      if (irbits[i] < irbits[i + 1]) {
        return "-1";
      }
    }

    //calculate percentFull based on valid IR bits
    if (irbits[2] === "1") {
      return "1";
    } else if (irbits[1] === "1") {
      return "0.66";
    } else if (irbits[0] === "1") {
      return "0.33";
    } else if (irbits[0] === "0") {
      return "0";
    }
  } else {
    return "-1";
  }
}

router.post("/update", function(req, res) {
  const { deviceId, irbits } = req.query;
  console.log("ID: " + deviceId + ", irbits: " + irbits);

  let percentFull = calculatePercentFull(irbits);

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
        percentFull: percentFull,
        irbits: irbits,
        details: percentFull === "-1" ? "Sensor Error" : "Stardard Update"
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
