// 4. src/utils/passwordUtils.ts
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  inputPassword: string, 
  storedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPassword);
};