require("dotenv").config();
const axios = require("axios");

const base_nps_url = "https://developer.nps.gov/api/v1";
const api_url = "&api_key=" + process.env.NPS_API_KEY;

// Call NPS api for a single park data
async function getParkData(req, res) {
  const parkCode = req.params.parkCode;

  const endpoint_url = "/parks?parkCode=" + parkCode;
  const url = base_nps_url + endpoint_url + api_url;

  const nps_res = await axios.get(url);
  const data = nps_res.data.data;

  res.send(data);
}

// Call NPS api for a park data explore
async function getParkDataExplore(req, res) {
  const searchQuery = req.query.searchQuery;
  const state = req.query.state;

  if (searchQuery !== "") {
    var endpoint_url = `/parks?stateCode=${state}&limit=999&q=${searchQuery}${api_url}`;
  } else {
    var endpoint_url = `/parks?stateCode=${state}&limit=999${api_url}`;
  }
  const url = base_nps_url + endpoint_url;

  const dataResponse = await axios.get(url);
  const data = dataResponse.data.data;

  res.send(data);
}

// Call NPS api for homepage 3 popular parks data
async function getParkDataPopular(req, res) {
  const popularParkCodes = "yose,grca,yell";

  const endpoint_url = "/parks?parkCode=" + popularParkCodes;
  const url = base_nps_url + endpoint_url + api_url;

  const nps_res = await axios.get(url);
  const data = nps_res.data.data;

  return res.send(data);
}

module.exports = {
  getParkData,
  getParkDataExplore,
  getParkDataPopular,
};
