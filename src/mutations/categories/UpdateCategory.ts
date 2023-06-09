import { Categories } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";
import cloudinary from "cloudinary";

export const UpdateCategory = async (req: any, res: Response) => {
  
try {

  const { 
    title_en, 
    title_kh, 
    title_ch, 
    slug, 
    description } = req.body as Categories;
    
  const id = req.params.id;
  // const isValidSlug =   await prisma.categories.findUnique({ where: {slug: slug }})
  // const isCurrentCode = await prisma.categories.findUnique({ where: {slug: id}})
    let result;
    if (req.file && req.file.mimetype) {
      result = await cloudinary.v2.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "menu-source",
          public_id: req.file.originalname.split(".")[0],
        }
      );
    }

    if (result) {
      const category = await prisma.categories.update({
        data: {
          title_en,
          title_kh,
          title_ch,
          slug,
          thumbnail: result.secure_url,
          description: description,
        },
        where: { slug: id },
      });
      if (category) {
        return res
          .status(200)
          .json({ message: "Update Category successfully" });
      } else {
        return res.status(500).json({ message: "Fail to update category" });
      }
    } else {
      const category = await prisma.categories.update({
        data: {
          title_en,
          title_kh,
          title_ch,
          slug,
          description: description,
        },
        where: { slug: id },
      });
      if (category) {
        return res
          .status(200)
          .json({ message: "Update Category successfully" });
      } else {
        return res.status(500).json({ message: "Fail to update category" });
      }
    }
  } catch (error:any) {
    //console.log('first')
    //return throw new Error(error);
    return res.status(500).json({ message: "This slug is already in used" });
  }finally{
    return prisma.$disconnect();
  }
};
