import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export const comparePasswords = (plainTextPwd: string, hashedPwd: string): boolean => {
    const passwordsMatch = bcrypt.compareSync(plainTextPwd, hashedPwd);
    return passwordsMatch;
};

export const getNewHash = async (password: string): Promise<string> => {
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    return hashedPwd;
};