import "dotenv/config";
import CryptoJS from "crypto-js" ;

function encrypytAES(password): string {
    const key = process.env.AES_KEY ;
    const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
    return encryptedPassword;
}


function decryptAES(encryptedPassword): string {
    const key = process.env.AES_KEY ;
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

export { encrypytAES, decryptAES } ;