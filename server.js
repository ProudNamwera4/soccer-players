const express = require("express");
const bodyParser = require("body-parser");

const mongodb = require("./data/database");
const app = express();
app.use(express.json());
app.set("json spaces", 2);
const port = process.env.PORT || 8080;

app.use("/", require("./routes"));
app.use(bodyParser.json());

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
