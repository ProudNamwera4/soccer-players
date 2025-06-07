const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use("/", require("./routes"));

// Start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});