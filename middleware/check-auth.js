const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Ensure the token is extracted correctly
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "secret_secret"); // Replace 'secret_secret' with your actual secret
    req.user = { 
      userId: decodedToken.userId, 
      isSuperUser: decodedToken.isSuperUser 
    };
    next();
  } catch (err) {
    const error = new Error("Authentication failed!");
    error.status = 401;
    return next(error);
  }
};
