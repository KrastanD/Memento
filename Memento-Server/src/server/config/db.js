const mongoose = require("mongoose");
require("dotenv").config();

const MONGOURI =
  "mongodb+srv://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASS +
  "@clustermemento-9k8wv.mongodb.net/memento";

const setUpMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB connection was successful");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = setUpMongoServer;
