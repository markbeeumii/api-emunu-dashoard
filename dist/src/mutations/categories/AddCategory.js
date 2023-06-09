"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCategory = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const AddCategory = async (req, res) => {
    const { title_en, title_kh, title_ch, slug, description } = req.body;
    const id = await prismaClient_1.default.categories.findUnique({ where: { slug: slug } });
    if (id) {
        return res.status(502).json({ message: 'Slug is valide' });
    }
    else {
        let result;
        if (req.file && req.file.mimetype) {
            result = await cloudinary_1.default.v2.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, {
                folder: "menu-source",
                public_id: req.file.originalname.split('.')[0]
            });
        }
        try {
            const category = await prismaClient_1.default.categories.create({
                data: {
                    title_en,
                    title_kh,
                    title_ch,
                    slug,
                    thumbnail: result === null || result === void 0 ? void 0 : result.secure_url,
                    description
                }
            });
            if (category) {
                return res.status(200).json({ category });
            }
            else {
                return res.status(500).json({ message: 'Fail to create category' });
            }
        }
        catch (error) {
            return new Error(error);
        }
        finally {
            return prismaClient_1.default.$disconnect();
        }
    }
};
exports.AddCategory = AddCategory;
//# sourceMappingURL=AddCategory.js.map