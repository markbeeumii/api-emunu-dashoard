"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategories = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const GetAllCategories = async (req, res) => {
    const categories = await prismaClient_1.default.categories.findMany({ include: { products: true } });
    if (categories) {
        return res.status(200).json({ categories });
    }
    else {
        return res.status(500).json({ message: 'Fail to get category' });
    }
};
exports.GetAllCategories = GetAllCategories;
//# sourceMappingURL=GetAllCategories.js.map