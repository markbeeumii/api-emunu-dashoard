"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMenu = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const UpdateMenu = async (req, res) => {
    const { code, title_en, title_ch, title_kh, thumbnail, description, price, category_Id } = req.body;
    const id = req.params.id;
    const isValidCode = await prismaClient_1.default.menus.findUnique({ where: { code: code } });
    const isCurrentCode = await prismaClient_1.default.menus.findUnique({ where: { id: Number(id) } });
    //console.log(isValidCode)
    if ((isValidCode === null || isValidCode === void 0 ? void 0 : isValidCode.code) !== isCurrentCode.code) {
        return res.status(502).json({ message: 'Code is valide' });
    }
    else {
        let result;
        if (req.file && req.file.mimetype) {
            result = await cloudinary_1.default.v2.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, {
                folder: "menu-source",
                public_id: req.file.originalname.split('.')[0]
            });
        }
        if (result) {
            const product = await prismaClient_1.default.menus.update({
                data: {
                    code,
                    title_en,
                    title_ch,
                    title_kh,
                    thumbnail: result.secure_url,
                    description,
                    price: Number(price),
                    category_Id: Number(category_Id)
                },
                where: { id: Number(id) }
            });
            if (product) {
                return res.status(200).json({ product });
            }
            else {
                return res.status(500).json({ message: 'Fail to update menu' });
            }
        }
        else {
            const product = await prismaClient_1.default.menus.update({
                data: {
                    code,
                    title_en,
                    title_ch,
                    title_kh,
                    description,
                    price: Number(price),
                    category_Id: Number(category_Id)
                },
                where: { id: Number(id) }
            });
            if (product) {
                return res.status(200).json({ product });
            }
            else {
                return res.status(500).json({ message: 'Fail to update menu' });
            }
        }
    }
};
exports.UpdateMenu = UpdateMenu;
//# sourceMappingURL=UpdateMenu.js.map