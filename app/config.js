export const BASE_URL = "https://backend-med-app.onrender.com/api/v1";
// export const BASE_URL = "https://backend-eight-taupe.vercel.app/api/v1";
// export const token = localStorage.getItem("token");
export let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
