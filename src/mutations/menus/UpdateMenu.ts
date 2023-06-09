import { Menus } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../libs/prismaClient";
import cloudinary from "cloudinary";

export const UpdateMenu = async (req: any, res: Response) => {
  const {
    code,
    title_en,
    title_ch,
    title_kh,
    thumbnail,
    description,
    price,
    category_Id,
    menu_price,
    isDelete,
  } = req.body;
  const id = req.params.id;
  

  const isValidCode = await prisma.menus.findUnique({ where: { code: code } });
  const isCurrentCode = await prisma.menus.findUnique({
    where: { id: Number(id) },
  });

  if (isValidCode?.code !== isCurrentCode.code) {
    return res.status(502).json({ message: "Code is valide" });
  } else {
    let result;
    if (req.file && req.file.mimetype) {
      result = await cloudinary.v2.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "menu-source",
          public_id: req.file.originalname.split(".")[0],
        }
      );
    }

    if (result) {
     
    try{
      const product = await prisma.menus.update({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          thumbnail: result.secure_url,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
        where: { id: Number(id) },
      });

      if (product) {
      //Multiple categories on menus
     
      const multiple_categories = category_Id?.map( async (e:any)=>{ 
        await prisma.menu_Categories.updateMany({
          where:{
            menu_id: Number(product.id)
          },
          data:{
            category_id: Number(e)
          }
        })
      })
      console.log(multiple_categories)
      if(!multiple_categories) return res.status(500).json({ message: `Fail to update menu ${product.title_en}` });
      
      // 

      //Multiple prices on menus
        if (menu_price?.length > 0) {
          const check = await await prisma.menus.findUnique({
            where: {
              code:
                menu_price[menu_price.length - 1]?.menu_code === "" ||
                !menu_price[menu_price.length - 1].menu_code
                  ? menu_price[0].menu_code
                  : menu_price[menu_price.length - 1].menu_code,
            },
          });

          const vvss = await await prisma.menu_Price.findMany({
            where: { menu_code: check.code },
          });

          if (vvss.length === 0) {
            for (let i = 0; i < menu_price.length; i++) {
              await await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: menu_price[i].price,
                  menu_code: check.code,
                },
              });
            }
          } else {
            // console.log(menu_price)
            // console.log(vvss)

            // if(isDelete.length>=1){
            //   for(let i=1; i< isDelete.length; i++){

            //     // if(isDelete[i]?.isDelete && isDelete[i].menu_code){
            //     //   await (await prisma.menu_Price.deleteMany({where: {menu_code: isDelete[i].menu_code,size: isDelete[i].size}}))
            //     // }

            //     // if(vvss[i].size===isDelete[i].size && vvss[i].menu_code=== isDelete[i].menu_code){
            //     //   if(isDelete[i].isDelete===true && isDelete[i].menu_code){
            //     //     console.log('Right')//await (await prisma.menu_Price.delete({where: {id: Number(vvss[i].id) }}))
            //     //   }
            //     //   //console.log('Right')
            //     // }
            //     //console.log(i)

            //   }
            // }

            for (let i = 0; i < menu_price.length; i++) {
              if (
                menu_price[i].menu_code === vvss[i]?.menu_code &&
                menu_price[i].menu_code
              ) {
                await await prisma.menu_Price.update({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                  where: { id: Number(vvss[i]?.id) },
                });
              } else {
                await await prisma.menu_Price.create({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                });
              }
            }
          }
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to update menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to update menu" });
      }
    }catch(error){
      return new Error(error)
    }
