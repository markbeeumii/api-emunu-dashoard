"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const DeleteCategory = async (req, res) => {
    const id = req.params.id;
    const category = await prismaClient_1.default.categories.delete({ where: { id: Number(id) } });
    if (category) {
        return res.status(200).json({ message: 'Category Deleted!' });
    }
    else {
        return res.status(500).json({ message: 'Fail to delete category' });
    }
};
exports.DeleteCategory = DeleteCategory;
//# sourceMappingURL=DeleteCategory.js.map