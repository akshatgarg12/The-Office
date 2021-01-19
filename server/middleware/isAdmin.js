const isAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not an Admin");
    }
  } else {
    res.status(403).send("You are not logged in");
  }
};

module.exports = isAdmin;
