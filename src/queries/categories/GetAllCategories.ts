import { Categories } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'

export const GetAllCategories = async(req: Request, res: Response) =>{
  
  const categories : Categories[] = await prisma.categories.findMany({ include: {products: true}})
  
  if(categories){
    return res.status(200).json({categories})
  }else{
    return res.status(500).json({message: 'Fail to get category'})
  }
}