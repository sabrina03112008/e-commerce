document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("flashsale-list");
      container.innerHTML = "";

      data.forEach(product => {
        const card = `
          <div onclick="goToDetail(${product.id})" class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:bg-pink-100 transition">
            <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-2" />
            <h2 class="text-lg font-semibold text-pink-700">${product.title}</h2>
            <p class="text-gray-600 text-sm mb-2">${product.category}</p>
            <p class="text-pink-600 font-bold mb-2">$${product.price}</p>
          </div>
        `;
        container.innerHTML += card;
      });
    });
});

// harus di luar DOMContentLoaded
function goToDetail(id) {
  window.location.href = `detailproduk.html?id=${id}`;
}
