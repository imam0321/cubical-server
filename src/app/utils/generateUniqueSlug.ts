/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";


export const generateSlug = (name: string) => {
  return name
    .toLocaleLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

// Generate a random 6-character alphanumeric string
const randomString = () => {
  return crypto.randomBytes(3).toString("hex");
};

export const generateUniqueSlug = async (model: any, field: string, name: string): Promise<string> => {
  const baseSlug = generateSlug(name);

  // Check if base slug already exists
  const existingSlug = await model.findFirst({
    where: {
      [field]: baseSlug
    },
    select: {
      [field]: true
    }
  })

  if (!existingSlug) {
    return baseSlug;
  }

  // Conflict exists, append random 6-character string
  const slugWithRandom = `${baseSlug}-${randomString()}`;

  // Check again to ensure absolute uniqueness
  const conflict = await model.findFirst({
    where: { [field]: slugWithRandom },
    select: { [field]: true }
  })

  if (!conflict) return slugWithRandom

  return generateUniqueSlug(model, field, name);
}
