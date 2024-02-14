class ApiException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

async function rawRequest(path) {
  const data = await fetch(`http://localhost:3000${path}`);
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
