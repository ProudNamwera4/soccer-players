const router = require("express").Router();

router.get("/", (req, res) => {
  //#Swagger.tags=["Hello World"]
  res.send("Hello World");
});

router.use("/players", require("./players"));

module.exports = router;