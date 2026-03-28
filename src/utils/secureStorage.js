import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  },
  getItem: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decrypted;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
};
