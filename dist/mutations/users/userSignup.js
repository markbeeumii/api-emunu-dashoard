"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const userSignup = async (req, res) => {
    const { email, password, username, phone_number, profile_picture, gender } = req.body;
    //console.log(email,password,username)
    const id = await prismaClient_1.default.users.findUnique({
        where: {
            email: email,
        }
    });
    if (!id) {
        const users = await prismaClient_1.default.users.create({
            data: {
                email,
                password: password ? bcryptjs_1.default.hashSync(password, 12) : null,
                username,
                phone_number: phone_number || null,
                profile_picture,
                gender
            }
        });
        if (users) {
            return res.status(200).json({
                message: 'Signup Successfully',
            });
        }
        else {
            return res.status(500).json({ message: 'Fail to create user' });
        }
    }
    else {
        return res.status(500).json({ message: 'Invalid user!!!' });
    }
};
exports.userSignup = userSignup;
//# sourceMappingURL=userSignup.js.map