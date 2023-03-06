const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
module.exports = (req, res, next) => {
  try {
    let payload = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (payload.role != "admin") {
      return res.status(401).json({ message: "Ne moze!" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized user" });
  }
};
