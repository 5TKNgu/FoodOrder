function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        const emptyCart = document.getElementById('cartEmpty');
        const payment = document.getElementById('paymentContainer');
        payment.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }

    cart.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card bg-white rounded-lg shadow-md p-4';
        card.innerHTML = `
            <img src="../${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-t-lg mx-auto">
            <div class="p-4">
                <h2 class="font-bold text-lg">${item.name}</h2>
                <p class="text-gray-500">${item.description}</p>
                <p class="text-gray-600">Giá: ${item.price.toLocaleString()} VNĐ</p>
                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center">
                        <button class="btn btn-red bg-yellow-100" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2 px-3">${item.quantity}</span>
                        <button class="btn btn-green bg-yellow-100" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="ml-4">
                        <button class="btn btn-red bg-red-100" onclick="removeFromCart(${item.id})">Xóa</button>
                    </div>
                </div>
            </div>
        `;

        cartContainer.appendChild(card);
    });
}

function renderPaymentBox() {
    var paymentBox = document.getElementById("ulProducts");
    paymentBox.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const liProduct = document.createElement('li');

        liProduct.innerHTML = `
            ${item.name} x ${item.quantity}
        `;

        paymentBox.appendChild(liProduct)
    });
}

window.changeQuantity = function(foodId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === foodId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(foodId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updatePage();
        }
    }
}


function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateTotal() {
    var total = calculateTotal();
    document.getElementById('total').innerHTML = total.toLocaleString() + ' VNĐ';
}

function updateBadgeCart() {
    var badgeCart = document.getElementById('badgeCart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    badgeCart.innerHTML = cart.length;
}

function updatePage() {
    renderCart();
    updateTotal();
    updateBadgeCart();
    renderPaymentBox();
}

window.removeFromCart = function(foodId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== foodId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updatePage();
};

window.onload = function() {
    updatePage();
}

export {renderPaymentBox, updateTotal}