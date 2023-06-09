//import { UserPayload } from '../../../Schema/userSh';
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../libs/prismaClient";
import { Users } from "@prisma/client";

const userSignup = async (req: Request, res: Response) => {
  const { 
    email, 
    password, 
    username, 
    phone_number, 
    profile_picture, 
    gender } = req.body as Users;
  //
  try {
    const id = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!id) {
      const users = await prisma.users.create({
        data: {
          email,
          password: password ? bcrypt.hashSync(password, 12) : null,
          username,
          phone_number: phone_number || null,
          profile_picture,
          gender,
        },
      });

      if (users) {
        return res.status(200).json({
          message: "Signup Successfully",
        });
      } else {
        return res.status(500).json({ message: "Fail to create user" });
      }
    } else {
      return res.status(500).json({ message: "Invalid user!!!" });
    }
  } catch (error) {
    return new Error(error);
  }finally{
    return prisma.$disconnect();
  }
};

export { userSignup };
