const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Access Denied: You do not have a token" });
    }

    jwt.verify(token, 'key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or Expired Token" });
        }

        req.user = user; 
        next();
    });
};

module.exports = authenticateToken;
