"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMenus = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const SearchMenus = async (req, res) => {
    const name = String(req.query.name);
    if (!name)
        return res.status(404).json({ message: 'Error' });
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