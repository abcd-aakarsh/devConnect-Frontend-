export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:8080/api/v1"
    : ` https://devconnect-q903.onrender.com/api/v1`;
