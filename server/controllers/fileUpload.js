const cloudinary = require("cloudinary");

const fileUpload = async (req, res) => {
  try {
    const imgUpload = await cloudinary.v2.uploader.upload(req.body.file, {
      upload_preset: "tech-stack 2.0",
    });
    console.log(imgUpload);
    res.status(200).send(imgUpload.secure_url);
  } catch (e) {
    console.log(e.message);
    res.status(400).send("error in uploading the image");
  }
};
module.exports = fileUpload;
