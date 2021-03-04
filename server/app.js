const express = require("express");
const app = express();
PORT = process.env.PORT || 3005;

//bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
// app.use(require("./routes/auth"));
app.use(require("./routes/books"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
