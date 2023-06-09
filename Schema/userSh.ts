
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
    category_Id: yup
            .array()
            .of(yup.number())
            .min(1)
            .required(),
    code: yup.string().required(),
    title_en: yup.string().required(),
    price: yup.string().test('is-price-defined', 'Please provide a valid price', function(value:any) {
      if (typeof value === 'undefined') {
        return true; 
      }
      return yup.string().required().isValidSync(value);
    }),
    thumbnail: yup.string().optional(),
    menu_price: yup
          .array()
          .of(
            yup.object().shape({
              size: yup.string().required(),
              price: yup.string().required(),
          })
        ),
    }),
});


export const menuSchemaUpdate = yup.object({
  body: yup.object({
    category_Id: yup.string().required(),
    code: yup.string().required(),
    title_en: yup.string().required(),
    price: yup.string().test('is-price-defined', 'Please provide a valid price', function(value:any) {
      if (typeof value === 'undefined') {
        return true; 
      }
      return yup.string().required().isValidSync(value);
    }),
    thumbnail: yup.string().optional(),
    menu_price: yup
          .array()
          .of(
            yup.object().shape({
              size: yup.string().required(),
              price: yup.string().required(),
          })
        ),
    }),
});


export const menupriceSchema = yup.array().of(
  yup.object().shape({
      size  : yup.string().min(1).required(),
      price : yup.string().required(),
  })
);