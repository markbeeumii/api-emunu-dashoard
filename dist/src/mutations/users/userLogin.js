"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
//import { UserPayload } from '../../../Schema/userSh';
const userLogin = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await prismaClient_1.default.users.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }
        if (user) {
            if (bcryptjs_1.default.compareSync(password, user.password)) {
                const token = jsonwebtoken_1.default.sign({ email }, "e-menu-godital", {
                    expiresIn: "1h",
                });
                return res.json({ token });
            }
            else {
                return res.status(401).json({ message: "Password incorrect" });
            }
        }
        else {
            return res.status(500).json({ message: "Invalid user!!!" });
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.userLogin = userLogin;
//# sourceMappingURL=userLogin.js.map