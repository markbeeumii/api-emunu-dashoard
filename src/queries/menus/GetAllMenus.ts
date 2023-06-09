import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";
//import { Menus } from "@prisma/client";

export const GetAllMenusByPage = async (req: Request, res: Response) => {
  try {
    
    const pageParam = Number(req.query.page) || 1
    const limit = Number(process.env.LIMIT_QUERY)

    //console.log(limit*pageParam)
    const menus = await prisma.menus.findMany({
      select:{
        id:true,
        code:true,
        title_en:true,
        title_ch:true,
        title_kh:true,
        price:true,
        category_Id:true,
        top:true,
        thumbnail:true,
        menu_category:{
          select:{
            category:{
              select:{
                id:true,
                slug:true,
                title_en:true,
                title_ch:true,
                title_kh:true,
                thumbnail:true
              }
            }
          }
        },
        Menu_Price: {
          select:{
            id:true,
            menu_code:true,
            price: true,
            size: true,
          }
        },
      },
      // include: {
      //   menu_category:{
      //     select:{
      //       category:true
      //     }
      //   },
      //   Menu_Price: {
      //     select:{
      //       id:true,
      //       menu_code:true,
      //       price: true,
      //       size: true,
      //     }
      //   },
      //   //menu_category:true, 
      //   //category: true
      // },
      take:limit*pageParam,
      orderBy:{
        id:"desc"
      },
      // _count:{
      //   all
      // }
    });

    const total= await prisma.menus.count();
    //console.log(total,menus.length)
    
    if (menus) {
      return res.status(200).json({ 
        menus, 
        all : total=== menus.length? true : false 
      });
    } else {
      return res.status(500).json({ message: "Fail to get menus" });
    }
  } catch (error) {
    return new Error(error);
  }finally{
    return prisma.$disconnect();
  }
};


export const AllMenus = async (req: Request, res: Response)=>{
  try {
    
    const pageParam = Number(req.query.page) || 1
    const limit = Number(process.env.LIMIT_QUERY)

    const menus = await prisma.menus.findMany({
      select:{
        id:true,
        code:true,
        title_en:true,
        title_ch:true,
        title_kh:true,
        price:true,
        category_Id:true,
        top:true,
        thumbnail:true,
        menu_category:{
          select:{
            id:true,
            category:{
              select:{
                id:true,
                slug:true,
                // title_en:true,
                // title_ch:true,
                // title_kh:true,
                // thumbnail:true
              }
            }
          }
        },
        Menu_Price: {
          select:{
            id:true,
            menu_code:true,
            price: true,
            size: true,
          }
        },
      },
      // include: {
      //   Menu_Price: true, 
      //   menu_category:{
      //     select:{
      //       id:true,
      //       category: {
      //         select:{
      //           id:true,
      //           slug: true
      //         }
      //       }
      //     },
      //   }
      // },
      orderBy:{
        id:"asc"
      },
     
    });

    //const total= await prisma.menus.count();
    //console.log(total,menus.length)
    
    if (menus) {
      return res.status(200).json({ 
        menus
      });
    } else {
      return res.status(500).json({ message: "Fail to get menus" });
    }
  } catch (error) {
    return new Error(error);
  }finally{
    return prisma.$disconnect();
  }
}