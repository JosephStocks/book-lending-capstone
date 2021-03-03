const express = require("express");
const app = express();
PORT = process.env.PORT || 3005;

// here is a commentsdfsfs

app.use(require("./routes/auth"));
app.use(require("./routes/books"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
