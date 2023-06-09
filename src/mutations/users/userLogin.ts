import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "@prisma/client";
import prisma from "../../libs/prismaClient";
//import { UserPayload } from '../../../Schema/userSh';

const userLogin = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as Users;

  try {
    const user = await prisma.users.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email }, "e-menu-godital", {
          expiresIn: "1h",
        });
        return res.json({ token });
      } else {
        return res.status(401).json({ message: "Password incorrect" });
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

export { userLogin };
