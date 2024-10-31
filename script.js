let foods = [];
const itemsPerPage = 10;
let currentPage = 1;
import {
    Carousel,
    initTWE,
  } from "tw-elements";

import Fuse from 'fuse.js';

async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    foods = data.foods;
    renderCards(currentPage);
    updateButtons();

    const fuseOptions = {
        keys: [
            "name",
            "description"
        ]
    };
    
    
    console.log(foods)
    const fuse = new Fuse(foods, fuseOptions);
    
    const searchPattern = "bò"
    
    console.log(fuse.search(searchPattern))

    renderRecommend(foods);
    initTWE({ Carousel });
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

// function renderCards(page) {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageItems = foods.slice(startIndex, endIndex);

//     const cardContainer = document.getElementById("card-container");
//     cardContainer.innerHTML = "";

//     pageItems.forEach(food => {
//         const card = `
//             <div class="bg-white shadow-md rounded-lg overflow-hidden">
//                 <img src="${food.image}" alt="${food.name}" class="w-full h-48 object-cover">
//                 <div class="p-4">
//                     <h2 class="font-bold text-xl">${food.name}</h2>
//                     <p class="text-gray-600">Giá: ${food.price.toLocaleString()} VNĐ</p>
//                     <p class="text-gray-500">${food.description}</p>
//                     <p class="text-yellow-500 font-bold">⭐ ${food.rating}</p>
//                     <button onclick="addCart(${food.id})" class="mt-4 bg-green-500 text-white px-4 py-2 bottom-0 rounded-lg hover:bg-green-600">Thêm vào giỏ hàng</button>
//                 </div>
//             </div>
//         `;
//         cardContainer.innerHTML += card;
//     });
// }

function renderRecommend(foods) {
    const shuffled = foods.slice().sort(() => 0.5 - Math.random());
    var foodsRecommend = shuffled.slice(0, 3);

    const cauItems = document.getElementById("carouselItems");

    var index = 0;

    foodsRecommend.forEach(itemData => {
        const item = document.createElement('div');

        item.setAttribute('data-twe-carousel-item', '');

        if (index == 0) {
            item.setAttribute('data-twe-carousel-active', '');
            item.className = 'relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none';
        } else {
            item.className = 'relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none';
        }

        item.innerHTML = 
        `
            <img src='${itemData.image}' alt='' class="block w-full" />
        `;

        console.log(itemData);
        console.log(item);

        cauItems.appendChild(item);

        index++;
    });

}


function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

fetchData();