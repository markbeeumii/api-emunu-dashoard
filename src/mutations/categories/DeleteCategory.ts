import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";
//import { record } from "zod";

export const DeleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    if (id) {
      const uncategorized = await prisma.categories.findUnique({
        where: { slug: "uncategorized" },
      });
      const randomCategory = await prisma.categories.findUnique({
        where: { id: Number(id) },
      });

      if (randomCategory && uncategorized) {
        const checkMenu = await prisma.menus.findMany({
          where: { category_Id: Number(id) },
        });
        if (!checkMenu || checkMenu.length===0) {
          const category = await prisma.categories.delete({
            where: { id: Number(id) },
          });
          if (category) {
            return res.status(200).json({ message: "Category has been deleted." });
          } else {
            return res
              .status(500)
              .json({ message: "Fail to delete category" });
          }
        } else {
          const menus = await prisma.menus.updateMany({
            where: {
              category_Id: Number(id),
            },
            data: {
              category_Id: Number(uncategorized.id),
            },
          });
          if (menus.count > 0) {
            const category = await prisma.categories.delete({
              where: { id: Number(id) },
            });
            if (category) {
              return res.status(200).json({ message: "Category Deleted!" });
            } else {
              return res
                .status(500)
                .json({ message: "Fail to delete category" });
            }
          } else {
            return new Error(`Fail to delete category.`);
          }
        }
      } else {
        return new Error(`Fail to delete category.`);
      }
    } else {
      return new Error(`Fail to delete category.`);
    }
  } catch (error) {
    return new Error(`${error}`);
  }finally{
    return prisma.$disconnect();
  }
};
