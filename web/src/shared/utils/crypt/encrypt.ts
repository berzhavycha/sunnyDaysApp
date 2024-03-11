import * as CryptoJS from 'crypto-js';

export const encrypt = (value: string, key: string): string => {
    return CryptoJS.AES.encrypt(value, key).toString();
}
