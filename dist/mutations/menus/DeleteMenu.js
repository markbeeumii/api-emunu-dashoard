"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMenu = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const DeleteMenu = async (req, res) => {
    const id = req.params.id;
    const product = await prismaClient_1.default.menus.delete({ where: { id: Number(id) } });
    if (product) {
        return res.status(200).json({ message: 'Menu Deleted!' });
    }
    else {
        return res.status(500).json({ message: 'Fail to delete Menu' });
    }
};
exports.DeleteMenu = DeleteMenu;
//# sourceMappingURL=DeleteMenu.js.map