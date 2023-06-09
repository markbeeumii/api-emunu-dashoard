"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetAllCategories_1 = require("../queries/categories/GetAllCategories");
const DeleteCategory_1 = require("../mutations/categories/DeleteCategory");
const GetOneCategory_1 = require("../queries/categories/GetOneCategory");
const GetAllMenus_1 = require("../queries/menus/GetAllMenus");
const GetOneMenu_1 = require("../queries/menus/GetOneMenu");
const DeleteMenu_1 = require("../mutations/menus/DeleteMenu");
//import { categorySchema, menuSchema, userSchema } from '../../Schema/userSh';
const meQuery_1 = require("../mutations/users/meQuery");
const SearchMenu_1 = require("../mutations/menus/SearchMenu");
const router = (0, express_1.Router)();
//router.use(authMiddleware)
//Users
//router.post('/api/v1/user/signup',multerUploads, validatorMidleware(userSchema),userSignup)
//router.post('/api/v1/user/login',multerUploads,validatorMidleware(userSchema),userLogin)
router.get('/api/v1/user/me', meQuery_1.MeQuery);
//category 
//router.post('/api/v1/category/create',multerUploads,validatorMidleware(categorySchema) ,AddCategory)
//router.patch('/api/v1/category/update/:id',multerUploads ,validatorMidleware(categorySchema) , UpdateCategory)
router.delete('/api/v1/category/delete/:id', DeleteCategory_1.DeleteCategory);
router.get('/api/v1/categories', GetAllCategories_1.GetAllCategories);
router.get('/api/v1/category/:id', GetOneCategory_1.GetOneCategory);
//Menus
//router.post('/api/v1/menu/create',multerUploads,validatorMidleware(menuSchema), AddMenus)
//router.patch('/api/v1/menu/update/:id',multerUploads,validatorMidleware(menuSchema),UpdateMenu)
router.delete('/api/v1/menu/delete/:id', DeleteMenu_1.DeleteMenu);
router.get('/api/v1/menus', GetAllMenus_1.GetAllMenus);
router.get('/api/v1/menu/:id', GetOneMenu_1.GetOneMenu);
router.get(`/api/v1/search/menus`, SearchMenu_1.SearchMenus);
exports.default = router;
//# sourceMappingURL=router.js.map