// export const BASE_URL = "http://localhost:5000/api/v1";
export const BASE_URL = "https://backend-eight-taupe.vercel.app";
// export const token = localStorage.getItem("token");
export let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
