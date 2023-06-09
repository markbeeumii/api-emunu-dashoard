
import { NextFunction, Request, Response } from 'express';

export const validatorMidleware = (schema:any) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      param: req.params,
    });

    next();
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

export default validatorMidleware;

