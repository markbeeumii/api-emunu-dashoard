import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'


export const DeleteCategory = async(req: Request, res: Response) =>{
  const id = req.params.id
  
  const category = await prisma.categories.delete( {where: {id: Number(id) }} )

  if(category){
    return res.status(200).json({message: 'Category Deleted!'})
  }else{
    return res.status(500).json({message: 'Fail to delete category'})
  }
}