// DOM Elements
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const viewCartButton = document.getElementById("view-cart");
const clearCartButton = document.getElementById("clear-cart");

// Cart Data
let cart = [];

// Fetch Products
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display Products
function displayProducts(products) {
  productList.innerHTML = products
    .map(
      (product) => `
      <div class="col">
        <div class="card h-100 product-card">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description.slice(0, 50)}...</p>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Add to Cart
function addToCart(id, title, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }
  updateCart();
}

// Update Cart
function updateCart() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="d-flex justify-content-between mb-2">
        <span>${item.title} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `
    )
    .join("");
  cartTotal.textContent = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
}

// Clear Cart
clearCartButton.addEventListener("click", () => {
  cart = [];
  updateCart();
});

// View Cart
viewCartButton.addEventListener("click", () => {
  const cartModal = new bootstrap.Modal(document.getElementById("cart-modal"));
  cartModal.show();
});

// Initialize
fetchProducts();
