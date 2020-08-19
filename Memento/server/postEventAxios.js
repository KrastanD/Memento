import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();
const axios = require("axios");

const postEvent = (eventTitle, description, location, timePosted) => {
  let url = "http://" + apiUrl + ":4000/api/event";
  let passData = {
    eventTitle: eventTitle,
    description: description,
    location: location,
    timePosted: timePosted,
  };
  axios
    .post(url, passData)
    .then((resp) => {
      return resp.status;
    })
    .catch((err) => {
      console.log(err);
      return resp.status;
    });
};

export default postEvent;
