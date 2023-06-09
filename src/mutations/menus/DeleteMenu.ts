import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";

export const DeleteMenu = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  try {
    let product, prs;
    const prod = await prisma.menus.findUnique({ where: { id: Number(id) } });
    const menp = await prisma.menu_Price.findMany({
      where: { menu_code: prod?.code },
    });
    

    if (menp.length > 0) {
      const del_menucategories = await prisma.menu_Categories.deleteMany({
        where: {
          menu_id: Number(id)
        }
      })

      prs = await prisma.menu_Price.deleteMany({
        where: { menu_code: menp[0].menu_code },
      });

      product = await prisma.menus.delete({ 
        where: { id: Number(id) },
      });
      console.log("with price",del_menucategories)

      if (product && prs && del_menucategories) {
        return res.status(200).json({ message: "Menu Deleted!" });
      } else {
        return res.status(500).json({ message: "Fail to delete Menu" });
      }
    } else {
      const del_menucategories = await prisma.menu_Categories.deleteMany({
        where: {
          menu_id: Number(id)
        }
      })
      product = await prisma.menus.delete({ where: { id: Number(id) } });
     
      //console.log('Accross here')

      //console.log(del_menucategories,product)
     // return res.status(200).json({ message: "Menu Deleted!" });
      if (product && del_menucategories) {
        return res.status(200).json({ message: "Menu Deleted!" });
      } else {
        return res.status(500).json({ message: "Fail to delete Menu" });
      }
    }
  } catch (error) {
    return new Error(error);
  }finally{
    return prisma.$disconnect();
  }
};
