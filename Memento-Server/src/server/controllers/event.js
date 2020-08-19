const Event = require("../models/event");

exports.getEvents = function (req, res) {
  Event.find({}).exec(function (err, listEvents) {
    if (err) {
      console.log("Error: unable to get events");
      res.status(400).end();
    } else {
      res.status(200);
      res.json(listEvents);
    }
  });
};

exports.getEvent = function (req, res) {
  Event.findById(req.params.id).exec(function (err, event) {
    if (err) {
      console.log("Error: unable to get event");
      res.status(400).end();
    } else {
      res.status(200);
      res.json(event);
    }
  });
};

exports.postEvent = function (req, res) {
  Event.create(
    {
      eventTitle: req.body.eventTitle,
      description: req.body.description,
      timePosted: req.body.timePosted,
      location: req.body.location,
    },
    function (err, event) {
      if (err) {
        console.log("error: unable to post event");
        res.status(400).end();
      } else {
        res.status(200).end();
      }
    }
  );
};

exports.deleteEvent = function (req, res) {
  Event.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.send({ Error: "deleting event _id = " + req.params.id });
      res.status(400).end();
    } else {
      let message = "Success: deleted event _id = " + req.params.id;
      res.send(message);
    }
  });
};
