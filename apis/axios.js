const axios = require("axios");
const CLIENT_ID = process.env.IMGUR_CLIENT_ID;
const imgurApi = axios.create({
  baseURL: "https://api.imgur.com/3/image",
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`,
  },
});

module.exports = {
  imgurApi,
};
