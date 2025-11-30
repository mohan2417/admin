// -------------------------------
// 🔹 Logout Button Functionality
// -------------------------------
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  // Remove login flag and redirect to login page
  localStorage.removeItem("partnerLoggedIn");
  window.location.href = "text.html";
});

// -------------------------------
// 🔹 Dark Mode Toggle
// -------------------------------
const themeToggle = document.getElementById("themeToggle");

// Check saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Toggle theme on button click
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// -------------------------------
// 🔹 Load Orders (Mock API Fetch)
// -------------------------------
async function loadOrders() {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

 try {
  const res = await fetch("orders.json"); 
  const orders = await res.json();

  container.innerHTML = "";

  orders.forEach(order => {
    const card = document.createElement("div");
    card.classList.add("order-card");
    card.innerHTML = `
      <h4>Order #${order.id}</h4>
      <p><b>Restaurant:</b> ${order.restaurant}</p>
      <p><b>Destination:</b> ${order.destination}</p>
      <p><b>Total:</b> ₹${order.price}</p>
      <button onclick="viewOrder(${order.id})">View</button>
    `;
    container.appendChild(card);
  });
} catch (err) {
  container.innerHTML = `<p style="color:red;">⚠️ Failed to load orders</p>`;
  console.error("Error loading orders:", err);
}
}

// Call on page load
loadOrders();
// ...existing code...

// -------------------------------
// 🔹 View Order Function
// -------------------------------
function viewOrder(id) {
  // Store selected order ID in localStorage
  localStorage.setItem("orderId", id);
  
  // Redirect to order details page
  window.location.href = "order.html";
}

