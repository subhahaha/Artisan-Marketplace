// Falls back to localhost for local development. Once deployed, set
// VITE_API_URL in your hosting provider's environment variables to point
// at the deployed backend instead.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchBaseProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return handleResponse(res);
}

export async function fetchSellerProducts() {
  const res = await fetch(`${BASE_URL}/sellerProducts`);
  return handleResponse(res);
}

export async function createSellerProduct(product) {
  const res = await fetch(`${BASE_URL}/sellerProducts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
}

export async function updateSellerProduct(id, product) {
  const res = await fetch(`${BASE_URL}/sellerProducts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
}

export async function deleteSellerProduct(id) {
  const res = await fetch(`${BASE_URL}/sellerProducts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
}