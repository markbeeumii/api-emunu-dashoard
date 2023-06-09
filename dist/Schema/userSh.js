"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menupriceSchema = exports.menuSchemaUpdate = exports.menuSchema = exports.categorySchema = exports.userSchema = void 0;
const yup = __importStar(require("yup"));
exports.userSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(5).max(32).required(),
        username: yup.string().optional(),
        profile_picture: yup.string().optional(),
    }),
});
exports.categorySchema = yup.object({
    body: yup.object({
        slug: yup.string().required(),
        title_en: yup.string().required(),
        thumbnail: yup.string().optional(),
    }),
});
exports.menuSchema = yup.object({
    body: yup.object({
        category_Id: yup
            .array()
            .of(yup.number())
            .min(1)
            .required(),
        code: yup.string().required(),
        title_en: yup.string().required(),
        price: yup.string().test('is-price-defined', 'Please provide a valid price', function (value) {
            if (typeof value === 'undefined') {
                return true;
            }
            return yup.string().required().isValidSync(value);
        }),
        thumbnail: yup.string().optional(),
        menu_price: yup
            .array()
            .of(yup.object().shape({
            size: yup.string().required(),
            price: yup.string().required(),
        })),
    }),
});
exports.menuSchemaUpdate = yup.object({
    body: yup.object({
        category_Id: yup.string().required(),
        code: yup.string().required(),
        title_en: yup.string().required(),
        price: yup.string().test('is-price-defined', 'Please provide a valid price', function (value) {
            if (typeof value === 'undefined') {
                return true;
            }
            return yup.string().required().isValidSync(value);
        }),
        thumbnail: yup.string().optional(),
        menu_price: yup
            .array()
            .of(yup.object().shape({
            size: yup.string().required(),
            price: yup.string().required(),
        })),
    }),
});
exports.menupriceSchema = yup.array().of(yup.object().shape({
    size: yup.string().min(1).required(),
    price: yup.string().required(),
}));
//# sourceMappingURL=userSh.js.map