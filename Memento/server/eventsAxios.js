import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();
const axios = require("axios");

const getEventsJson = (source) => {
  let url = "http://" + apiUrl + ":4000/api/events";
  var promise = new Promise(function (resolve, reject) {
    axios
      .get(url, { cancelToken: source.token })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
  return promise;
};

export default getEventsJson;
