import bcrypt from 'bcrypt';
import { saltRounds } from '../util/constants';

export const comparePasswords = (plainTextPwd: string, hashedPwd: string): boolean => {
    return bcrypt.compareSync(plainTextPwd, hashedPwd);
};

export const getNewHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};