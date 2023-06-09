import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'
import { Menus } from '@prisma/client'

export const GetOneMenu = async(req: Request, res: Response) =>{
  const id = req.params.id
  const menu : Menus = await prisma.menus.findUnique({ 
    where: {id : Number(id)},
    include: {category: true}
  })
  
  if(menu){
    return res.status(200).json({menu})
  }else{
    return res.status(500).json({message: 'Fail to get menus'})
  }
}