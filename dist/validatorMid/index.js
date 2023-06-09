"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMidleware = void 0;
const validatorMidleware = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            param: req.params,
        });
        next();
    }
    catch (error) {
        return res.status(500).json({ type: error.name, message: error.message });
    }
};
exports.validatorMidleware = validatorMidleware;
exports.default = exports.validatorMidleware;
//# sourceMappingURL=index.js.map