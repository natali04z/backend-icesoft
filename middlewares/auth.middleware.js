import jwt from "jsonwebtoken";
import { checkPermission } from "../utils/permissions.js"; 

const authenticateUser = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Si el token tiene el prefijo "Bearer ", lo eliminamos
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

const authorizePermission = (action) => (req, res, next) => {
    if (!req.user || !checkPermission(req.user.role, action)) {
        return res.status(403).json({ message: "Forbidden: You don't have permission." });
    }
    next();
};

// Exportamos las funciones correctamente
export { authenticateUser, authorizePermission };