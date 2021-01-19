const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
  }
);
mongoose.connection.on("connected", () => console.log("mongoDB connected"));

module.exports = mongoose;
