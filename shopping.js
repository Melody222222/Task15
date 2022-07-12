//create variable to link to class element
let carts = document.querySelectorAll(".addToCart");
let vat = 0.15;
//variable products is array with objects inside
let products = [{
        name: "Occasional Chair",
        tag: 'occasionalChairS',
        price: 2500,
        inCart: 0,
        image: "furniture/dark-blue-navy-sapphire-color-260nw-1687941274.jpg"
    },
    {
        name: "Occasional Chair",
        tag: 'occasionalChairSapphire',
        price: 3500,
        inCart: 0,
        image: "furniture/classic-armchair-art-deco-style-260nw-1737097931.jpg"
    },
    {
        name: "Occasional Chair",
        tag: 'occasionalChair',
        price: 4500,
        inCart: 0,
        image: "furniture/comfortable-armchair-on-white-background-260nw-1039822120.jpg"
    },
    {
        name: "Occasional Chair",
        tag: 'occasionalChair',
        price: 5500,
        inCart: 0,
        image: "furniture/istockphoto-154926620-612x612.jpg"
    },
    {
        name: "Occasional Chair",
        tag: 'occasionalChair',
        price: 5700,
        inCart: 0,
        image: "furniture/istockphoto-1216618425-170667a.jpg"
    },
    {
        name: "Occasional Chair",
        tag: 'occasionalChair',
        price: 6500,
        inCart: 0,
        image: "furniture/istockphoto-869078270-612x612.jpg"
    },
];

//add event listener so whenever clicked does something
for (let i = 0; i < carts.length; i++) {
    //grab cart and i will allow to grab everything in cart, then add event listener to apply to entire cart
    carts[i].addEventListener('click', () => { //whenever clicked, apply function block
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
};

function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}
//create function to add info to local storage
function cartNumbers(product) {
    //create variable to update cart numbers if increased or decreased
    let productNumbers = sessionStorage.getItem('cartNumbers');

    //convert string to number with parseInt
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
        alert(product.price * productNumbers);
    } else {
        sessionStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                //... rest operator- add in all values of array 
                ...cartItems,
                [product.tag]: product
            }

        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    let cartCost = sessionStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        sessionStorage.setItem("totalCost", cartCost + product.price);

    } else {
        sessionStorage.setItem("totalCost", product.price);
    }

};

let cartItems = sessionStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".products");
cartCost = Number(sessionStorage.getItem('totalCost'));
let cartwithVat = (cartCost * vat) + cartCost;
sessionStorage.setItem('totalWithVat', cartwithVat)
if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += ` 
        <div class="products">
        <img src=${item.image}><br> 
        <span>${item.name}</div>
        <div class="price">R${item.price}.00</div>
        <div class="quantity">Quantity: ${item.inCart}</div>
        <div class="total">(Vat) R${ (vat) * item.inCart * item.price}.00</div><br>`
    });

    productContainer.innerHTML += ` <div class="basketTotalContainer"><p class="basketTotalTitle">
        Basket Total:</p>
        R${cartCost}.00<p class="basketTotal">Vat inclusive R${cartwithVat}.00</p><p></p>`

}



onLoadCartNumbers();

//Jquery functions 
$(document).ready(function () {
    $(".furnitureImage").animate({
        height: '350px',
        width: '350px'
    }, 1500);
    $(".addToCart").animate({
        padding: "2px"
    }, 1500);
    $("p").animate({
        fontSize: "26px",
        "margin-left": "100px"
    }, 2000);
});

$(document).ready(function () {
    $('.list').hover(function () {
        $('.list').animate({
            fontSize: "30px"
        });
        $('.list').hover(function () {
            $('.subMenu').animate({
                fontSize: "30px"
            });
        });
    });
});
$("#logoImg").mouseenter(function () {
    $("#logoImg").show(2000);

    $("#logoImg").hover(function () {
        $("#logoImg").hide(2000);
    });

});

$(document).ready(function () {
    $(".furnitureImage").animate({
        height: '350px',
        width: '350px'
    }, 1500);
    $("p").animate({
        padding: "2px"
    }, 1500);
    $("p").css({
        fontSize: "22px"
    }, 1200);
});

//$(document).ready(function () {
$('.menu').hover(function () {
    $('.subMenu').slideDown(1000)

    $('.menu').hover(function () {
        $('.subMenu').slideUp(1000);
    });
});
function checkDiscount() {
    let cartAnswer4 = document.getElementById("cartAnswer4");
let discountApplied = 0.10
let cartAllInclusive = (cartwithVat * discountApplied) - (discountApplied) + discountApplied;
sessionStorage.setItem("answer", cartAllInclusive);
let applyCode = document.getElementById("discountCode").value;
let calculateTotal = cartwithVat - cartAllInclusive;
sessionStorage.setItem("feedback", calculateTotal);

    if (applyCode === "101010") {
        alert("Yay! your discount is R" + cartAllInclusive+".00")
        cartAnswer4.innerHTML += `Total discount R${cartAllInclusive}.00`
 
    }// else if (applyCode != "101010") {
       // alert("this code is invalid")
    //};
   
};


//adding delivery cost to total function
function chargeDelivery() {
    let delivery = document.getElementById("deliveryCharge");
    let deliveryFee = 100
    let totalCostwithDel = deliveryFee + cartwithVat;
    let cartAnswer3 = document.getElementById("cartAnswer3")
    if ('click', delivery)

        cartAnswer3.innerHTML += `Total with Delivery R${totalCostwithDel}.00`
}

//click for reference upon order submit button clicked
function getClickID() {
    const generate = Math.floor(Math.random() * (800 - 1));
    alert("Order Confirmed. Your Order Number is " + generate);

}