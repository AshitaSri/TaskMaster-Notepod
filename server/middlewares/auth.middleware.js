// auth.middleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'your_secret_key_here', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    console.log('User Identity:', user); // Log user identity
    req.user = user;
    next(); // Call the next middleware in the chain
  });
}

module.exports = authenticateToken;
