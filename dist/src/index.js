"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router_1 = __importDefault(require("./router/router"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 1444;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
cloudinary_1.default.v2.config({
    cloud_name: process.env.STORAGE_NAME,
    api_key: process.env.STORAGE_API_KEY,
    api_secret: process.env.STORAGE_API_SECRET,
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.default);
app.get('/', (req, res) => {
    return res.send(`<h1>Hello API By Mark</h1>`);
});
app.use(async (req, res) => {
    const error = new Error(`Sorry Not Found`);
    return res.status(404).send(` ${error}`);
});
app.listen(port, () => {
    return console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map