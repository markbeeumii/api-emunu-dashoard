import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'


export const SearchMenus = async (req: Request, res: Response) =>{
    const name =  String(req.query.name)
    if(!name || name=== undefined || name === '') return res.status(200).json({message: 'Error'})
      const menus = await prisma.menus.findMany({
        where:{
          OR:[
            { title_en: { contains: name } },
            { title_kh: { contains: name } },
            {
              title_en: {
                contains: name.toLowerCase(),
              }
            },
            {
              title_kh: {
                contains: name.toLowerCase(),
              }
            }
          ]
        }
      })
      
    if(menus){
      return res.status(200).json({menus})
    }else{
      return res.status(404).json({messaga: 'Not found'})
    }
}