

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  // Remove login flag and redirect to login page
  localStorage.removeItem("partnerLoggedIn");
  window.location.href = "text.html";
});

const themeToggle = document.querySelector(".themeToggle"); // Change to querySelector

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

// Add DOMContentLoaded to ensure elements are loaded
document.addEventListener("DOMContentLoaded", () => {
    // Check theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }
});

async function loadpro() {
  const container = document.getElementById("profiles");
  if (!container) return;

 try {
  const res = await fetch("user.json"); 
  const orders = await res.json();

  container.innerHTML = "";

  orders.forEach(pro => {
    const card = document.createElement("div");
    card.classList.add("pro-card");
    card.innerHTML = `
      <h4>Profile : ${pro.Name.toUpperCase()}</h4>
      <p><b>Vehicle:</b> ${pro.Vehicle}</p>
      <p><b>Experience:</b> ${pro.Experience}</p>
     <button onclick="window.location.href='dash.html'">Back</button>
     <button onclick="viewOrder(${pro.id})">View</button>
    `;
    container.appendChild(card);
  });
} catch (err) {
  container.innerHTML = `<p style="color:red;">⚠️ Failed to load orders</p>`;
  console.error("Error loading orders:", err);
}
}

// Call on page load
loadpro();
function viewOrder(id) {
  // Store selected order ID in localStorage
  localStorage.setItem("orderId", id);
  
  // Redirect to order details page
  window.location.href = "order.html";
}

