console.log("Eloria Maison website loaded successfully.");

// Eloria Maison - Wishlist

const heartButtons = document.querySelectorAll(".heart-btn");

heartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        if (icon.classList.contains("fa-solid")) {
            icon.style.color = "#b88b7e";
        } else {
            icon.style.color = "";
        }

    });

});
// ==============================
// ELORIA MAISON
// ==============================


// WISHLIST

const heartButtons = document.querySelectorAll(".heart-btn");

heartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const icon = button.querySelector("i");

        if (!icon) return;

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

    });

});


// SHOP FILTER

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".shop-product");

filters.forEach(function(filter) {

    filter.addEventListener("click", function() {

        filters.forEach(function(item) {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.category;

        products.forEach(function(product) {

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
// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        formMessage.textContent =
            "Thank you for contacting Eloria Maison. We'll be in touch soon.";

        contactForm.reset();

    });

}