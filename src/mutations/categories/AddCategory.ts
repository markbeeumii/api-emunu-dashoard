import { Categories } from '@prisma/client'
import {Request, Response} from 'express'
import prisma from '../../libs/prismaClient'
import cloudinary from "cloudinary";


export const AddCategory = async(req: any, res: Response) =>{
  const {title_en, title_kh,title_ch,slug , description} = req.body as Categories
  
  const id =   await prisma.categories.findUnique({ where: {slug: slug }})

  if(id){
    return res.status(502).json({message: 'Slug is valide'})
  }else{
  let result:any
  if (req.file && req.file.mimetype) {
    result = await cloudinary.v2.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "menu-source",
        public_id: req.file.originalname.split('.')[0]
      }
    );
  }

try{ 
  const category = await prisma.categories.create({
      data:{
        title_en,
        title_kh,
        title_ch,
        slug,
        thumbnail: result?.secure_url, 
        description
      }
    })
  if(category){
    return res.status(200).json({category})
  }else{
    return res.status(500).json({message: 'Fail to create category'})
  }
  }catch(error){
    throw Error('Error from Database')
  }
}
}