// keranjang.js

// Fungsi untuk menyimpan produk ke keranjang (localStorage)
function tambahKeKeranjang(namaProduk) {
  const produk = {
    nama: namaProduk,
    waktu: new Date().toISOString()
  };
  localStorage.setItem("keranjang", JSON.stringify(produk));
  // Arahkan ke halaman notifikasi
  window.location.href = "notifikasi.html";
}

// Fungsi untuk menampilkan produk di halaman notifikasi
function tampilkanProdukKeranjang() {
  const produk = JSON.parse(localStorage.getItem("keranjang"));
  const container = document.getElementById("produk-terakhir");

  if (!container) return; // pastikan elemen ada

  if (produk && produk.nama) {
    container.innerHTML = `
      <div class="bg-white w-14 h-14 rounded-lg mr-4"></div>
      <div class="flex-1 text-[#D34282] font-medium">${produk.nama}</div>
      <button onclick="window.location.href='keranjang.html'"
        class="bg-white text-[#D34282] font-semibold px-4 py-2 rounded-xl hover:bg-[#fbe1ec] transition">
        Cek Keranjang
      </button>
    `;
  } else {
    container.innerHTML = `<div class="text-white">Tidak ada produk di keranjang.</div>`;
  }
}

// Panggil otomatis saat halaman notifikasi dibuka
document.addEventListener("DOMContentLoaded", tampilkanProdukKeranjang);
