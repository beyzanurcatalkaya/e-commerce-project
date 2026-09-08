import axios from "axios";

// Artık eğitim kurumunun sahte API'sine değil, kendi yazdığımız Spring Boot
// backend'ine bağlanıyoruz. .env dosyanda VITE_API_BASE_URL tanımlı değilse
// yerelde çalışan backend'e (http://localhost:8080) düşer.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export default api;