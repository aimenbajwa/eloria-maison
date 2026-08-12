console.log("Eloria Maison website loaded successfully.");


// ==========================================
// ELORIA MAISON
// WISHLIST
// ==========================================

const heartButtons = document.querySelectorAll(".heart-btn");

heartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon = button.querySelector("i");

        if (!icon) return;

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        if (icon.classList.contains("fa-solid")) {
            icon.style.color = "#b88b7e";
        } else {
            icon.style.color = "";
        }

    });

});


// ==========================================
// SHOP FILTER
// ==========================================

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".shop-product");

filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        filters.forEach(function (item) {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.category;

        products.forEach(function (product) {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

});


// ==========================================
// ADD TO BAG
// ==========================================

// ==========================================
// ELORIA MAISON CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("eloriaCart")) || [];


// UPDATE CART COUNT
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.length;
}


// ADD TO CART
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = {
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image
        };

        cart.push(product);

        localStorage.setItem(
            "eloriaCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        // Luxury button feedback
        const originalText = button.textContent;

        button.textContent = "ADDED TO BAG ✓";

        button.classList.add("added");

        setTimeout(function() {

            button.textContent = originalText;

            button.classList.remove("added");

        }, 1500);

        console.log("Added:", product);

    });

});


// LOAD CART COUNT
updateCartCount();




// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (formMessage) {

            formMessage.textContent =
                "Thank you for contacting Eloria Maison. We'll be in touch soon.";

        }

        contactForm.reset();

    });

}
// ==========================================
// CART PAGE
// ==========================================

const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotalElement = document.getElementById("cartTotal");
const cartGrandTotalElement = document.getElementById("cartGrandTotal");

function displayCart() {

    if (!cartItemsContainer) return;

    const savedCart =
        JSON.parse(localStorage.getItem("eloriaCart")) || [];

    cartItemsContainer.innerHTML = "";

    // EMPTY CART
    if (savedCart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>

                <h2>Your bag is empty</h2>

                <p>
                    Discover something beautiful from Eloria Maison.
                </p>

                <a href="shop.html">CONTINUE SHOPPING</a>
            </div>
        `;

        if (cartSubtotalElement) {
            cartSubtotalElement.textContent = "Rs. 0";
        }

        if (cartGrandTotalElement) {
            cartGrandTotalElement.textContent = "Rs. 0";
        }

        return;
    }

    // CALCULATE TOTAL
    let total = 0;

    savedCart.forEach(function (product, index) {

        total += Number(product.price);

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">
                <h3>${product.name}</h3>

                <p>
                    Rs. ${Number(product.price).toLocaleString()}
                </p>
            </div>

            <button class="remove-item" data-index="${index}">
                REMOVE
            </button>
        `;

        cartItemsContainer.appendChild(item);

    });

    // UPDATE SUBTOTAL
    if (cartSubtotalElement) {
        cartSubtotalElement.textContent =
            "Rs. " + total.toLocaleString();
    }

    // UPDATE GRAND TOTAL
    if (cartGrandTotalElement) {
        cartGrandTotalElement.textContent =
            "Rs. " + total.toLocaleString();
    }

    // REMOVE ITEMS
    const removeButtons =
        document.querySelectorAll(".remove-item");

    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

            savedCart.splice(index, 1);

            localStorage.setItem(
                "eloriaCart",
                JSON.stringify(savedCart)
            );

            displayCart();
            updateCartCount();

        });

    });

}

displayCart();
