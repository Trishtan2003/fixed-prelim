document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const cartButton = document.getElementById('cartButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchButton = document.getElementById('searchButton');
    const searchBar = document.getElementById('searchBar');
    const checkoutButton = document.getElementById('checkoutButton');
    const addItemButton = document.getElementById('addItemButton');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render products based on category and search
    function renderProducts(category = '', searchTerm = '') {
        const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
        productList.innerHTML = '';
        products
            .filter(product => product.quantity > 0) // Only show items with quantity > 0
            .filter(product => (category === '' || product.category === category) &&
                (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())))
            .forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>Brand: ${product.brand}</p>
                    <p>Price: ₱${product.price.toFixed(2)}</p>
                    ${product.weightVolume ? `<p>Weight/Volume: ${product.weightVolume}</p>` : ''}
                    <p>Available: ${product.quantity}</p>
                    <button class="add-to-cart-btn" data-name="${product.name}">Add to Cart</button>
                    <button class="edit-btn" data-name="${product.name}">Edit</button>
                    <button class="delete-btn" data-name="${product.name}">Delete</button>
                `;
                productList.appendChild(productCard);
            });

        // Add event listeners to buttons after rendering
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => addToCart(button.dataset.name));
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => editProduct(button.dataset.name));
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deleteProduct(button.dataset.name));
        });
    }

    // Function to render the cart items
    function renderCart() {
        cartItems.innerHTML = '';
        let totalCartPrice = 0;

        cart.forEach((item, index) => {
            const itemTotalPrice = item.price * item.quantity;
            totalCartPrice += itemTotalPrice;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - ₱${item.price.toFixed(2)} (Qty: ${item.quantity}) - ₱${itemTotalPrice.toFixed(2)}</span>
                <button class="remove-from-cart-btn" data-index="${index}">Delete</button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Display total price
        const totalPriceElement = document.createElement('div');
        totalPriceElement.className = 'total-price';
        totalPriceElement.innerHTML = `<strong>Total Price: ₱${totalCartPrice.toFixed(2)}</strong>`;
        cartItems.appendChild(totalPriceElement);

        cartButton.textContent = `Cart (${cart.length}) - Total: ₱${totalCartPrice.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));

        // Add event listeners to buttons after rendering
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', () => removeFromCart(button.dataset.index));
        });
    }

    // Add product to the cart
    function addToCart(name) {
        const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const product = products.find(p => p.name === name);

        if (product) {
            if (product.quantity > 0) { // Only allow adding if quantity is greater than 0
                const existingCartItem = cart.find(item => item.name === name);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                product.quantity--; // Reduce available quantity

                localStorage.setItem('groceryItems', JSON.stringify(products));
                localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
                renderCart();
                renderProducts(categoryFilter.value, searchBar.value);
            } else {
                // This alert is only for when the product is actually out of stock
                alert('This item is out of stock.');
            }
        } else {
            alert('Item not found.');
        }
    }

    // Remove product from the cart
    function removeFromCart(index) {
        const item = cart[index];
        if (item) {
            cart.splice(index, 1);
            const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
            const product = products.find(p => p.name === item.name);
            if (product) {
                product.quantity += item.quantity; // Re-add quantity to products
            }
            localStorage.setItem('groceryItems', JSON.stringify(products));
            renderCart();
            renderProducts(categoryFilter.value, searchBar.value);
        }
    }

    // Edit product
    function editProduct(name) {
        // Redirect to the add-item page with an edit query parameter
        window.location.href = `add-item.html?edit=${encodeURIComponent(name)}`;
    }

    // Delete product
    function deleteProduct(name) {
        const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const updatedProducts = products.filter(p => p.name !== name);
        localStorage.setItem('groceryItems', JSON.stringify(updatedProducts));
        renderProducts(categoryFilter.value, searchBar.value);
    }

    // Filter products based on category selection
    categoryFilter.addEventListener('change', (e) => {
        renderProducts(e.target.value, searchBar.value);
    });

    // Search products by name
    searchButton.addEventListener('click', () => {
        renderProducts(categoryFilter.value, searchBar.value);
    });

    // Add Item button functionality
    addItemButton.addEventListener('click', () => {
        window.location.href = 'add-item.html';
    });

    // Checkout button functionality
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('CHECKOUT IS EMPTY.');
        } else {
            alert('Proceeding to checkout...');
            // Reduce quantity of items that are in the cart
            const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
            cart.forEach(item => {
                const product = products.find(p => p.name === item.name);
                if (product) {
                    product.quantity -= item.quantity;
                }
            });
            localStorage.setItem('groceryItems', JSON.stringify(products));
            localStorage.removeItem('cart'); // Clear cart
            cart = [];
            renderCart();
            renderProducts(categoryFilter.value, searchBar.value);
        }
    });

    // Load products and cart on page load
    renderProducts(categoryFilter.value, searchBar.value);
    renderCart();
});
