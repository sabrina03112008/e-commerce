fetchProduct();
async function fetchProduct() {
  const response = await fetch('https://fakestoreapi.com/products?limit=3');
  const products = await response.json();
  displayProduct(products[0]); 
}
card.addEventListener("click", () => {
  keDetailProduk(product);
});
data.forEach((product) => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow-md p-4 text-center cursor-pointer";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-2" />
    <h2 class="text-lg font-semibold text-pink-700">${product.title}</h2>
    <p class="text-gray-600 text-sm mb-2">${product.category}</p>
    <p class="text-pink-600 font-bold mb-2">$${product.price}</p>
    <!-- Tombol dst bisa kamu tambahkan jika perlu -->
  `;

  // ⬇️ ini penting!
  card.addEventListener("click", () => {
    keDetailProduk(product);
  });

  container.appendChild(card);
});
