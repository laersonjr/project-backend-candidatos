const candidate = require("../routes/candidateRoute");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(candidate);
};
