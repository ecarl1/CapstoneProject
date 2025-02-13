const jwt = require('jsonwebtoken');
//ensures that the authenticate token is used to protect routes
//ensures users provide lavid JWT before accessing certain endpoints
//middleware for token authorization
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    //user needs a token
    if (!token) {
        return res.status(401).json({ error: "Access Denied: You do not have a token" });
    }

    //verifying the token
    jwt.verify(token, 'key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or Expired Token" });
        }

        req.user = user; 
        next();
    });
};

module.exports = authenticateToken;
