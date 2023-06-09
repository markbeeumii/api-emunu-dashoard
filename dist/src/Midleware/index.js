"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token error' });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted' });
    }
    jsonwebtoken_1.default.verify(token, 'e-menu-godital', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalid' });
        }
        //const { id } = decoded as TokenPayload;
        //req.userId = id;
        return next();
    });
};
exports.default = authMiddleware;
//# sourceMappingURL=index.js.map