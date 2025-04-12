const BASE_URL = "https://fakestoreapi.com";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products in ${category}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};