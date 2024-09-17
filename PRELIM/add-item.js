document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const productNameToEdit = queryParams.get('edit');

    if (productNameToEdit) {
        // If an 'edit' parameter exists, fetch and display the existing product details
        const products = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const productToEdit = products.find(product => product.name === productNameToEdit);

        if (productToEdit) {
            document.getElementById('name').value = productToEdit.name;
            document.getElementById('brand').value = productToEdit.brand;
            document.getElementById('price').value = productToEdit.price;
            document.getElementById('weightVolume').value = productToEdit.weightVolume || '';
            document.getElementById('quantity').value = productToEdit.quantity;
            document.getElementById('store').value = productToEdit.store;
            document.getElementById('category').value = productToEdit.category;

            // Handle displaying the current image
            const imageDisplay = document.createElement('img');
            imageDisplay.src = productToEdit.image || 'https://via.placeholder.com/150';
            imageDisplay.alt = 'Product Image';
            imageDisplay.className = 'product-image-preview';
            document.querySelector('main').insertBefore(imageDisplay, document.getElementById('addItemForm'));
        }

        document.getElementById('submitButton').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const name = document.getElementById('name').value.trim();
            const brand = document.getElementById('brand').value.trim();
            const price = parseFloat(document.getElementById('price').value.trim());
            const weightVolume = document.getElementById('weightVolume').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value.trim(), 10);
            const store = document.getElementById('store').value.trim();
            const imageFile = document.getElementById('image').files[0];
            const category = document.getElementById('category').value;

            // Convert image file to Base64 data URL if it exists
            let image = '';
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    image = event.target.result;
                    saveItem(); // Call saveItem() after image is loaded
                };
                reader.readAsDataURL(imageFile);
            } else {
                saveItem(); // No image file, save item directly
            }

            function saveItem() {
                // Validate inputs
                if (!name || !brand || isNaN(price) || price <= 0 || !weightVolume || isNaN(quantity) || quantity <= 0 || !store || !category) {
                    alert('Please fill in all fields correctly.');
                    return;
                }

                // Retrieve existing items from localStorage
                const items = JSON.parse(localStorage.getItem('groceryItems')) || [];

                if (productNameToEdit) {
                    // Edit existing item
                    const updatedItems = items.map(item => 
                        item.name === productNameToEdit ? { name, brand, price, weightVolume, quantity, store, image, category } : item
                    );
                    localStorage.setItem('groceryItems', JSON.stringify(updatedItems));
                } else {
                    // Add new item
                    items.push({ name, brand, price, weightVolume, quantity, store, image, category });
                    localStorage.setItem('groceryItems', JSON.stringify(items));
                }

                // Redirect back to grocery.html
                window.location.href = 'grocery.html';
            }
        });
    } else {
        // No 'edit' parameter, add new item
        document.getElementById('submitButton').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const name = document.getElementById('name').value.trim();
            const brand = document.getElementById('brand').value.trim();
            const price = parseFloat(document.getElementById('price').value.trim());
            const weightVolume = document.getElementById('weightVolume').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value.trim(), 10);
            const store = document.getElementById('store').value.trim();
            const imageFile = document.getElementById('image').files[0];
            const category = document.getElementById('category').value;

            // Convert image file to Base64 data URL if it exists
            let image = '';
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    image = event.target.result;
                    saveItem(); // Call saveItem() after image is loaded
                };
                reader.readAsDataURL(imageFile);
            } else {
                saveItem(); // No image file, save item directly
            }

            function saveItem() {
                // Validate inputs
                if (!name || !brand || isNaN(price) || price <= 0 || !weightVolume || isNaN(quantity) || quantity <= 0 || !store || !category) {
                    alert('Please fill in all fields correctly.');
                    return;
                }

                // Retrieve existing items from localStorage
                const items = JSON.parse(localStorage.getItem('groceryItems')) || [];

                // Add new item
                items.push({ name, brand, price, weightVolume, quantity, store, image, category });
                localStorage.setItem('groceryItems', JSON.stringify(items));

                // Redirect back to grocery.html
                window.location.href = 'grocery.html';
            }
        });
    }

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'grocery.html';
    });
});
