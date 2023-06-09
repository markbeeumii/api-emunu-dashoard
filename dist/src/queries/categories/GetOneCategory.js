"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneCategory = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const GetOneCategory = async (req, res) => {
    const id = req.params.id;
    //const slug = req.params.slug
    //console.log(id)
    const category = await prismaClient_1.default.categories.findUnique({
        where: { slug: id },
        include: { products: true }
    });
    if (category) {
        return res.status(200).json({ category });
    }
    else {
        return res.status(500).json({ message: 'Fail to get category' });
    }
};
exports.GetOneCategory = GetOneCategory;
//# sourceMappingURL=GetOneCategory.js.map