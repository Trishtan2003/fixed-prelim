Grocery List App Documentation
1. Introduction

The Grocery List App is a versatile tool designed to help users efficiently manage their grocery shopping. With features such as user authentication, product management, and a dynamic shopping cart, this app streamlines the grocery shopping experience. Users can easily add, edit, and delete products, search and filter items by category, and keep track of their purchases through a responsive and visually appealing interface. Whether you're organizing your shopping list or checking out, the Grocery List App offers a seamless and user-friendly experience tailored to your needs.

2. Features:

User Authentication: Sign-up and login functionalities.
Product Management: Add, edit, and delete products.
Cart Functionality: Add items to cart, view cart, and proceed to checkout.
Search and Filter: Search products and filter by category.
Responsive Design: Optimized for both web and mobile devices.

3. Getting Started
Instructions for setting up and running the app locally.

Prerequisites:

Web Browser (Chrome, Firefox, etc.)
Text Editor (VSCode, Sublime Text, etc.)
 Using Basic knowledge of HTML, CSS, and JavaScript

4.  File Structure:
index.html: Main HTML file
add-item.html: Page for adding and editing items
grocery.html: Page for viewing products and cart
add-item.css: Styles for the add-item page
grocery.css: Styles for the main grocery page
add-item.js: JavaScript for adding and editing items
grocery.js: JavaScript for managing products, cart, and checkout


5. Usage
Adding Products:

Go to the "Add New Item" page.
Fill out the product details and submit the form.
Editing Products

On the "Grocery List" page, click the "Edit" button for the product you want to modify.
Update the product details on the form and submit.

Managing Cart:

Add items to the cart from the "Grocery List" page.
View and manage cart items by clicking the "Cart" button.
Proceed to checkout when ready.

Searching and Filtering:

Use the search bar to find products by name.

6. Code Explanation
   
  JavaScript Functions:

renderProducts(category, searchTerm): Displays products based on category and search terms.
addToCart(name): Adds a product to the cart.
removeFromCart(index): Removes a product from the cart.
editProduct(name): Redirects to the edit page with product details.
deleteProduct(name): Deletes a product from the list.
CSS Styles

add-item.css: Styles for the form on the add-item page.
grocery.css: Styles for the product display and cart on the grocery page.
Use the category filter to view products by category.

7.  Troubleshooting:

Common Issues:

Product not displaying: Ensure the product has a positive quantity and matches the search/filter criteria.
Add to Cart button not working: Check for JavaScript errors in the console.


credits: Trishtan Ervin G. Bartiquin
