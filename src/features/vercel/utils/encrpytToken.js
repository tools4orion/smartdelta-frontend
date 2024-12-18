import CryptoJS from "crypto-js";

export const encryptToken = (token, secretKey) => {
  if (token.startsWith("ENC-")) {
    console.warn("Token is already encrypted. Skipping encryption.");
    return token;
  }

  const iv = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const encrypted = CryptoJS.AES.encrypt(token, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return `ENC-${CryptoJS.enc.Hex.stringify(iv)}:${CryptoJS.enc.Base64.stringify(
    encrypted.ciphertext
  )}`;
};
