import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../dao/userDao";
import appConstants from "../../constants/appConstants";
import { generateToken } from "../../utils/jwtGenerator";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error(appConstants.ERRORS.USER_ALREADY_EXISTS);
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser(email, hashedPassword);

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error(appConstants.ERRORS.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error(appConstants.ERRORS.INVALID_CREDENTIALS);
    }
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role

        }
    }
}