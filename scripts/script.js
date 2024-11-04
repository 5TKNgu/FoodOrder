import {
  changeAddCartButton,
  checkFoodExist,
  foods,
  fetchData,
  searchButton,
  renderCard,
  updateBadgeCart,
} from "./main";

const itemsPerPage = 10;
let currentPage = 1;

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

function renderCards(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = foods.slice(startIndex, endIndex);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  pageItems.forEach((food) => {
    const card = renderCard(food);
    cardContainer.innerHTML += card;
    if (checkFoodExist(food.id)) {
      changeAddCartButton(food.id);
    }
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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth", // Cuộn mượt mà
      });
    }
  });
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
        description: foodItem.description,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadgeCart();
    changeAddCartButton(foodId);
  }
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

window.onload = function () {
  fetchData().then(() => {
    renderCards(currentPage);
    updateButtons();
  });
  var cart = getCart();
  var badgeCart = document.getElementById("badgeCart");
  badgeCart.innerHTML = cart.length;
  searchButton();
};
