"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMenu = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const DeleteMenu = async (req, res) => {
    const id = req.params.id;
    try {
        let product, prs;
        const prod = await prismaClient_1.default.menus.findUnique({ where: { id: Number(id) } });
        const menp = await prismaClient_1.default.menu_Price.findMany({
            where: { menu_code: prod === null || prod === void 0 ? void 0 : prod.code },
        });
        if (menp.length > 0) {
            const del_menucategories = await prismaClient_1.default.menu_Categories.deleteMany({
                where: {
                    menu_id: Number(id)
                }
            });
            prs = await prismaClient_1.default.menu_Price.deleteMany({
                where: { menu_code: menp[0].menu_code },
            });
            product = await prismaClient_1.default.menus.delete({
                where: { id: Number(id) },
            });
            console.log("with price", del_menucategories);
            if (product && prs && del_menucategories) {
                return res.status(200).json({ message: "Menu Deleted!" });
            }
            else {
                return res.status(500).json({ message: "Fail to delete Menu" });
            }
        }
        else {
            const del_menucategories = await prismaClient_1.default.menu_Categories.deleteMany({
                where: {
                    menu_id: Number(id)
                }
            });
            product = await prismaClient_1.default.menus.delete({ where: { id: Number(id) } });
            //console.log('Accross here')
            //console.log(del_menucategories,product)
            // return res.status(200).json({ message: "Menu Deleted!" });
            if (product && del_menucategories) {
                return res.status(200).json({ message: "Menu Deleted!" });
            }
            else {
                return res.status(500).json({ message: "Fail to delete Menu" });
            }
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.DeleteMenu = DeleteMenu;
//# sourceMappingURL=DeleteMenu.js.map