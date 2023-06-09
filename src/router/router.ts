import { validatorMidleware } from '../../validatorMid/index';
import { AddMenus } from '../mutations/menus/AddMenus';
import { Router } from "express";
import { AddCategory } from "../mutations/categories/AddCategory";
import { GetAllCategories } from "../queries/categories/GetAllCategories";
import { multerUploads } from "../libs/multerMidleware";
import { UpdateCategory } from "../mutations/categories/UpdateCategory";
import { DeleteCategory } from "../mutations/categories/DeleteCategory";
import { GetOneCategory } from "../queries/categories/GetOneCategory";
import { GetAllMenus } from "../queries/menus/GetAllMenus";
import { GetOneMenu } from "../queries/menus/GetOneMenu";
import { UpdateMenu } from '../mutations/menus/UpdateMenu';
import { DeleteMenu } from '../mutations/menus/DeleteMenu';
import { userSignup } from '../mutations/users/userSignup';
import { userLogin } from '../mutations/users/userLogin';
import { categorySchema, menuSchema, userSchema } from '../../Schema/userSh';
import { MeQuery } from '../mutations/users/meQuery';
import { SearchMenus } from '../mutations/menus/SearchMenu';
import authMiddleware from '../Midleware';

const router = Router()

//router.use(authMiddleware)

//Users
router.post('/api/v1/user/signup',multerUploads, validatorMidleware(userSchema),userSignup)
router.post('/api/v1/user/login',multerUploads,validatorMidleware(userSchema),userLogin)
router.get('/api/v1/user/me', MeQuery)

//category 
router.post('/api/v1/category/create',multerUploads,validatorMidleware(categorySchema) ,AddCategory)
router.patch('/api/v1/category/update/:id',multerUploads ,validatorMidleware(categorySchema) , UpdateCategory)
router.delete('/api/v1/category/delete/:id', DeleteCategory)
router.get('/api/v1/categories', GetAllCategories)
router.get('/api/v1/category/:id', GetOneCategory)

//Menus
router.post('/api/v1/menu/create',multerUploads,validatorMidleware(menuSchema), AddMenus)
router.patch('/api/v1/menu/update/:id',multerUploads,validatorMidleware(menuSchema),UpdateMenu)
router.delete('/api/v1/menu/delete/:id',DeleteMenu)
router.get('/api/v1/menus', GetAllMenus)
router.get('/api/v1/menu/:id', GetOneMenu)
router.get(`/api/v1/search/menus`, SearchMenus)

export default router

