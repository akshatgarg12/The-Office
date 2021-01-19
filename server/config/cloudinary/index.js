const cloudinary = require("cloudinary");

const client = cloudinary.config({
  cloud_name: "akshat",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = client;
