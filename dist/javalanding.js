fetch('https://fakestoreapi.com/products?limit=4')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('flashSaleContainer');
    container.innerHTML = ''; 

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = `
        bg-white p-3 rounded-lg shadow-md text-center transform transition 
        duration-300 hover:scale-105 hover:shadow-xl cursor-pointer
      `.trim();

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-24 h-24 mx-auto object-contain rounded" />
        <p class="mt-2 text-sm font-semibold text-gray-700">Rp ${(product.price * 16000).toLocaleString('id-ID')}</p>
        <p class="text-xs text-pink-500 mt-1">STOK TERBATAS</p>
      `;

   
      card.addEventListener('click', () => {
        card.classList.add('-translate-y-2'); 
        card.classList.add('shadow-2xl');    

        
        setTimeout(() => {
          card.classList.remove('-translate-y-2');
          card.classList.remove('shadow-2xl');
        }, 300);
        alert('Kamu mengklik: ' + product.title);
      });

      container.appendChild(card);
    });
  })

