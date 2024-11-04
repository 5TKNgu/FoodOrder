import Fuse from "fuse.js";

let foods = [];

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  foods = data.foods;
}

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
                })" class="mt-4 bg-green-400 text-black px-4 py-2 bottom-0 rounded-lg hover:bg-green-100 font-playwrite">Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
  return card;
}

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
      const searchResultsClose_2 = document.getElementById(
        "searchResultsClose_2"
      );
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
  
    const fuse = new Fuse(
      foods.map((food) => ({
        ...food,
        name: food.name.toLowerCase(),
        description: food.description.toLowerCase(),
      })),
      fuseOptions
    );
    return fuse.search(query);
  }

  
function updateBadgeCart() {
  var badgeCart = document.getElementById('badgeCart');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  badgeCart.innerHTML = cart.length;
}

export { foods, fetchData, searchButton, fuzzySearch, renderSearchResults, renderCard, updateBadgeCart };