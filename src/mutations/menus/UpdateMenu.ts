import { Menus } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'
import cloudinary from "cloudinary";


export const UpdateMenu = async(req :any, res: Response) =>{
  const {code, title_en, title_ch, title_kh,thumbnail, description, price, category_Id} = req.body as Menus
  const id = req.params.id

  const isValidCode = await prisma.menus.findUnique({where: {code: code}})
  const isCurrentCode = await prisma.menus.findUnique({where: {id: Number(id)}})
  //console.log(isValidCode)
  if(isValidCode?.code !== isCurrentCode.code){
    return res.status(502).json({message: 'Code is valide'})
  }else{
   
  let result 
  if (req.file && req.file.mimetype) {
    result = await cloudinary.v2.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "menu-source",
        public_id: req.file.originalname.split('.')[0]
      }
    );
  }

  if(result){
    const product = await prisma.menus.update({
      data:{
        code, 
        title_en, 
        title_ch, 
        title_kh, 
        thumbnail : result.secure_url, 
        description, 
        price: Number(price), 
        category_Id : Number(category_Id)
      },
      where: {id : Number(id)}
    })

    if(product){
      return res.status(200).json({product})
    }else{
      return res.status(500).json({message: 'Fail to update menu'})
    }
  }else{
    const product = await prisma.menus.update({
      data:{
        code, 
        title_en, 
        title_ch, 
        title_kh, 
        description, 
        price: Number(price), 
        category_Id : Number(category_Id)
      },
      where: {id : Number(id)}
    })

    if(product){
      return res.status(200).json({product})
    }else{
      return res.status(500).json({message: 'Fail to update menu'})
    }
  }
  }

}