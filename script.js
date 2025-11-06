// --- Product Data ---
const products = [
  { id: 1, name: "Smart Watch", price: 1999, image: "Smartwatch.jpg" },
  { id: 2, name: "Wireless Earbuds", price: 1499, image: "Wireless_earbuds.jpg" },
  { id: 3, name: "Gaming Mouse", price: 799, image: "Gaming_mouse.jpg" },
  { id: 4, name: "Bluetooth Speaker", price: 999, image: "Bluetooth_speaker.jpg" },
  { id: 5, name: "Fitness Band", price: 1299, image: "Fitness_band.jpg" },
];

// --- Select Elements ---
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

// --- Local Storage Helpers ---
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// --- Display Products on Home Page ---
function displayProducts() {
  products.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// --- Add to Cart Function ---
function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((i) => i.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  window.location.href = "cart.html"; // ✅ redirect to cart page
}

// --- Update Cart Count in Navbar ---
function updateCartCount() {
  const cart = getCart();
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// --- Initialize Page ---
if (productList) displayProducts();
updateCartCount();
