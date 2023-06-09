import { Categories } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'

export const GetOneCategory = async(req: Request, res: Response) =>{
  const id = req.params.id
  //const slug = req.params.slug
 
 try{
    const category: any  = await prisma.categories.findUnique({ 
      where: {slug: id },
      select:{
        id:true,
        title_en:true,
        title_kh:true,
        title_ch:true,
        slug:true,
        description:true,
        thumbnail:true,
        // menu_category:{
        //   select:{
        //     id:true,
        //     menu_id:true,
        //     //category_id:true,
        //   }
        // },
        //products:true
      },
      // include: {
      //   products: true
      // }
    })
    //console.log(category)

    if(category){
      return res.status(200).json({category})
    }else{
      return res.status(500).json({message: 'Fail to get category'})
    }
  }catch(error){
    return new Error(error)
  }finally{
    return prisma.$disconnect();
  }
}