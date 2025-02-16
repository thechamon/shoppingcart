// Sample product data (can be replaced with a fetch from a JSON file or API)
const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is product 1.",
      price: 10,
      image: "img/dummy4.jpg"
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is product 2.",
      price: 20,
      image: "img/dummy4.jpg"
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3.",
      price: 30,
      image: "img/dummy4.jpg"
    }
  ];
  
  // Cart state
  let cart = [];
  
  // DOM Elements
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const clearCartButton = document.getElementById("clear-cart");
  
  // Render products
  function renderProducts() {
    productList.innerHTML = products.map(product => `
      <div class="col-md-6">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join("");
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    renderCart();
  }
  
  // Render cart
  function renderCart() {
    cartItems.innerHTML = cart.map(item => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} ($${item.price})
        <div>
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="btn btn-sm btn-secondary">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="btn btn-sm btn-secondary">+</button>
        </div>
      </li>
    `).join("");
  
    updateTotalPrice();
  }
  
  // Update quantity
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const cartItem = cart.find(item => item.id === productId);
      cartItem.quantity = newQuantity;
    }
  
    renderCart();
  }
  
  // Update total price
  function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPrice.textContent = total.toFixed(2);
  }
  
  // Clear cart
  clearCartButton.addEventListener("click", () => {
    cart = [];
    renderCart();
  });
  
  // Initialize
  renderProducts();