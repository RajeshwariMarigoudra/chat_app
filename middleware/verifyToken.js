const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Split the authorization header to extract the token part
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    jwt.verify(token, 'abcdefghijklmnopqrstuvwxyzabcdef', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
