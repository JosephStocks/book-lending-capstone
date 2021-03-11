const express = require("express");
const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  next();
});

//routes
app.use(require("./routes/auth"));
app.use(require("./routes/books"));
app.use(require("./routes/friends"));

// server
PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
