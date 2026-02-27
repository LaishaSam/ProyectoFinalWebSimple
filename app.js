// ==== Datos simulados para API ====
const PRODUCTS = [
  { id: 1, name: "Blusa basica de mujer", description: "Algodon 100%, varios colores.", price: 199.00, image: "blusa.jpg" },
  { id: 2, name: "Bolsa TH", description: "Azul oscuro, mediana.", price: 499.00, image: "bolsa.jpg" },
  { id: 3, name: "Botas vaqueras", description: "Ideales para bailar", price: 899.00, image: "botas.jpg" },
  { id: 4, name: "Chamarra de mezclilla", description: "Color azul, unisex.", price: 399.00, image: "chamarra.jpg" }
];
// ===== Seleccion de elementos =====
const verProductosBtn = document.getElementById("ver-productos-btn");
const productsGrid = document.getElementById("products-grid");
const cartItemsDiv = document.getElementById("cart-items");
const cartEmptyText = document.getElementById("cart-empty");
const cartTotalText = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");
// Auth
const authTitle = document.getElementById("auth-title");
const authForm = document.getElementById("auth-form");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authToggleBtn = document.getElementById("toggle-auth");
const authMessage = document.getElementById("auth-message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const welcomeSection = document.getElementById("bienvenida");
const userNameSpan = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
let isLoginMode = true;
// ===== Simulacion nube con localStorage =====
function getUsers() { return JSON.parse(localStorage.getItem("users") || "[]"); }
function saveUsers(users) { localStorage.setItem("users", JSON.stringify(users)); }
function setCurrentUser(email) { localStorage.setItem("currentUser", email); }
function getCurrentUser() { return localStorage.getItem("currentUser"); }
function clearCurrentUser() { localStorage.removeItem("currentUser"); }
function getCart() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem(`cart_${currentUser}`) || "[]");
}
function saveCart(cart) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cart));
}
// ===== Autenticacion =====
authToggleBtn.addEventListener("click", () => {
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    authTitle.textContent = "Iniciar sesion";
    authSubmitBtn.textContent = "Iniciar sesion";
    authToggleBtn.textContent = "Registrate";
    authMessage.textContent = "";
  } else {
    authTitle.textContent = "Crear cuenta";
    authSubmitBtn.textContent = "Registrarme";
    authToggleBtn.textContent = "Inicia sesion";
    authMessage.textContent = "";
  }
});
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) {
    authMessage.textContent = "Completa todos los campos.";
    authMessage.style.color = "red";
    return;
  }
  const users = getUsers();
  if (isLoginMode) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(email);
      showWelcome(email);
      authMessage.textContent = "Sesion iniciada correctamente.";
      authMessage.style.color = "green";
      authForm.reset();
      renderCart();
    } else {
      authMessage.textContent = "Usuario o contrasena incorrectos.";
      authMessage.style.color = "red";
    }
  } else {
    const exists = users.some(u => u.email === email);
    if (exists) {
      authMessage.textContent = "Ese correo ya esta registrado.";
      authMessage.style.color = "red";
      return;
    }
    users.push({ email, password });
    saveUsers(users);
    authMessage.textContent = "Cuenta creada. Ahora inicia sesion.";
    authMessage.style.color = "green";
    isLoginMode = true;
    authTitle.textContent = "Iniciar sesion";
    authSubmitBtn.textContent = "Iniciar sesion";
    authToggleBtn.textContent = "Registrate";
    authForm.reset();
  }
});
logoutBtn.addEventListener("click", () => {
  clearCurrentUser();
  welcomeSection.style.display = "none";
  renderCart();
});
function showWelcome(email) {
  if (email) {
    welcomeSection.style.display = "block";
    userNameSpan.textContent = email;
  } else {
    welcomeSection.style.display = "none";
  }
}
// ===== Productos - simulacion API con delay =====
function loadProducts() {
  productsGrid.innerHTML = "";
  setTimeout(() => {
    PRODUCTS.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)} MXN</p>
        <button data-id="${product.id}">Agregar al carrito</button>
      `;
      productsGrid.appendChild(card);
    });
  }, 400);
}
verProductosBtn.addEventListener("click", () => {
  document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
});
productsGrid.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});
// ===== Carrito =====
function addToCart(productId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("Por favor inicia sesion para agregar al carrito.");
    return;
  }
  const product = PRODUCTS.find(p => p.id === productId);
  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) { existing.quantity += 1; }
  else { cart.push({ ...product, quantity: 1 }); }
  saveCart(cart);
  renderCart();
}
function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}
function clearCart() { saveCart([]); renderCart(); }
clearCartBtn.addEventListener("click", clearCart);
function renderCart() {
  const cart = getCart();
  cartItemsDiv.innerHTML = "";
  if (!getCurrentUser()) {
    cartEmptyText.textContent = "Por favor inicia sesion para ver tu carrito.";
    cartTotalText.textContent = "";
    return;
  }
  if (cart.length === 0) {
    cartEmptyText.textContent = "Tu carrito esta vacio.";
    cartTotalText.textContent = "";
    return;
  }
  cartEmptyText.textContent = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)} <button data-id="${item.id}">X</button></span>
    `;
    cartItemsDiv.appendChild(div);
  });
  cartTotalText.textContent = `Total: $${total.toFixed(2)} MXN`;
}
cartItemsDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.getAttribute("data-id"));
    removeFromCart(id);
  }
});
// ===== Inicializacion =====
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  showWelcome(user);
  loadProducts();
  renderCart();
});
