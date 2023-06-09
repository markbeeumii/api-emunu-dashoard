
import { Categories } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'

export const GetAllCategories = async(req: Request, res: Response) =>{
  try{
    
    const categories : any = await prisma.categories.findMany({ 
      select:{
        id:true,
        title_en:true,
        title_kh:true,
        title_ch:true,
        slug:true,
        thumbnail:true,
        menu_category:{
          select:{
            id:true,
            menu_id:true,
            category_id:true,
          }
        },
        products:{
          select:{
            code:true,
          }
        }
      }
    })
    
    if(categories){
      return res.status(200).json({categories})
    }else{
      return res.status(500).json({message: 'Fail to get category'})
    }
  }catch(error){
    return new Error(error)
  }finally{
    return prisma.$disconnect();
  }
}


export const GetCategories = async (req: Request, res: Response) =>{
  try{
    
    const categories : any = await prisma.categories.findMany({ 
      where:{
        menu_category:{
          some:{}
        }
      },
      select:{
        id:true,
        title_en:true,
        title_kh:true,
        title_ch:true,
        slug:true,
        thumbnail:true,
        // menu_category:{
        //   select:{
        //     id:true,
        //     menu_id:true,
        //     //category_id:true,
        //   }
        // },
        //products:true
      }
    })
    
    if(categories){
      return res.status(200).json({categories})
    }else{
      return res.status(500).json({message: 'Fail to get category'})
    }
  }catch(error){
    return new Error(error)
  }finally{
    return prisma.$disconnect();
  }
}