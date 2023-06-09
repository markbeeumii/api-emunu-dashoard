import {  Request, Response} from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../libs/prismaClient';
import { error } from 'console';

const MeQuery = async (req: Request, res : Response)=>{
    let header: string
    header = req.headers['authorization']
    let token:string
    if(typeof header=== 'string'){
      token = header && header.split(' ')[1]
    }
    let  userPayload:any
    try{
      userPayload = jwt.verify(token,'e-menu-godital')
    }catch(error:any){
      throw new Error(error)
    }

    //console.log(userPayload)
    if(userPayload){
            const user = await prisma.users.findUnique({ where:{email: userPayload.email}})
            return res.json({user : user})
    }else{
        return res.json({message : `User doesn't exist`})
    }
}

export {MeQuery}