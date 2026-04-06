import { scryptSync, randomBytes } from 'crypto';

export const hashPassword = (password: string) => {
    const salt = randomBytes(16).toString('hex');
    const hashedBuffer = scryptSync(password, salt, 64);
    return `${salt}:${hashedBuffer.toString('hex')}`;
};