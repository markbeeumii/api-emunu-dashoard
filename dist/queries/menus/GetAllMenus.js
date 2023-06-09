"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMenus = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const GetAllMenus = async (req, res) => {
    const menus = await prismaClient_1.default.menus.findMany({ include: { category: true } });
    if (menus) {
        return res.status(200).json({ menus });
    }
    else {
        return res.status(500).json({ message: 'Fail to get menus' });
    }
};
exports.GetAllMenus = GetAllMenus;
//# sourceMappingURL=GetAllMenus.js.map