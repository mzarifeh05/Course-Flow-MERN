const jwt = require("jsonwebtoken");

// verify token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// admin only
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin only" });

    next();
};

module.exports = { authMiddleware, adminMiddleware };
