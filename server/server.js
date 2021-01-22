const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MyGraphQLSchema = require("./graphql");
const { graphqlHTTP } = require("express-graphql");
const DB_connection = require("./config/mongoDB");
const cloudinary_config = require("./config/cloudinary");
const apiRoutes = require("./routes");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json({ limit: "40mb" }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
// cookies
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
// to make cookies work
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());


// api routes
app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("hello world from HR management App Backend");
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
