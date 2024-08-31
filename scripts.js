document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const dropdown = document.querySelector('.dropdown');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productCards = document.querySelectorAll('.product-card');
    const cart = [];
    const cartSection = document.querySelector('.cart p');
    const homebutton = document.querySelector('.home-button');
    const moreProductsButton = document.querySelector('.more-products-button');
    const accountButton = document.querySelector('.account-button');

    // Toggle menu dropdown
    menuButton.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Scroll to top button functionality
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', () => {
            const productCard = productCards[index];
            const product = {
                title: productCard.querySelector('h3').innerText,
                price: productCard.querySelector('p').innerText,
                image: productCard.querySelector('img').src
            };
            cart.push(product);
            updateCart();
            alert(`${product.title} added to cart!`);
        });
    });

    // View details functionality
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productDetailsSection = document.getElementById(`product-details-${productId}`);
            if (productDetailsSection) {
                productDetailsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Remove from cart functionality
    function removeFromCart(index) {
        const product = cart[index];
        cart.splice(index, 1);
        updateCart();
        alert(`${product.title} removed from cart!`);
    }

    // Update cart display
    function updateCart() {
        if (cart.length > 0) {
            cartSection.innerHTML = '';
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <p>${product.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartSection.appendChild(cartItem);
            });
            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    removeFromCart(index);
                });
            });
        } else {
            cartSection.innerHTML = 'No items in cart.';
        }
    }

    //Home button functionality
    if (homebutton) {
        homebutton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    //More button functionality
    if (moreProductsButton) {
        moreProductsButton.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    if (accountButton) {
        accountButton.addEventListener('click', () => {
            window.location.href = 'account.html';
        });
    }

});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#001f3f",
"#002a58",
"#003371",
"#003c8a",
"#0046a3",
"#0050bc",
"#005ad5",
"#0063ee",
"#007cff",
"#3398ff",
"#66b5ff",
"#99d1ff",
"#cceeff"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();
