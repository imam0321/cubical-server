import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs"
import { Organization, OrganizationStatus } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import { fileUploader } from "../../config/cloudinary.config";
import { envVars } from "../../config/env";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";


const createOrganization = async (payload: Partial<Organization> & { logoFile?: Express.Multer.File }) => {
  const isUserExist = await prisma.organization.findUnique({
    where: {
      email: payload.email
    }
  })

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Organization already Exist")
  }

  let logoUrl: string = "";

  if (payload.logoFile) {
    const uploadResult = await fileUploader.uploadToCloudinary(payload.logoFile);
    logoUrl = uploadResult.secure_url
  }

  const hashedPassword = await bcrypt.hash(payload.password as string, Number(envVars.BCRYPT_SALT_ROUND))

  const slug = await generateUniqueSlug(prisma.organization, "slug", payload.name!);

  const result = await prisma.organization.create({
    data: {
      name: payload.name!,
      email: payload.email!,
      password: hashedPassword,
      logo: logoUrl,
      slug,
      status: OrganizationStatus.PENDING,
      phone: payload.phone,
      address: payload.address,
    }
  })

  const { password, ...organization } = result;
  console.log(organization)
  return organization
}

export const AuthService = {
  createOrganization
}