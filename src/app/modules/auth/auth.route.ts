import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createOrganizationValidation } from "./auth.validation";
import { fileUploader } from "../../config/cloudinary.config";

const router = Router();

router.post("/", fileUploader.upload.single("file"), validateRequest(createOrganizationValidation), AuthController.createOrganization);

export const AuthRoutes = router;