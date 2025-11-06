// --- Retrieve Cart from localStorage ---
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// --- Save Cart to localStorage ---
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// --- Display Cart Items ---
function displayCart() {
  const cart = getCart();
  const tbody = document.querySelector("#cart-items tbody");
  const totalElem = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  tbody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
    totalElem.textContent = "0";
    cartCount.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>
        <input type="number" value="${item.qty}" min="1" onchange="updateQuantity(${index}, this.value)">
      </td>
      <td>₹${subtotal}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });

  totalElem.textContent = total;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// --- Update Item Quantity ---
function updateQuantity(index, qty) {
  const cart = getCart();
  cart[index].qty = parseInt(qty);
  saveCart(cart);
  displayCart();
}

// --- Remove Item from Cart ---
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

// --- Checkout ---
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  localStorage.removeItem("cart");
  displayCart();
}

// --- Initialize ---
document.getElementById("checkout-btn").addEventListener("click", checkout);
displayCart();
