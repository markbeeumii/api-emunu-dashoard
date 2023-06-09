import {config} from 'dotenv'
import express,{ Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import router from './router/router';
import cloudinary  from 'cloudinary'
import cors from 'cors';

config();
const app = express()
const port = Number(process.env.PORT) || 1444
const prisma = new PrismaClient()
app.use(cors())

cloudinary.v2.config({
  cloud_name: process.env.STORAGE_NAME,
  api_key: process.env.STORAGE_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.get('/',(req : Request, res: Response)=>{
  return res.send(`<h1>Hello API By Mark</h1>`)
})

app.use(async (req : Request, res: Response) =>{
  const error = new Error(`Sorry Not Found`)
  return res.status(404).send(` ${error}`)
})

app.listen(port, ()=>{
  return console.log(`Server is running on port ${port}`)
})


