"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMenus = void 0;
const prismaClient_1 = __importDefault(require("../../libs/prismaClient"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const AddMenus = async (req, res) => {
    var _a;
    const { code, title_en, title_ch, title_kh, thumbnail, description, price, category_Id, menu_price, } = req.body;
    try {
        //if(!thumbnail) 
        const id = await prismaClient_1.default.menus.findUnique({ where: { code: code } });
        if (id) {
            return res.status(502).json({ message: "Code is valide" });
        }
        else {
            let result;
            if (req.file && req.file.mimetype) {
                result = await cloudinary_1.default.v2.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, {
                    folder: "menu-source",
                    public_id: req.file.originalname.split(".")[0],
                });
            }
            else {
                return res.status(412).json({ message: 'Please select image.' });
            }
            const product = await prismaClient_1.default.menus.create({
                data: {
                    code,
                    title_en,
                    title_ch,
                    title_kh,
                    thumbnail: result === null || result === void 0 ? void 0 : result.secure_url,
                    description,
                    price: Number(price),
                    category_Id: Number(category_Id[0]),
                },
            });
            //console.log(menu_price,menu_price?.length)
            const multiple_categories = category_Id === null || category_Id === void 0 ? void 0 : category_Id.map(async (p) => {
                await prismaClient_1.default.menu_Categories.create({
                    data: {
                        menu_id: Number(product.id),
                        category_id: Number(p)
                    }
                });
            });
            //if(product){
            //Multiple Categories
            // if(multiple_categories){
            //   return res.status(200).json({ message: `Successfully` });
            // }
            // return res.status(500).json({ message: "Fail to create menu" });
            //}
            if (product && price && multiple_categories) {
                return res.status(200).json({ message: `Successfully` });
            }
            else if (product && multiple_categories) {
                if (menu_price.length > 0) {
                    //Debugging
                    //console.log(menu_price[0].menu_code)
                    const check = await prismaClient_1.default.menus.findUnique({
                        where: {
                            code: String((_a = menu_price[0]) === null || _a === void 0 ? void 0 : _a.menu_code),
                        },
                    });
                    //Debugging
                    //console.log(check)
                    if (check) {
                        for (let i = 0; i < menu_price.length; i++) {
                            await prismaClient_1.default.menu_Price.create({
                                data: {
                                    size: menu_price[i].size,
                                    price: Number(menu_price[i].price),
                                    menu_code: String(check === null || check === void 0 ? void 0 : check.code),
                                },
                            });
                        }
                    }
                    return res.status(200).json({ message: `Successfully` });
                }
                else if (price) {
                    return res.status(200).json({ message: `Successfully` });
                }
                else {
                    return res.status(500).json({ message: "Fail to create menu" });
                }
            }
            else {
                return res.status(500).json({ message: "Fail to create menu" });
            }
        }
    }
    catch (error) {
        return new Error(error);
    }
    finally {
        return prismaClient_1.default.$disconnect();
    }
};
exports.AddMenus = AddMenus;
/*
export const AddMenus = async (req: any, res: Response) => {
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
  } = req.body;
  try {
    //if(!thumbnail)
    const id = await prisma.menus.findUnique({ where: { code: code } });
    if (id) {
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
      }else{
        return res.status(412).json({message:'Please select image.'})
      }
      console.log(category_Id)
      const product = await prisma.menus.create({
        data: {
          code,
          title_en,
          title_ch,
          title_kh,
          thumbnail: result?.secure_url,
          description,
          price: Number(price),
          category_Id: Number(category_Id[0]),
        },
      });

      if (product && price){
        return res.status(200).json({ message: `Successfully` });
      }else if (product) {
        if (menu_price.length > 0) {
          const check =  await prisma.menus.findUnique({
            where: {
              code: String(menu_price[0]?.menu_code),
            },
          });
          
          if (check) {
            for (let i = 0; i < menu_price.length; i++) {
              await prisma.menu_Price.create({
                data: {
                  size: menu_price[i].size,
                  price: Number(menu_price[i].price),
                  menu_code: String(check?.code),
                },
              });
            }
          }
          return res.status(200).json({ message: `Successfully` });
        } else if (price) {
          return res.status(200).json({ message: `Successfully` });
        } else {
          return res.status(500).json({ message: "Fail to create menu" });
        }
      } else {
        return res.status(500).json({ message: "Fail to create menu" });
      }
    }
  } catch (error) {
    return new Error(error);
  }
};


*/ 
//# sourceMappingURL=AddMenus.js.map