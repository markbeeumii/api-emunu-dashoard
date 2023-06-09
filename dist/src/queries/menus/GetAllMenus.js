"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMenus = exports.GetAllMenusByPage = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
//import { Menus } from "@prisma/client";
const GetAllMenusByPage = async (req, res) => {
    try {
        const pageParam = Number(req.query.page) || 1;
        const limit = Number(process.env.LIMIT_QUERY);
        //console.log(limit*pageParam)
        const menus = await prismaClient_1.default.menus.findMany({
            include: {
                menu_category: {
                    select: {
                        category: true
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
                //menu_category:true, 
                //category: true
            },
            take: limit * pageParam,
            orderBy: {
                id: "desc"
            },
            // _count:{
            //   all
            // }
        });
        const total = await prismaClient_1.default.menus.count();
        //console.log(total,menus.length)
        if (menus) {
            return res.status(200).json({
                menus,
                all: total === menus.length ? true : false
            });
        }
        else {
            return res.status(500).json({ message: "Fail to get menus" });
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.GetAllMenusByPage = GetAllMenusByPage;
const AllMenus = async (req, res) => {
    try {
        const pageParam = Number(req.query.page) || 1;
        const limit = Number(process.env.LIMIT_QUERY);
        const menus = await prismaClient_1.default.menus.findMany({
            include: {
                Menu_Price: true,
                menu_category: {
                    select: {
                        id: true,
                        category: {
                            select: {
                                id: true,
                                slug: true
                            }
                        }
                    },
                }
            },
            orderBy: {
                id: "asc"
            },
        });
        //const total= await prisma.menus.count();
        //console.log(total,menus.length)
        if (menus) {
            return res.status(200).json({
                menus
            });
        }
        else {
            return res.status(500).json({ message: "Fail to get menus" });
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.AllMenus = AllMenus;
//# sourceMappingURL=GetAllMenus.js.map