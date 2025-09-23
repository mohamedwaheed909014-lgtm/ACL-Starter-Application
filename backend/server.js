require("./config/mongodbConfig");
const app = require("./app");

const port = 4999;
app.listen(port, function () {
  console.log(`App running on port ${port}`);
});
