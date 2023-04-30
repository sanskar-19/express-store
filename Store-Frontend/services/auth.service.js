import axios from "axios";
const BASE_URL = "http://127.0.0.1:8080/api";

export async function REGISTER_NEW_USER(payload) {
  let { email, password } = payload;
  try {
    return await axios.post(
      "/register",
      { email, password },
      { baseURL: BASE_URL, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function LOGIN_USER(payload) {
  let { email, password } = payload;
  try {
    let apiResponse = await axios.post(
      "/login",
      { email, password },
      { baseURL: BASE_URL, headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("auth-token", apiResponse?.data?.data?.token);
    return apiResponse;
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function FETCH_ALL_USERS(setDataItems) {
  try {
    let apiResponse = await axios.get("/fetch_all_users", {
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
    setDataItems(apiResponse?.data?.data);
    return apiResponse;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
}
