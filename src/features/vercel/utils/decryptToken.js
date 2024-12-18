import CryptoJS from "crypto-js";

export const decryptToken = (encryptedToken, secretKey) => {
  if (!encryptedToken.startsWith("ENC-")) {
    throw new Error("Token is not encrypted or has an invalid format.");
  }

  const tokenWithoutMarker = encryptedToken.slice(4);

  const [ivHex, ciphertextBase64] = tokenWithoutMarker.split(":");
  if (!ivHex || !ciphertextBase64) {
    throw new Error("Invalid token format. Expected IV:Ciphertext.");
  }

  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const ciphertext = CryptoJS.enc.Base64.parse(ciphertextBase64);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedToken = decrypted.toString(CryptoJS.enc.Utf8);

  if (!decryptedToken) {
    throw new Error(
      "Decryption failed. Ensure the secret key and token are correct."
    );
  }

  console.log("Decrypted token:", decryptedToken);
  return decryptedToken;
};
