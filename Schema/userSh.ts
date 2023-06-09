
import *as yup from 'yup';

export const userSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(32).required(),
    username: yup.string().optional(),
    profile_picture: yup.string().optional(),
  }),
});

export const categorySchema = yup.object({
  body: yup.object({
    slug: yup.string().required(),
    title_en: yup.string().required(),
    thumbnail: yup.string().optional(),
  }),
});

export const menuSchema = yup.object({
  body: yup.object({
    category_Id: yup.string().required(),
    code: yup.string().required(),
    title_en: yup.string().required(),
    price: yup.string().required(),
    thumbnail: yup.string().optional(),
  }),
});
