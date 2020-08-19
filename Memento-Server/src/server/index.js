require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const eventQuery = require("./controllers/event");
const setUpMongoServer = require("./config/db");

setUpMongoServer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));

app.get("/api", (req, res) => {
  res.send("Welcome to the Memento Api");
});

app.get("/api/events", eventQuery.getEvents);

app.get("/api/event/:id", eventQuery.getEvent);

app.post("/api/event", eventQuery.postEvent);

app.delete("/api/event/:id", eventQuery.deleteEvent);

const PORT = process.env.PORT || 4000;
let server = app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = server;
