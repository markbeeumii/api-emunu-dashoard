"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneMenu = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const GetOneMenu = async (req, res) => {
    const id = req.params.id;
    const menu = await prismaClient_1.default.menus.findUnique({
        where: { id: Number(id) },
        include: { category: true }
    });
    if (menu) {
        return res.status(200).json({ menu });
    }
    else {
        return res.status(500).json({ message: 'Fail to get menus' });
    }
};
exports.GetOneMenu = GetOneMenu;
//# sourceMappingURL=GetOneMenu.js.map