import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'
//import { Menus } from '@prisma/client'

export const GetOneMenu = async(req: Request, res: Response) =>{
  const id = req.params.id
  try{
    const menu : any = await prisma.menus.findUnique({ 
      where: {id : Number(id)},
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
        description:true,
        Menu_Price:true,
        menu_category:{
          select:{
            category_id:true,
            menu_id:true
          },
          orderBy:{
            category_id:"asc"
          }
        }
      }
      // include: {
      //   category: true,
      //   Menu_Price: true,
      //   menu_category: {
      //     select:{
      //       category_id:true,
      //       menu_id:true
      //     },
      //     orderBy:{
      //       category_id:"asc"
      //     }
      //   }
      // }
    })
    //console.log(menu)
    
    if(menu){
      return res.status(200).json({menu})
    }else{
      return res.status(500).json({message: 'Fail to get menus'})
    }
  }catch(error:any){
    return res.status(500).json({message: error})
  }finally{
    return prisma.$disconnect();
  }
}