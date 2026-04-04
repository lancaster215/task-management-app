import { scryptSync, timingSafeEqual } from 'crypto';

export const verifyPassword = (password: string, storedHash: string) => {
    const [salt, key] = storedHash.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');

    // timingSafeEqual prevents timing attacks
    return timingSafeEqual(hashedBuffer, keyBuffer);
};