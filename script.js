// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all elements with the class "cart"
    var addToCartButtons = document.querySelectorAll(".cart");

    // Loop through each button
    addToCartButtons.forEach(function(button) {
        // Add a click event listener to each button
        button.addEventListener("click", function() {
            // Get the product ID from the button's data attribute
            var productId = button.getAttribute("data-product-id");
            var productDetails = {
                id: productId,
                image: button.parentElement.querySelector('img').src,
                brand: button.parentElement.querySelector('.des span').textContent,
                name: button.parentElement.querySelector('.des h5').textContent,
                price: button.parentElement.querySelector('.des h4').textContent
            };

            // Add product to the cart
            addToCart(productDetails);
        });
    });

    // Function to add the product to the cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Product added to cart:", product);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.pro');
            const quantityInput = productElement.querySelector('.quantity');
            const quantity = quantityInput ? quantityInput.value : 1;
            
            // Here you would typically add the product and quantity to the cart in your system
            // For now, we will just log the product ID and quantity
            const productId = button.getAttribute('data-product-id');
            console.log(`Product ID: ${productId}, Quantity: ${quantity}`);

            // Redirect to cart page
            window.location.href = 'cart.html';
        });
    });
});

document.getElementById('cart-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/update-cart', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update the cart contents based on the response
        console.log(data); // Example: log the response data to the console
        // You can update the cart totals, display a success message, etc.
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function updateCart() {
    let rows = document.querySelectorAll("#cart tbody tr");

    rows.forEach(row => {
        let price = parseFloat(row.cells[2].textContent.replace("₱", "").replace(",", ""));
        let quantity = parseInt(row.cells[3].querySelector("input").value); // Updated this line
        let subtotal = price * quantity;
        row.cells[4].textContent = `₱${subtotal.toFixed(2)}`;
    });

    let total = Array.from(rows).reduce((acc, row) => {
        return acc + parseFloat(row.cells[4].textContent.replace("₱", "").replace(",", ""));
    }, 0);

    alert(`Total: ₱${total.toFixed(2)}`);
}
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simulate payment processing delay (2 seconds)
    setTimeout(function() {
        // Assume payment was successful
        // Display confirmation message
        alert('Payment processed successfully!');
        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    }, 2000);
});


// index.js
document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the form from submitting
    event.preventDefault();
  
    // Get the form inputs
    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="psw"]').value;
    var repeatPassword = document.querySelector('input[name="psw-repeat"]').value;
  
    // Validate the inputs
    if (!email || !password || !repeatPassword) {
        alert('Please fill out all fields.');
        return;
    }
  
    if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return;
    }
  
    // If validation passes, you can handle form submission here.
    // For example, you might send the form data to a server.
    console.log('Form submitted successfully.');
  
    // Clear the form
    document.querySelector('form').reset();
  });
  