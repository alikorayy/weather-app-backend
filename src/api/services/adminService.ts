import bcrypt from "bcryptjs";
import { findUserByEmail, createUserWithRole } from "../dao/userDao";
import appConstants from "../../constants/appConstants";

export const createUserByAdmin = async (email: string, password: string, role: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error(appConstants.ERRORS.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUserWithRole(email, hashedPassword, role);

    return {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
    }
}