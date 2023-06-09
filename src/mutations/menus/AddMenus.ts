import { Menus } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";
import cloudinary from "cloudinary";
//import { menupriceSchema } from "../../../Schema/userSh";

export const AddMenus = async (req: any, res: Response) => {
  const {
    code,
    title_en,
    title_ch,
    title_kh,
    thumbnail,
    description,
    price,
    category_Id,
    menu_price,
  } = req.body;
  try {
    //if(!thumbnail) 
    const id = await prisma.menus.findUnique({ where: { code: code } });
    if (id) {
      return res.status(502).json({ message: "Code is valide" });
    } else {
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
      }else{
        return res.status(412).json({message:'Please select image.'})
      }
      
      const product = await prisma.menus.create({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          thumbnail: result?.secure_url,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
      });

      //console.log(menu_price,menu_price?.length)
      const multiple_categories
         = category_Id?.map(async (p:any)=>{
           await prisma.menu_Categories.create({
             data:{
               menu_id: Number(product.id),
               category_id: Number(p)
             }
           })
         })

      //if(product){

         //Multiple Categories
        

        // if(multiple_categories){
        //   return res.status(200).json({ message: `Successfully` });
        // }
        
        // return res.status(500).json({ message: "Fail to create menu" });
      //}

      if (product && price && multiple_categories){
        return res.status(200).json({ message: `Successfully` });
      }else if (product && multiple_categories) {
        
        if (menu_price.length > 0) {

          //Debugging
          //console.log(menu_price[0].menu_code)

          const check =  await prisma.menus.findUnique({
            where: {
              code: String(menu_price[0]?.menu_code),
            },
          });

          //Debugging
          //console.log(check)
          
          if (check) {
            for (let i = 0; i < menu_price.length; i++) {
              await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: Number(menu_price[i].price),
                  menu_code: String(check?.code),
                },
              });
            }
          } 
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to create menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to create menu" });
      }
    }
  } catch (error) {
    return new Error(error);
  }finally{
    return prisma.$disconnect();
  }
};


/*
export const AddMenus = async (req: any, res: Response) => {
  const {
    code,
    title_en,
    title_ch,
    title_kh,
    thumbnail,
    description,
    price,
    category_Id,
    menu_price,
  } = req.body;
  try {
    //if(!thumbnail) 
    const id = await prisma.menus.findUnique({ where: { code: code } });
    if (id) {
      return res.status(502).json({ message: "Code is valide" });
    } else {
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
      }else{
        return res.status(412).json({message:'Please select image.'})
      }
      console.log(category_Id)
      const product = await prisma.menus.create({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          thumbnail: result?.secure_url,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
      });

      if (product && price){
        return res.status(200).json({ message: `Successfully` });
      }else if (product) {
        if (menu_price.length > 0) {
          const check =  await prisma.menus.findUnique({
            where: {
              code: String(menu_price[0]?.menu_code),
            },
          });
          
          if (check) {
            for (let i = 0; i < menu_price.length; i++) {
              await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: Number(menu_price[i].price),
                  menu_code: String(check?.code),
                },
              });
            }
          } 
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to create menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to create menu" });
      }
    }
  } catch (error) {
    return new Error(error);
  }
};


*/