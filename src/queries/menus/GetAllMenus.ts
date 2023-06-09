import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'
import { Menus } from '@prisma/client'

export const GetAllMenus = async(req: Request, res: Response) =>{

  const menus : any = await prisma.menus.findMany({ include: {category : true}})
  
  if(menus){
    return res.status(200).json({menus})
  }else{
    return res.status(500).json({message: 'Fail to get menus'})
  }
}