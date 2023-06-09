"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const UpdateCategory = async (req, res) => {
    const { title_en, title_kh, title_ch, slug, description } = req.body;
    const id = req.params.id;
    // const isValidSlug =   await prisma.categories.findUnique({ where: {slug: slug }})
    // const isCurrentCode = await prisma.categories.findUnique({ where: {slug: id}})
    try {
        let result;
        if (req.file && req.file.mimetype) {
            result = await cloudinary_1.default.v2.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, {
                folder: "menu-source",
                public_id: req.file.originalname.split('.')[0]
            });
        }
        if (result) {
            const category = await prismaClient_1.default.categories.update({
                data: {
                    title_en,
                    title_kh,
                    title_ch,
                    slug,
                    thumbnail: result.secure_url,
                    description: description,
                },
                where: { slug: id }
            });
            if (category) {
                return res.status(200).json({ message: 'Update Category successfully' });
            }
            else {
                return res.status(500).json({ message: 'Fail to update category' });
            }
        }
        else {
            const category = await prismaClient_1.default.categories.update({
                data: {
                    title_en,
                    title_kh,
                    title_ch,
                    slug,
                    description: description,
                },
                where: { slug: id }
            });
            if (category) {
                return res.status(200).json({ message: 'Update Category successfully' });
            }
            else {
                return res.status(500).json({ message: 'Fail to update category' });
            }
        }
    }
    catch (_a) {
        throw Error('Error !');
    }
};
exports.UpdateCategory = UpdateCategory;
//# sourceMappingURL=UpdateCategory.js.map