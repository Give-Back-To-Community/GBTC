module.exports = (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json("No code provided");
  }
  next();
};
