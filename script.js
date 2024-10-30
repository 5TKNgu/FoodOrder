let foods = [];
const itemsPerPage = 10;
let currentPage = 1;

async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    foods = data.foods;
    renderCards(currentPage);
    updateButtons();
}

function animateCardToCart(imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.position = 'fixed';
    img.style.width = '50px'; // Kích thước hình ảnh
    img.style.opacity = '0.7'; // Độ mờ
    img.style.pointerEvents = 'none'; // Không cho phép tương tác
    document.body.appendChild(img);
    
    // Tính toán vị trí của nút giỏ hàng
    const cart = document.querySelector('#cart');
    const cartRect = cart.getBoundingClientRect();
    const startX = window.innerWidth / 2; // Vị trí trung tâm
    const startY = window.innerHeight / 2; // Vị trí trung tâm
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    // Animation
    img.animate([
        { transform: `translate(${startX - endX}px, ${startY - endY}px)`, opacity: 0.7 },
        { transform: `translate(0, 0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards'
    });

    // Xóa hình ảnh sau khi animation kết thúc
    setTimeout(() => {
        img.remove();
    }, 1000);
}

function renderCards(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = foods.slice(startIndex, endIndex);

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    pageItems.forEach(food => {
        const card = `
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="${food.image}" alt="${food.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h2 class="font-bold text-xl">${food.name}</h2>
                    <p class="text-gray-600">Giá: ${food.price.toLocaleString()} VNĐ</p>
                    <p class="text-gray-500">${food.description}</p>
                    <p class="text-yellow-500 font-bold">⭐ ${food.rating}</p>
                    <button onclick="addCart(${food.id})" class="mt-4 bg-green-500 text-white px-4 py-2 bottom-0 rounded-lg hover:bg-green-600">Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;
        cardContainer.innerHTML += card;
    });
}

/// effect slogan
const text = "Chúng tôi mang đến niềm vui từ từng miếng thịt!";
const typingElement = document.getElementById("typing");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 50);
  }
}

document.addEventListener("DOMContentLoaded", type);


function updateButtons() {
    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = currentPage * itemsPerPage >= foods.length;
}

document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderCards(currentPage);
        updateButtons();
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (currentPage * itemsPerPage < foods.length) {
        currentPage++;
        renderCards(currentPage);
        updateButtons();
    }
});

window.addCart = function(foodId) {
    const foodItem = foods.find(food => food.id === foodId);
    if (foodItem) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === foodId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: foodItem.id, name: foodItem.name, price: foodItem.price, quantity: 1, image: foodItem.image });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        
        var badgeCart = document.getElementById('badgeCart');
        badgeCart.innerHTML = cart.length;

        //animateCardToCart(foodItem.image);
    }
};


function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

fetchData();