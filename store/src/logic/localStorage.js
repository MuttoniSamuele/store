const CART_KEY = "cart";

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadCart() {
  return load(CART_KEY) || [];
}

export function saveCart(ids) {
  return save(CART_KEY, ids);
}
