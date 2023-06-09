"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const DeleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const uncategorized = await prismaClient_1.default.categories.findUnique({
                where: { slug: "uncategorized" },
            });
            const randomCategory = await prismaClient_1.default.categories.findUnique({
                where: { id: Number(id) },
            });
            if (randomCategory && uncategorized) {
                const checkMenu = await prismaClient_1.default.menus.findMany({
                    where: { category_Id: Number(id) },
                });
                if (!checkMenu || checkMenu.length === 0) {
                    const category = await prismaClient_1.default.categories.delete({
                        where: { id: Number(id) },
                    });
                    if (category) {
                        return res.status(200).json({ message: "Category has been deleted." });
                    }
                    else {
                        return res
                            .status(500)
                            .json({ message: "Fail to delete category" });
                    }
                }
                else {
                    const menus = await prismaClient_1.default.menus.updateMany({
                        where: {
                            category_Id: Number(id),
                        },
                        data: {
                            category_Id: Number(uncategorized.id),
                        },
                    });
                    if (menus.count > 0) {
                        const category = await prismaClient_1.default.categories.delete({
                            where: { id: Number(id) },
                        });
                        if (category) {
                            return res.status(200).json({ message: "Category Deleted!" });
                        }
                        else {
                            return res
                                .status(500)
                                .json({ message: "Fail to delete category" });
                        }
                    }
                    else {
                        return new Error(`Fail to delete category.`);
                    }
                }
            }
            else {
                return new Error(`Fail to delete category.`);
            }
        }
        else {
            return new Error(`Fail to delete category.`);
        }
    }
    catch (error) {
        return new Error(`${error}`);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.DeleteCategory = DeleteCategory;
//# sourceMappingURL=DeleteCategory.js.map