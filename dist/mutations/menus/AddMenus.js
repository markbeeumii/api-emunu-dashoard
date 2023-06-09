"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMenus = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const AddMenus = async (req, res) => {
    const { code, title_en, title_ch, title_kh, thumbnail, description, price, category_Id } = req.body;
    const id = await prismaClient_1.default.menus.findUnique({ where: { code: code } });
    if (id) {
        return res.status(502).json({ message: 'Code is valide' });
    }
    else {
        console.log(code, title_en, title_ch, title_kh, thumbnail, description, price, category_Id);
        let result;
        if (req.file && req.file.mimetype) {
            result = await cloudinary_1.default.v2.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, {
                folder: "menu-source",
                public_id: req.file.originalname.split('.')[0]
            });
        }
        //console.log(req.file)
        const product = await prismaClient_1.default.menus.create({
            data: {
                code,
                title_en,
                title_ch,
                title_kh,
                thumbnail: result === null || result === void 0 ? void 0 : result.secure_url,
                description,
                price: Number(price),
                category_Id: Number(category_Id)
            }
        });
        if (product) {
            return res.status(200).json({ product });
        }
        else {
            return res.status(500).json({ message: 'Fail to create menu' });
        }
    }
};
exports.AddMenus = AddMenus;
//# sourceMappingURL=AddMenus.js.map