let foods = [];
const itemsPerPage = 10;
let currentPage = 1;

import Fuse from "fuse.js";

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  foods = data.foods;
  renderCards(currentPage);
  updateButtons();

  const fuseOptions = {
    keys: ["name", "description"],
  };
}

var swiper = new Swiper(".progress-slide-carousel", {
  loop: true,
  fraction: true,
  autoplay: {
    delay: 1200,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".progress-slide-carousel .swiper-pagination",
    type: "progressbar",
  },
});

function renderCard(food) {
  const card = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="${food.image}" alt="${
    food.name
  }" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="font-bold text-xl">${food.name}</h2>
                <p class="text-gray-600">Giá: ${food.price.toLocaleString()} VNĐ</p>
                <p class="text-gray-500">${food.description}</p>
                <button onclick="addCart(${
                  food.id
                })" class="mt-4 bg-yellow-100 text-black px-4 py-2 bottom-0 rounded-lg hover:bg-yellow-50">Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
  return card;
}

function renderCards(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = foods.slice(startIndex, endIndex);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  pageItems.forEach((food) => {
    const card = renderCard(food);
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
  document.getElementById("next").disabled =
    currentPage * itemsPerPage >= foods.length;
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

window.addCart = function (foodId) {
  const foodItem = foods.find((food) => food.id === foodId);
  if (foodItem) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === foodId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: 1,
        image: foodItem.image,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    var badgeCart = document.getElementById("badgeCart");
    badgeCart.innerHTML = cart.length;

    //animateCardToCart(foodItem.image);
  }
};

function searchButton() {
  const buttonIcon = document.getElementById("search");
  const searchPopupClose = document.getElementById("searchPopupClose");
  const searchPopup = document.getElementById("searchPopup");
  const search = document.getElementById("startSearchButton");

  buttonIcon.addEventListener("click", () => {
    if (searchPopup.classList.contains("hidden")) {
      searchPopup.classList.remove("hidden");
    } else {
      searchPopup.classList.add("hidden");
    }
  });

  searchPopupClose.addEventListener("click", () => {
    searchPopup.classList.add("hidden");
  });

  search.addEventListener("click", () => {
    console.log("search");
    const query = document.getElementById("searchInput").value;
    console.log(query);
    if (query === "") {
      searchPopup.classList.add("hidden");
      return;
    }

    const searchResultsClose = document.getElementById("searchResultsClose");
    const searchResultsClose_2 = document.getElementById("searchResultsClose_2");
    const searchResults = document.getElementById("searchResults");
    searchResultsClose.addEventListener("click", () => {
      searchResults.classList.add("hidden");
    });
    searchResultsClose_2.addEventListener("click", () => {
      searchResults.classList.add("hidden");
    });
    searchResults.classList.remove("hidden");
    searchPopup.classList.add("hidden");

    const results = fuzzySearch(query);
    if (results.length === 0) {
      const searchResultsContent = document.getElementById(
        "searchResultsContent"
      );
      searchResultsContent.innerHTML = "Không tìm thấy kết quả phù hợp";
      return;
    }
    renderSearchResults(results);
  });
}

function renderSearchResults(results) {
  const searchResults = document.getElementById("searchResultsContent");
  searchResults.innerHTML = "";

  results.forEach((result) => {
    const card = renderCard(result.item);
    searchResults.innerHTML += card;
  });
}

function fuzzySearch(query) {
    const fuseOptions = {
      keys: ["name", "description"],
      threshold: 0.4,
    };
  
    const fuse = new Fuse(foods.map(food => ({
        ...food,
        name: food.name.toLowerCase(),
        description: food.description.toLowerCase(),
      })), fuseOptions);
    return fuse.search(query);
  }
  
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

window.onload = function () {
  fetchData();
  var cart = getCart();
  var badgeCart = document.getElementById("badgeCart");
  badgeCart.innerHTML = cart.length;
  searchButton();
};
