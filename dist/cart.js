const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Simpan keranjang ke localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem("bunnyshop-cart", JSON.stringify(cart));
}

// Load keranjang dari localStorage
function loadCartFromLocalStorage() {
  const cart = localStorage.getItem("bunnyshop-cart");
  return cart ? JSON.parse(cart) : [];
}

// Update total harga
function updateTotal() {
  let total = 0;
  document.querySelectorAll("#cart-container > div").forEach(div => {
    const priceText = div.querySelector("p.text-white.font-bold").textContent;
    const price = parseFloat(priceText.replace("Rp ", "").replaceAll(".", "").replace(",", "."));
    const qty = parseInt(div.querySelector(".qty").textContent);
    total += price * qty;
  });
  totalPriceEl.textContent = `Total Produk: Rp${total.toLocaleString("id-ID")}`;
}

// Render keranjang ke halaman
function renderCart(cart) {
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-pink-700 font-semibold">Keranjang kosong.</p>`;
    totalPriceEl.textContent = "Total Produk: Rp0";
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
    return;
  }
  checkoutBtn.disabled = false;
  checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");

  cart.forEach(product => {
    const item = document.createElement("div");
    item.className = "bg-[#FFB8E0] rounded-lg p-4 flex items-center space-x-4 shadow-sm";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-cover rounded-md flex-shrink-0" />
      <div class="flex-grow">
        <p class="font-semibold text-white">${product.title}</p>
        <p class="text-white font-bold mt-1">Rp ${product.price.toLocaleString("id-ID")}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button class="decrement bg-[#EC7FA9] text-white w-8 h-8 rounded-full flex items-center justify-center">-</button>
        <span class="qty font-bold text-[#2D3748]">${product.quantity}</span>
        <button class="increment bg-[#EC7FA9] text-white w-8 h-8 rounded-full flex items-center justify-center">+</button>
      </div>
      <div class="flex bg-pink-400 rounded-2xl overflow-hidden text-white text-sm font-semibold divide-x divide-white shadow-md">
        <button class="delete px-4 py-1 hover:bg-pink-500 transition">Hapus</button>
      </div>
    `;

    cartContainer.appendChild(item);

    const incrementBtn = item.querySelector(".increment");
    const decrementBtn = item.querySelector(".decrement");
    const qtySpan = item.querySelector(".qty");
    const deleteBtn = item.querySelector(".delete");

    incrementBtn.addEventListener("click", () => {
      product.quantity++;
      qtySpan.textContent = product.quantity;
      saveCartToLocalStorage(cart);
      updateTotal();
    });

    decrementBtn.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
        qtySpan.textContent = product.quantity;
        saveCartToLocalStorage(cart);
        updateTotal();
      }
    });

    deleteBtn.addEventListener("click", () => {
      const index = cart.findIndex(p => p.id === product.id);
      if (index > -1) {
        cart.splice(index, 1);
        saveCartToLocalStorage(cart);
        renderCart(cart);
        updateTotal();
      }
    });
  });
  updateTotal();
}

// Load keranjang saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const cart = loadCartFromLocalStorage();
  renderCart(cart);
});

// Event checkout pindah halaman checkout.html
checkoutBtn.addEventListener("click", () => {
  window.location.href = "checkout.html";
});
