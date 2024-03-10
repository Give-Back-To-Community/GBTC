module.exports = (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send("No code provided");
  }
  next();
};
