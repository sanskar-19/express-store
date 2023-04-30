import axios from "axios";
const BASE_URL = "http://127.0.0.1:8080/api";

export async function ADD_NEW_PRODUCT(payload) {
  try {
    let apiResponse = await axios.post("/product", payload, {
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
    return apiResponse;
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function ADD_NEW_CATEGORY(payload) {
  try {
    let apiResponse = await axios.post("/category", payload, {
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
    return apiResponse;
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function ADD_TO_CART(id) {
  try {
    let apiResponse = await axios.post(
      "/add_to_cart",
      { product_id: [id] },
      {
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      }
    );
    return apiResponse;
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function FETCH_ALL_CATEGORIES(setDataItems) {
  try {
    let apiResponse = await axios.get("/fetch_all_categories", {
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
    setDataItems(apiResponse?.data?.data);
    return apiResponse;
  } catch (error) {
    throw error?.response?.data;
  }
}

export async function FETCH_ALL_PRODUCTS(setDataItems) {
  try {
    let apiResponse = await axios.get("/fetch_all_products", {
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

export async function FETCH_CART_ITEMS(setDataItems) {
  try {
    let apiResponse = await axios.get("/fetch_cart_items", {
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

export async function CREATE_ORDER(payload) {
  try {
    let apiResponse = await axios.post(
      "/create-order",
      { email: payload.email, address: payload.address },
      {
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      }
    );
    return apiResponse;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
}
