"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../validatorMid/index");
const AddMenus_1 = require("../mutations/menus/AddMenus");
const express_1 = require("express");
const AddCategory_1 = require("../mutations/categories/AddCategory");
const GetAllCategories_1 = require("../queries/categories/GetAllCategories");
const multerMidleware_1 = require("../libs/multerMidleware");
const UpdateCategory_1 = require("../mutations/categories/UpdateCategory");
const DeleteCategory_1 = require("../mutations/categories/DeleteCategory");
const GetOneCategory_1 = require("../queries/categories/GetOneCategory");
const GetAllMenus_1 = require("../queries/menus/GetAllMenus");
const GetOneMenu_1 = require("../queries/menus/GetOneMenu");
const UpdateMenu_1 = require("../mutations/menus/UpdateMenu");
const DeleteMenu_1 = require("../mutations/menus/DeleteMenu");
const userSignup_1 = require("../mutations/users/userSignup");
const userLogin_1 = require("../mutations/users/userLogin");
const userSh_1 = require("../../Schema/userSh");
const meQuery_1 = require("../mutations/users/meQuery");
const SearchMenu_1 = require("../mutations/menus/SearchMenu");
const DeleteMenuPrice_1 = require("../mutations/menu_price/DeleteMenuPrice");
//import authMiddleware from '../Midleware';
//import { AddMenuPrice } from '../mutations/menu_price/AddMenuPrice';
const router = (0, express_1.Router)();
//router.use(authMiddleware)
//Users
router.post('/api/v1/user/signup', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.userSchema), userSignup_1.userSignup);
router.post('/api/v1/user/login', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.userSchema), userLogin_1.userLogin);
router.get('/api/v1/user/me', meQuery_1.MeQuery);
//category 
router.post('/api/v1/category/create', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.categorySchema), AddCategory_1.AddCategory);
router.patch('/api/v1/category/update/:id', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.categorySchema), UpdateCategory_1.UpdateCategory);
router.delete('/api/v1/category/delete/:id', DeleteCategory_1.DeleteCategory);
router.get('/api/v1/categories', GetAllCategories_1.GetAllCategories);
router.get('/api/v1/category/:id', GetOneCategory_1.GetOneCategory);
//Menus
router.post('/api/v1/menu/create', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.menuSchema), AddMenus_1.AddMenus);
router.patch('/api/v1/menu/update/:id', multerMidleware_1.multerUploads, (0, index_1.validatorMidleware)(userSh_1.menuSchema), UpdateMenu_1.UpdateMenu);
router.delete('/api/v1/menu/delete/:id', DeleteMenu_1.DeleteMenu);
router.get('/api/v1/menus', GetAllMenus_1.GetAllMenusByPage);
router.get('/api/v1/menus/list', GetAllMenus_1.AllMenus);
router.get('/api/v1/menu/:id', GetOneMenu_1.GetOneMenu);
router.get(`/api/v1/search/menus`, SearchMenu_1.SearchMenus);
//Menu Price 
//router.post('/api/v1/menuprice/create',AddMenuPrice)
router.delete('/api/v1/menuprice/delete/:id', DeleteMenuPrice_1.DeleteMenuPrice);
exports.default = router;
//# sourceMappingURL=router.js.map