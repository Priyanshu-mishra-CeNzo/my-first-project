javascript

// SOAP SHOP JAVASCRIPT



// CART

let cart = [];


// GET ELEMENTS

const productContainer =
    document.getElementById("productContainer");

const cartButton =
    document.getElementById("cartButton");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const searchInput =
    document.getElementById("searchInput");



// GET PRODUCTS FROM HTML


function getProducts() {

    const cards =
        document.querySelectorAll(".product-card");

    const products = [];

    cards.forEach(function(card, index) {

        const name =
            card.getAttribute("data-name");

        const price =
            Number(card.getAttribute("data-price"));

        const icon =
            card.querySelector(".product-image").textContent.trim();

        products.push({

            id: index + 1,

            name: name,

            price: price,

            icon: icon

        });

    });

    return products;
}



// ADD PRODUCT TO CART


function addToCart(product) {

    const existing =
        cart.find(function(item) {

            return item.id === product.id;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            icon: product.icon,

            quantity: 1

        });

    }


    updateCart();


    alert(
        product.name +
        " added to cart! 🛒"
    );
}



// UPDATE CART


function updateCart() {

    cartItems.innerHTML = "";


    let itemCount = 0;

    let total = 0;


    cart.forEach(function(item) {

        itemCount += item.quantity;

        total +=
            item.price * item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = 

            <div class="cart-item-name">

                <strong>
                    ${item.icon} ${item.name}
                </strong>

                <small>
                    Rs. ${item.price}
                </small>

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>


            <button
                class="remove-button"
                onclick="removeProduct(${item.id})">

                Remove

            </button>

        `;


        cartItems.appendChild(div);

    


    if (cart.length === 0) 

        cartItems.innerHTML = `

            <p style="
                text-align:center;
                padding:30px;
                color:#777;
            ">

                Your cart is empty 🛒

            </p>

        ;

    }


    cartCount.textContent =
        itemCount;


    cartTotal.textContent =
        total.toLocaleString();

}


// CHANGE QUANTITY


function changeQuantity(productId, amount) {

    const item =
        cart.find(function(product) {

            return product.id === productId;

        });


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(product) {

                return product.id !== productId;

            });

    }


    updateCart();
}



// REMOVE PRODUCT


function removeProduct(productId) {

    cart =
        cart.filter(function(product) {

            return product.id !== productId;

        });


    updateCart();

}


// ADD BUTTONS


function setupAddButtons() {

    const cards =
        document.querySelectorAll(".product-card");


    cards.forEach(function(card, index) {

        const button =
            card.querySelector(".add-button");


        button.addEventListener(
            "click",
            function() {

                const product = {

                    id: index + 1,

                    name:
                        card.getAttribute(
                            "data-name"
                        ),

                    price:
                        Number(
                            card.getAttribute(
                                "data-price"
                            )
                        ),

                    icon:
                        card.querySelector(
                            ".product-image"
                        ).textContent.trim()

                };


                addToCart(product);

            }
        );

    });

}


// OPEN CART


cartButton.addEventListener(
    "click",
    function() {

        cartModal.style.display = "flex";

    }
);



// CLOSE CART


closeCart.addEventListener(
    "click",
    function() {

        cartModal.style.display = "none";

    }
);



// CLOSE MODAL OUTSIDE


cartModal.addEventListener(
    "click",
    function(event) {

        if (event.target === cartModal) {

            cartModal.style.display = "none";

        }

    }
);



// CHECKOUT

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty! 🛒"
            );

            return;
        }


        let total = 0;


        cart.forEach(function(item) {

            total +=
                item.price * item.quantity;

        });


        alert(

            "🎉 Thank you for your order!\n\n" +

            "Order Total: Rs. " +

            total.toLocaleString() +

            "\n\n" +

            "We will contact you to confirm your order."

        );

    }
);



// SEARCH PRODUCTS


searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            this.value.toLowerCase().trim();


        const cards =
            document.querySelectorAll(".product-card");


        cards.forEach(function(card) {

            const productName =
                card.getAttribute(
                    "data-name"
                ).toLowerCase();


            if (
                productName.includes(
                    searchText
                )
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }
);



// START WEBSITE

setupAddButtons();

updateCart();
