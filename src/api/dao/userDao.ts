import { PrismaClient, Role } from "@prisma/client";


const prisma = new PrismaClient();

export const findUserByEmail = async ( email: string) => {
    return prisma.user.findUnique({
        where: { email},
    })
}

export const createUser = async (email: string, hashedPassword: string) => {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });
  };

  export const createUserWithRole = async (email: string, hashedPassword: string, role: string) => {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role as any, // safe because Prisma checks ENUM in DB
      },
    });
  };