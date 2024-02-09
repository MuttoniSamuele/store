class ApiException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

async function rawRequest(path) {
  const data = await fetch(`localhost:3000${path}`);
  if (!data.ok) {
    throw new ApiException(`Error fetching ${path}`);
  }
  return await data.json();
}

export async function getProducts(category) {
  return rawRequest(category === null "/products");
}

export async function getUsers() {
  return rawRequest("/users");
}
