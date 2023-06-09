"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMenus = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const SearchMenus = async (req, res) => {
    const name = String(req.query.name);
    if (!name || name === undefined || name === '')
        return res.status(200).json({ message: 'Error' });
    const menus = await prismaClient_1.default.menus.findMany({
        where: {
            OR: [
                { title_en: { contains: name } },
                { title_kh: { contains: name } },
                {
                    title_en: {
                        contains: name.toLowerCase(),
                    }
                },
                {
                    title_kh: {
                        contains: name.toLowerCase(),
                    }
                }
            ]
        },
        select: {
            id: true,
            code: true,
            title_en: true,
            title_kh: true,
            title_ch: true,
            price: true,
            category_Id: true,
            top: true,
            thumbnail: true,
            // description:false,
            // createdAt:false,
            // updatedAt:false,
            menu_category: {
                select: {
                    category: {
                        select: {
                            id: true,
                            slug: true,
                            title_en: true,
                            title_kh: true,
                            title_ch: true,
                            thumbnail: true
                        }
                    }
                }
            },
            Menu_Price: {
                select: {
                    id: true,
                    menu_code: true,
                    price: true,
                    size: true,
                }
            },
        }
    });
    if (menus) {
        return res.status(200).json({ menus });
    }
    else {
        return res.status(404).json({ messaga: 'Not found' });
    }
};
exports.SearchMenus = SearchMenus;
//# sourceMappingURL=SearchMenu.js.map