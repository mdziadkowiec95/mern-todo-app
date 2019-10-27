const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied!' }] });
  }

  try {
    const decodedJwt = jwt.verify(token, config.get('mySecretJwt'));

    req.user = decodedJwt.user;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ errors: [{ msg: 'Token is not valid!' }] });
  }
};

module.exports = authMiddleware;
