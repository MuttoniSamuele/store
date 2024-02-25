const API_URL = "http://localhost:3000";

class ApiException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

async function rawRequest(path) {
  const data = await fetch(`${API_URL}${path}`);
  if (!data.ok) {
    throw new ApiException(`Error fetching ${path}`);
  }
  return await data.json();
}

export async function getProducts(category = null) {
  return rawRequest(category === null ? "/products" : `/products/${category}`);
}

export async function getUsers() {
  return rawRequest("/users");
}

export async function getEmployees() {
  return rawRequest("/employees");
}

export async function login(email, password) {
  return await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
}

export async function register(
  customerName, contactLastName, contactFirstName,
  phone, addressLine1, addressLine2, city, state,
  postalCode, country, salesRepEmployeeNumber,
  creditLimit, email, pwd
) {
  return await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerName, contactLastName, contactFirstName,
      phone, addressLine1, addressLine2, city, state,
      postalCode, country, salesRepEmployeeNumber,
      creditLimit, email, pwd
    }),
  });
}

export async function buyProducts(productCodes) {
  return await fetch(`${API_URL}/buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productCodes })
  });
}
