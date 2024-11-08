let totalPrice = 0;
let totalQuantity = 0;

function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    const storedTotalQuantity = parseInt(localStorage.getItem('totalQuantity')) || 0;

    totalPrice = storedTotalPrice;
    totalQuantity = storedTotalQuantity;

    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
    updateCartQuantity();

    cartData.forEach(item => {
        addCartItem(item.imageSrc, item.name, item.price, false);
    });

    updateCartMessage();
}

function saveCartToLocalStorage() {
    const cartItems = [];
    document.querySelectorAll('#cartList .cart-item').forEach(cartItem => {
        cartItems.push({
            name: cartItem.querySelector('.cart-item-name').innerText,
            price: parseFloat(cartItem.querySelector('.cart-item-price').innerText.slice(1)),
            imageSrc: cartItem.querySelector('img').src
        });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    localStorage.setItem('totalQuantity', totalQuantity);
}

function isProductInCart(productName) {
    return document.querySelector(`#cartList .cart-item[data-name="${productName}"]`) !== null;
}

function addCartItem(imageSrc, name, price, updateTotal = true) {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-name', name);
    cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${name}" width="60">
        <span class="cart-item-name fs-5">${name}</span> - <span class="cart-item-price fs-5">$${price.toFixed(2)}</span>
        <button class="remove-from-cart bg-transparent border-0 fs-2">
            <iconify-icon class="icon bg-white text-danger" icon="weui:delete-filled"></iconify-icon>
        </button>
    `;
    document.querySelector('#cartList').appendChild(cartItem);

    if (updateTotal) {
        totalPrice += price;
        totalQuantity += 1;
        document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
        updateCartQuantity();
    }

    cartItem.querySelector('.remove-from-cart').addEventListener('click', function() {
        cartItem.remove();
        totalPrice -= price;
        totalQuantity -= 1;
        document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
        updateCartQuantity(); 
        saveCartToLocalStorage();
        updateCartMessage();
    });

    saveCartToLocalStorage();
}

function addToCart(product) {
    const productName = product.getAttribute('data-name');
    const productPrice = parseFloat(product.getAttribute('data-price'));
    const productImageSrc = product.querySelector('.product-image').src;

    if (isProductInCart(productName)) {
        alert('This product is already in the cart!');
        return;
    }

    addCartItem(productImageSrc, productName, productPrice);
    updateCartMessage();
    saveCartToLocalStorage();
}

function updateCartMessage() {
    const cartMessage = document.getElementById('cartMessage');
    const cartItems = document.querySelectorAll('#cartList .cart-item');

    cartMessage.style.display = cartItems.length === 0 ? 'block' : 'none';
}

function updateCartQuantity() {
    const cartQuantityDisplay = document.getElementById('cartQuantity');
    cartQuantityDisplay.innerText = totalQuantity;
    cartQuantityDisplay.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = button.closest('.product-card');
        addToCart(productCard);
    });
});

window.onload = loadCart;
