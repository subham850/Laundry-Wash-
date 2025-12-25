// SELECT ELEMENTS
const serviceItems = document.querySelectorAll(".price-card-item");
const noItemBox = document.querySelector(".no-item-added");
const totalSpan = document.querySelector("#total-amount span");
const form = document.querySelector(".booking-form");
const cartContainer = document.querySelector(".price-card-top-right");

// STATE
let cart = [];
let total = 0;

// ADD / REMOVE SERVICES
serviceItems.forEach(item => {
    const button = item.querySelector("button");

    button.addEventListener("click", () => {
        const text = item.innerText;

        // Extract service name and price from text
        const name = text.split("-")[0].trim();
        const price = Number(text.match(/₹(\d+)/)[1]);

        const exists = cart.find(service => service.name === name);

        if (!exists) {
            cart.push({ name, price });
            total += price;
            button.innerText = "remove item ➖";
        } else {
            cart = cart.filter(service => service.name !== name);
            total -= price;
            button.innerText = "add item ➕";
        }

        updateCartUI();
    });
});

// UPDATE CART UI
function updateCartUI() {
    // Remove old cart rows
    document.querySelectorAll(".cart-row").forEach(row => row.remove());

    if (cart.length === 0) {
        noItemBox.style.display = "flex";
        totalSpan.innerText = "₹0";
        return;
    }

    noItemBox.style.display = "none";

    cart.forEach((item, index) => {
        const row = document.createElement("p");
        row.className = "cart-row";
        row.innerHTML = `${index + 1}. ${item.name} <span>₹${item.price}</span>`;
        cartContainer.insertBefore(row, document.getElementById("total-amount"));
    });

    totalSpan.innerText = `₹${total}`;
}

// BOOK NOW FORM
form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (cart.length === 0) {
        alert("❗ Please add at least one service");
        return;
    }

    if (!name || !email || !phone) {
        alert("❗ Please fill all details");
        return;
    }

    alert("✅ Booking successful! We will contact you soon.");

    // RESET EVERYTHING
    cart = [];
    total = 0;
    updateCartUI();

    serviceItems.forEach(item => {
        item.querySelector("button").innerText = "add item ➕";
    });

    form.reset();
});
