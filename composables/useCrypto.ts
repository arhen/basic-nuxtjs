import CryptoJS from 'crypto-js';

export function useEncrypt(value: any) {
    const config = useRuntimeConfig();
    const encryptedBase64Key = String(config.public.secretKeyCrypto) || 'SECRET_KEY_CRYPTO';
    
    const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    let encryptedData = null;

    encryptedData = CryptoJS.AES.encrypt(value.trim(), parsedBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encryptedData.toString();
}

export function useDecrypt(value: any) {
    const config = useRuntimeConfig();
    const encryptedBase64Key = String(config.public.secretKeyCrypto) || 'SECRET_KEY_CRYPTO';
    
    const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    const decryptedData = CryptoJS.AES.decrypt(value.trim(), parsedBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return decryptedData.toString(CryptoJS.enc.Utf8);
}
