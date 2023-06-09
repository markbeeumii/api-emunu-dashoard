"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeQuery = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const MeQuery = async (req, res) => {
    let header;
    header = req.headers['authorization'];
    let token;
    if (typeof header === 'string') {
        token = header && header.split(' ')[1];
    }
    let userPayload;
    try {
        userPayload = jsonwebtoken_1.default.verify(token, 'e-menu-godital');
    }
    catch (error) {
        throw new Error(error);
    }
    //console.log(userPayload)
    if (userPayload) {
        const user = await prismaClient_1.default.users.findUnique({ where: { email: userPayload.email } });
        return res.json({ user: user });
    }
    else {
        return res.json({ message: `User doesn't exist` });
    }
};
exports.MeQuery = MeQuery;
//# sourceMappingURL=meQuery.js.map