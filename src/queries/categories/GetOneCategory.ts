import { Categories } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'

export const GetOneCategory = async(req: Request, res: Response) =>{
  const id = req.params.id
  //const slug = req.params.slug

  //console.log(id)
  const category: Categories  = await prisma.categories.findUnique({ 
      where: {slug: id },
      include: {products: true}
  })
  
  
  
  if(category){
    return res.status(200).json({category})
  }else{
    return res.status(500).json({message: 'Fail to get category'})
  }
}