import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'


export const DeleteMenu = async(req :Request, res: Response) =>{
  const id = req.params.id

  const product = await prisma.menus.delete({ where: {id : Number(id)}})

  if(product){
    return res.status(200).json({message: 'Menu Deleted!'})
  }else{
    return res.status(500).json({message: 'Fail to delete Menu'})
  }
}