/* Season 22222  */
    } else {
     try{
      const product = await prisma.menus.update({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
        where: { id: Number(id) },
      });

      if (product) {
         //Multiple categories on menus
        const cat_id = await prisma.menu_Categories.findMany({
          where:{
            menu_id: Number(product.id)
          },
          select:{
            id:true
          }
        })

      if(category_Id?.length===cat_id.length){
        category_Id?.map(async(m:any,i:number)=>{
          await prisma.menu_Categories.update({
            where:{
              id: cat_id[i].id
            },
            data:{
              category_id: Number(m)
            }
          })
        })
      }else{
        const checkcategories = await prisma.menu_Categories.deleteMany({
          where: {
            menu_id: Number(product.id)
          }
        })
        if(!checkcategories) return res.status(500).json({ message: "Fail to update menu" });
        category_Id?.map(async(s:any)=>{
          await prisma.menu_Categories.create({
            data:{
              category_id: Number(s),
              menu_id: Number(product.id)
            }
          })
        })
      }
     
      //console.log(arrID_Categories)
      // const multiple_categories = category_Id?.map( async (e:any)=>{ 
      //   await prisma.menu_Categories.update({
      //     where:{
      //       menu_id:1
      //     },
      //     data:{
      //       category_id:Number(e)
      //     }
      //   })
      // })
      // console.log(await multiple_categories)
      // if(!multiple_categories) return res.status(500).json({ message: `Fail to update menu ${product.title_en}` });
      
      //Multiple price with menus
        if (menu_price?.length > 0) {
          const check = await await prisma.menus.findUnique({
            where: {
              code:
                menu_price[menu_price.length - 1]?.menu_code === "" ||
                !menu_price[menu_price.length - 1].menu_code
                  ? menu_price[0].menu_code
                  : menu_price[menu_price.length - 1].menu_code,
            },
          });

          const vvss = await await prisma.menu_Price.findMany({
            where: { menu_code: check.code },
          });

          if (vvss.length === 0) {
            for (let i = 0; i < menu_price.length; i++) {
              await await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: menu_price[i].price,
                  menu_code: check.code,
                },
              });
            }
          } else {
            // console.log(menu_price)
            // console.log(vvss)

            // if(isDelete.length>=1){
            //   for(let i=1; i< isDelete.length; i++){

            //     // if(isDelete[i].isDelete && isDelete[i].menu_code){
            //     //   await (await prisma.menu_Price.deleteMany({where: {menu_code: isDelete[i].menu_code,size: isDelete[i].size}}))
            //     // }

            //     // if(vvss[i].size===isDelete[i].size && vvss[i].menu_code=== isDelete[i].menu_code){
            //     //   if(isDelete[i].isDelete===true && isDelete[i].menu_code){
            //     //     console.log('Right')//await (await prisma.menu_Price.delete({where: {id: Number(vvss[i].id) }}))
            //     //   }
            //     //   //console.log('Right')
            //     // }
            //     //console.log(i)

            //   }
            // }

            for (let i = 0; i < menu_price.length; i++) {
              if (
                menu_price[i].menu_code === vvss[i]?.menu_code &&
                menu_price[i].menu_code
              ) {
                await await prisma.menu_Price.update({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                  where: { id: Number(vvss[i]?.id) },
                });
              } else {
                await await prisma.menu_Price.create({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                });
              }
            }
          }
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to create menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to update menu" });
      }
    }catch(error){
      return new Error(error)
    } finally{
      await prisma.$disconnect();
    }
    }
  }
};



