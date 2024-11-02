function reviewCard(food) {
    //Sử dụng tailwind để tạo 1 card chiếm 1/3 màn hình chứa hình ảnh food.image, tên food.name, giá food.price và nút "Thêm vào giỏ hàng"
    const foodCard = document.getElementById("foodCard");
    const card = document.createElement('div');
    card.classList.add('w-1/3', 'p-4');
    card.innerHTML = `
        <div class="card bg-white rounded-lg shadow-md p-4">
            <img src="${food.image}" alt="${food.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="font-bold text-xl">${food.name}</h2>
                <p class="text-gray-600">Giá: ${food.price} VNĐ</p>
                <button onclick="addCart(${food.id})" class="mt-4 bg-green-500 text-white px-4 py-2 bottom-0 rounded-lg hover:bg-green-600">Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
    foodCard.appendChild(card);
}