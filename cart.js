// Function to add a product to the cart
function addToCart(name, price, image) {
    // Create or get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(product => product.name === name);

    if (existingProductIndex !== -1) {
        // Product already exists in the cart, update quantity and total price
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * price;
    } else {
        // Product doesn't exist in the cart, add it
        const product = {
            name: name,
            price: price,
            image: image,
            quantity: 1,
            totalPrice: price,
        };
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the displayed cart and update cart item count
    displayCart();
    updateCartItemCount();
}

// Function to display the cart on the cart.html page
function displayCart() {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Select the cart body and total row in the HTML
    const cartBody = document.getElementById('cart-body');
    const totalRow = document.getElementById('total-row');
    const checkoutContainer = document.getElementById('checkout-container');

    // Clear previous content in the cart body, total row, and checkout container
    cartBody.innerHTML = '';
    totalRow.innerHTML = '';
    checkoutContainer.innerHTML = '';

    // Loop through the products in the cart and display them in a table row
    let totalSum = 0; // Initialize the total sum
    cart.forEach(product => {
        const row = cartBody.insertRow();

        // Display product information in each cell (name, price, quantity, total price, remove button)
        row.innerHTML = `
            <td>${product.name}</td>
            <td>&#8377 ${product.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.name}', this.value)">
            </td>
            <td>&#8377 ${product.totalPrice.toFixed(2)}</td>
            <td><button class="remove-button" onclick="removeFromCart('${product.name}')">Remove</button></td>
        `;

        // Update the total sum
        totalSum += product.totalPrice;
    });

    // Display the total row
    totalRow.innerHTML = `
        <td colspan="3"></td>
        <td>Total: &#8377 ${totalSum.toFixed(2)}</td>
        <td></td>
    `;

    // Display the Checkout button
    checkoutContainer.innerHTML = `
        <button onclick="checkout()">Checkout</button>
    `;
}

// Function to update the quantity of a product in the cart
function updateQuantity(name, newQuantity) {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the product in the cart
    const productIndex = cart.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        // Update the quantity and total price of the product
        cart[productIndex].quantity = parseInt(newQuantity, 10);
        cart[productIndex].totalPrice = cart[productIndex].quantity * cart[productIndex].price;

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Refresh the displayed cart and update cart item count
        displayCart();
        updateCartItemCount();
    }
}

// Function to remove a product from the cart
function removeFromCart(name) {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the product in the cart
    const productIndex = cart.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        // Remove the product from the cart array
        cart.splice(productIndex, 1);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Refresh the displayed cart and update cart item count
        displayCart();
        updateCartItemCount();
        
    }
}

// Function to handle the checkout process
function checkout() {
    // Perform any necessary actions for the checkout process
    alert('Successfully Confirmed Your Order');
}

// Function to update the cart item count in the navbar
function updateCartItemCount() {
    const cartItemCount = getCartItemCount();
    const cartItemCountElement = document.getElementById('cart-item-count');
    if (cartItemCountElement) {
        cartItemCountElement.textContent = cartItemCount.toString();
    }
}

// Function to get the total number of items in the cart
function getCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, product) => total + product.quantity, 0);
}


// Initial display when the page loads
displayCart();
updateCartItemCount();
