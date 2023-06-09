"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMenuPrice = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const DeleteMenuPrice = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await prismaClient_1.default.menu_Price.delete({ where: { id: Number(id) } });
            if (user) {
                return res.status(200).json({
                    sucess: true,
                    message: 'Menu Price delete successfully.'
                });
            }
            else {
                return res.status(402).json({
                    success: false,
                    message: `Fail to delete menu price.`
                });
            }
        }
        else {
            return res.status(500).json({ message: `Menus Price not found.` });
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.DeleteMenuPrice = DeleteMenuPrice;
//# sourceMappingURL=DeleteMenuPrice.js.map