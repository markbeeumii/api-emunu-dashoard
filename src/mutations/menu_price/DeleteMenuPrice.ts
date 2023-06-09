import { Response , Request} from 'express';
import prisma from '../../libs/prismaClient';


export const DeleteMenuPrice = async (req: Request, res: Response)=>{
    const id = req.params.id
    try{
      if(id){
        const user = await prisma.menu_Price.delete({where: {id: Number(id)}})
        if(user){
          return res.status(200).json({
            sucess: true,
            message: 'Menu Price delete successfully.'
          })
        }else{
          return res.status(402).json({
            success: false,
            message: `Fail to delete menu price.`
          })
        }
      }else{
        return res.status(500).json({message: `Menus Price not found.`})
      }
    }catch(error){
      return new Error(error)
    }finally{
      return prisma.$disconnect();
    }
}