const mongoose = require("mongoose"),
  EventSchema = mongoose.Schema(
    {
      eventTitle: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      timePosted: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
    },
    {
      versionKey: false,
    }
  );

module.exports = mongoose.model("memento_events", EventSchema);
