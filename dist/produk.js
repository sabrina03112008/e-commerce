// products.js

const productsContainer = document.getElementById("products-container");

// Load keranjang dari localStorage
function loadCartFromLocalStorage() {
  const cart = localStorage.getItem("bunnyshop-cart");
  return cart ? JSON.parse(cart) : [];
}

// Simpan keranjang ke localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem("bunnyshop-cart", JSON.stringify(cart));
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
  let cart = loadCartFromLocalStorage();

  // Cek kalau produk sudah ada di keranjang, tambahkan quantity
  const index = cart.findIndex(item => item.id === product.id);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartToLocalStorage(cart);
  alert(`Produk "${product.title}" berhasil ditambahkan ke keranjang!`);
}

// Ambil data produk dari API dan render
async function fetchAndRenderProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-[#FFB8E0] rounded-lg p-4 flex flex-col items-center shadow-md";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-32 h-32 object-contain mb-4" />
        <h2 class="font-semibold text-lg text-pink-700 mb-2 text-center">${product.title}</h2>
        <p class="text-pink-900 font-bold mb-4">Rp ${product.price.toLocaleString("id-ID")}</p>
        <button class="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold transition">Tambah ke Keranjang</button>
      `;

      const btn = card.querySelector("button");
      btn.addEventListener("click", () => {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        });
      });

      productsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    productsContainer.innerHTML = `<p class="text-white font-semibold">Gagal memuat produk.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
