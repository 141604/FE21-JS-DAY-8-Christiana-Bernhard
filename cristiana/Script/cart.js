var products = [
    {
        name: "Red Roses",
        image: "Images/rose-3407234__340.webp",
        price: 8.99,
        qtty: 1
    },
    {
        name: "Orange Rose",
        image: "Images/rose-3063284__340.webp",
        price: 7.80,
        qtty: 1
    },
    {
        name: "Pink Rose",
        image: "Images/flowers-1405552__340.webp",
        price: 9.00,
        qtty: 1
    },
    {
        name: "Imperial Lily",
        image: "Images/david-lily-3491819__340.webp",
        price: 12.80,
        qtty: 1
    },
    {
        name: "White Lily",
        image: "Images/lily-3763573__340.webp",
        price: 7.90,
        qtty: 1
    },
    {
        name: "Orange Lily",
        image: "Images/lily-3520837__340.webp",
        price: 7.90,
        qtty: 1
    },
    {
        name: "Imperial Tulip",
        image: "Images/tulip-670643__340.webp",
        price: 15.00,
        qtty: 1
    },
    {
        name: "Pink Tulip",
        image: "Images/tulips-4072214__340.webp",
        price: 12.90,
        qtty: 1
    },
    {
        name: "White Tulip",
        image: "Images/tulip-3366301__340.webp",
        price: 11.90,
        qtty: 1
    }

];


// printing all flowers in HTML
for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
    <p class="product-price h4 m-3">${val.price} €</p>
    <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `
}

// adding events to button element with "product-button" class

let btns = document.getElementsByClassName("product-button");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i], i);
    })
}

// creating addToCart function - adds selected flowers to "ADD TO CART" button

var cart = [];
function addToCart(product, index) {
    if (cart.length == 0) {
        cart.push(product);
    } else { // correction - the provided solution was using product index into the cart index, which are two separate sized arrays => this was causing an error whenever the product index was greater than cart.length
        let foundProduct= cart.find((val) => val.name == product.name ); // find() - Returns the array element value if any of the elements in the array pass the test, otherwise it returns undefined (array method)
        if (foundProduct){
            foundProduct.qtty++;
        } else {
            cart.push(product);
        }
    }
    console.table(cart);
    createRows();// print in HTML the items added to cart
    Total();
} 

// creating the createRows() function  - will show the cart items in HTML element with id "cart-items"
function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
        <div class="cart-row row d-flex">
            <div class ="cart-item col-6 my-3">
                <img class="cart-item-image" src="${val.image}" width="100" height="100">
                <span class="cart-item-title h5">${val.name}</span>
            </div>

            <span class="cart-price col-3 h4 my-3">${val.price} €</span>

            <div class="cart-qtty-action col-3 d-flex">
                <i class="minus fa fa-minus-circle my-auto"></i>
                <div class="cart-quantity p-4 h4">${val.qtty}</div>

                <i class="plus fa fa-plus-circle my-auto"></i>
                <button class="del btn btn-danger rounded-circle my-auto ms-3 fw-bold" type="button"> X </button>
            </div>
        </div>
        `;
    }
    document.getElementById("cart-items").innerHTML= result;
    // activating the plus, minus and delete buttons, available in the quantity column
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i< plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();
        });
    }
} 

// calculates the total sum of the added to cart items
function Total() {
    let total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }
    document.getElementById("price").innerHTML = total.toFixed(2) + " €";

    if (total > 100) { //discount
        document.getElementById("discountprice").innerHTML= (10 * total / 100).toFixed(2) + " €";
        document.getElementById("finalamount").innerHTML= (total - (10 * total / 100)).toFixed(2) + " €";
    } else {
        document.getElementById("discountprice").innerHTML= 0 + " €";
        document.getElementById("finalamount").innerHTML= total.toFixed(2) + " €";
    }

}

// prints in HTML whenever the plus button is clicked
function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

// prints in HTML whenever the minus button is clicked
function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

// deletes the + or - added elements
function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

