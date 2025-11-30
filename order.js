document.addEventListener("DOMContentLoaded", () => {
  const orderId = localStorage.getItem("orderId");
  const orderInfo = document.getElementById("orderInfo");

  if (orderId && orderInfo) {
    // Fetch orders from JSON
    fetch('orders.json')
      .then(response => response.json())
      .then(data => {
        // Find the order by ID
        const order = data.find(o => o.id == orderId);
        
        if (order && order.food) {
          // Display order details
          orderInfo.innerHTML = `
        
              <p><b>Food:</b> ${order.food}</p>
           
              <p><b>Price:</b> ₹${order.price || '0'}</p>
              
          <button onclick="window.location.href='profile.html'">Back to profile</button>
          `;
        } else {
          orderInfo.innerHTML = `<p style="color:red;">Order not found.</p>`;
        }
      })
      .catch(error => {
        console.error("Error loading order:", error);
        orderInfo.innerHTML = `<p style="color:red;">Failed to load order details.</p>`;
      });
  } else {
    if (orderInfo) {
      orderInfo.innerHTML = `<p style="color:red;">No order selected.</p>`;
    }
  }
});

function goBack() {
  window.location.href = "dash.html"; // ✅ Correct file name
}