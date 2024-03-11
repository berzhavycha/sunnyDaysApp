import * as CryptoJS from 'crypto-js';

export const encrypt = (value: string, key: string): string => {
    const encryptedToken = CryptoJS.AES.encrypt(value, key).toString();
    return encryptedToken;
}