/*

export const UpdateMenu = async (req: any, res: Response) => {
  const {
    code,
    title_en,
    title_ch,
    title_kh,
    thumbnail,
    description,
    price,
    category_Id,
    menu_price,
    isDelete,
  } = req.body;
  const id = req.params.id;

  const isValidCode = await prisma.menus.findUnique({ where: { code: code } });
  const isCurrentCode = await prisma.menus.findUnique({
    where: { id: Number(id) },
  });

  if (isValidCode?.code !== isCurrentCode.code) {
    return res.status(502).json({ message: "Code is valide" });
  } else {
    let result;
    if (req.file && req.file.mimetype) {
      result = await cloudinary.v2.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "menu-source",
          public_id: req.file.originalname.split(".")[0],
        }
      );
    }

    if (result) {
     
    try{
      const product = await prisma.menus.update({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          thumbnail: result.secure_url,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
        where: { id: Number(id) },
      });

      if (product) {
      //Multiple categories on menus
        

      //Multiple prices on menus
        if (menu_price?.length > 0) {
          const check = await await prisma.menus.findUnique({
            where: {
              code:
                menu_price[menu_price.length - 1]?.menu_code === "" ||
                !menu_price[menu_price.length - 1].menu_code
                  ? menu_price[0].menu_code
                  : menu_price[menu_price.length - 1].menu_code,
            },
          });

          const vvss = await await prisma.menu_Price.findMany({
            where: { menu_code: check.code },
          });

          if (vvss.length === 0) {
            for (let i = 0; i < menu_price.length; i++) {
              await await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: menu_price[i].price,
                  menu_code: check.code,
                },
              });
            }
          } else {
            // console.log(menu_price)
            // console.log(vvss)

            // if(isDelete.length>=1){
            //   for(let i=1; i< isDelete.length; i++){

            //     // if(isDelete[i]?.isDelete && isDelete[i].menu_code){
            //     //   await (await prisma.menu_Price.deleteMany({where: {menu_code: isDelete[i].menu_code,size: isDelete[i].size}}))
            //     // }

            //     // if(vvss[i].size===isDelete[i].size && vvss[i].menu_code=== isDelete[i].menu_code){
            //     //   if(isDelete[i].isDelete===true && isDelete[i].menu_code){
            //     //     console.log('Right')//await (await prisma.menu_Price.delete({where: {id: Number(vvss[i].id) }}))
            //     //   }
            //     //   //console.log('Right')
            //     // }
            //     //console.log(i)

            //   }
            // }

            for (let i = 0; i < menu_price.length; i++) {
              if (
                menu_price[i].menu_code === vvss[i]?.menu_code &&
                menu_price[i].menu_code
              ) {
                await await prisma.menu_Price.update({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                  where: { id: Number(vvss[i]?.id) },
                });
              } else {
                await await prisma.menu_Price.create({
                  data: {
                    size: menu_price[i].size,
                    price: menu_price[i].price,
                    menu_code: check.code,
                  },
                });
              }
            }
          }
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to create menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to update menu" });
      }
    }catch(error){
      return new Error(error)
    }
/// Season 22222  
} else {
  try{
   const product = await prisma.menus.update({
     data: {
       code,
       title_en,
       title_ch,
       title_kh,
       description,
       price: Number(price),
       category_Id: Number(category_Id),
     },
     where: { id: Number(id) },
   });

   if (product) {
     if (menu_price?.length > 0) {
       const check = await await prisma.menus.findUnique({
         where: {
           code:
             menu_price[menu_price.length - 1]?.menu_code === "" ||
             !menu_price[menu_price.length - 1].menu_code
               ? menu_price[0].menu_code
               : menu_price[menu_price.length - 1].menu_code,
         },
       });

       const vvss = await await prisma.menu_Price.findMany({
         where: { menu_code: check.code },
       });

       if (vvss.length === 0) {
         for (let i = 0; i < menu_price.length; i++) {
           await await prisma.menu_Price.create({
             data: {
               size: menu_price[i].size,
               price: menu_price[i].price,
               menu_code: check.code,
             },
           });
         }
       } else {
         // console.log(menu_price)
         // console.log(vvss)

         // if(isDelete.length>=1){
         //   for(let i=1; i< isDelete.length; i++){

         //     // if(isDelete[i].isDelete && isDelete[i].menu_code){
         //     //   await (await prisma.menu_Price.deleteMany({where: {menu_code: isDelete[i].menu_code,size: isDelete[i].size}}))
         //     // }

         //     // if(vvss[i].size===isDelete[i].size && vvss[i].menu_code=== isDelete[i].menu_code){
         //     //   if(isDelete[i].isDelete===true && isDelete[i].menu_code){
         //     //     console.log('Right')//await (await prisma.menu_Price.delete({where: {id: Number(vvss[i].id) }}))
         //     //   }
         //     //   //console.log('Right')
         //     // }
         //     //console.log(i)

         //   }
         // }

         for (let i = 0; i < menu_price.length; i++) {
           if (
             menu_price[i].menu_code === vvss[i]?.menu_code &&
             menu_price[i].menu_code
           ) {
             await await prisma.menu_Price.update({
               data: {
                 size: menu_price[i].size,
                 price: menu_price[i].price,
                 menu_code: check.code,
               },
               where: { id: Number(vvss[i]?.id) },
             });
           } else {
             await await prisma.menu_Price.create({
               data: {
                 size: menu_price[i].size,
                 price: menu_price[i].price,
                 menu_code: check.code,
               },
             });
           }
         }
       }
       return res.status(200).json({ message: `Successfully` });
     } else if (price) {
       return res.status(200).json({ message: `Successfully` });
     } else {
       return res.status(500).json({ message: "Fail to create menu" });
     }
   } else {
     return res.status(500).json({ message: "Fail to update menu" });
   }
 }catch(error){
   return new Error(error)
 }
 }
}
};


*/