"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMenuPrice = void 0;
const AddMenuPrice = async (req, res) => {
    /* const menus_price :any[] = req.body
 
     console.log(menus_price)
     
     try {
         await menupriceSchema.validate(menus_price);
         if(menus_price){
             const menus = await prisma.menus.findUnique({where:{ code: menus_price[menus_price.length].menu_code} })
             console.log('check->',menus)
 
             if(menus){
 
   for (let i = 0; i < menus_price.length; i++) {
                 await prisma.menu_Price.create({
                     data: {
                         size : menus_price[i].size,
                         price : Number(menus_price[i].price),
                         menu_code: menus_price[i].menu_code
                     }
                 })
                 console.log(menus_price[i].price)
             }
             return res.status(200).json({message: `Create successfully!`})
 
             }
           
         }else{
             return res.status(400).json({ message: 'Fail to create'})
         }
     }catch (error:any) {
     return res.status(400).json({ message: error.message });
     }
     */
};
exports.AddMenuPrice = AddMenuPrice;
//# sourceMappingURL=AddMenuPrice.js.map