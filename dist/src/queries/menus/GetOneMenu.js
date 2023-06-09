"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneMenu = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const GetOneMenu = async (req, res) => {
    const id = req.params.id;
    try {
        const menu = await prismaClient_1.default.menus.findUnique({
            where: { id: Number(id) },
            include: {
                category: true,
                Menu_Price: true,
                menu_category: {
                    select: {
                        category_id: true,
                        menu_id: true
                    },
                    orderBy: {
                        category_id: "asc"
                    }
                }
            }
        });
        if (menu) {
            return res.status(200).json({ menu });
        }
        else {
            return res.status(500).json({ message: 'Fail to get menus' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.GetOneMenu = GetOneMenu;
//# sourceMappingURL=GetOneMenu.js.map