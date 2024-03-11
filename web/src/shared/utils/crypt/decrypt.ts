import * as CryptoJS from 'crypto-js';

export const decrypt = (hash: string, key: string): string => {
    const decryptedBytes = CryptoJS.AES.decrypt(hash, key);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
}