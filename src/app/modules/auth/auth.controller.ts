/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";

const createOrganization = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    ...req.body,
    logoFile: req.file as Express.Multer.File
  }
  
  const result = await AuthService.createOrganization(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Create Organization Successfully",
    data: result,
  });
})

export const AuthController = {
  createOrganization
}