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
        },
        select:{
          id:true,
          code: true,
          title_en: true,
          title_kh: true,
          title_ch: true,
          price: true,
          category_Id:true , // Will remove when Optimize it 
          top: true, // Temporary query => discuss later 
          thumbnail: true,
          // description:false,
          // createdAt:false,
          // updatedAt:false,
          menu_category:{
            select:{
              category:{
                select:{
                  id: true,
                  slug: true,
                  title_en: true,
                  title_kh: true,
                  title_ch: true,
                  thumbnail:true
                }
              }
            }
          },
          Menu_Price:{
            select:{
              id:true,
              menu_code:true,
              price: true,
              size: true,
            }
          },
        }
      })
      
    if(menus){
      return res.status(200).json({menus})
    }else{
      return res.status(404).json({messaga: 'Not found'})
    }
}