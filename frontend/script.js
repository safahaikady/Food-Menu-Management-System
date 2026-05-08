let total = 0;
let cart=[];


/* DEFAULT MENU */

if(localStorage.getItem("menu") == null){

    let defaultMenu = [

        {
            name: "Chicken Biryani",
            price: 250,
            image: "images/chicken-biryani.jpg"
        },



        {
            name: "Paneer Butter Masala",
            price: 240,
            image: "images/paneer-butter-masala.jpg"
        },

        {
            name: "Gulab Jamun",
            price: 80,
            image: "images/gulab-jamun.jpg"
        }
    ];

    localStorage.setItem("menu", JSON.stringify(defaultMenu));
}


/* LOAD MENU */

function loadMenu(){

    let menu = JSON.parse(localStorage.getItem("menu"));

    let menuContainer = document.getElementById("menu-items");

    if(menuContainer == null){
        return;
    }

    menuContainer.innerHTML = "";

    menu.forEach(function(item,index){

        menuContainer.innerHTML += `

        <div class="food-card">

            <img src="${item.image}"
            onclick="addToCart('${item.name}',${item.price})">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="addToCart('${item.name}',${item.price})">
                Add to Cart
            </button>

        </div>
        `;
    });
}


/* ADMIN LOGIN */

function login(){

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if(username == "admin" && password == "1234"){

        document.getElementById("message").innerHTML =
        "✅ Login Successful";

        document.getElementById("message").style.color = "green";

        setTimeout(function(){

            window.location.href = "dashboard.html";

        },1000);
    }

    else{

        document.getElementById("message").innerHTML =
        "❌ Invalid Username or Password";

        document.getElementById("message").style.color = "red";
    }
}


// ADD TO CART
function addToCart(name, price){

    cart.push({

        name: name,
        price: price
    });

    total += price;

    displayCart();
}


// DISPLAY CART
function displayCart(){

    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    cart.forEach(function(item, index){

        let li = document.createElement("li");

        li.innerHTML = `

            ${item.name} - ₹${item.price}

            <button class="remove-btn" onclick="removeFromCart(${index})">
                 ❌
            </button>

        `;

        cartItems.appendChild(li);

    });

    document.getElementById("total").innerText = total;
}


// REMOVE ITEM
function removeFromCart(index){

    total -= cart[index].price;

    cart.splice(index, 1);

    displayCart();
}


// GENERATE BILL
function generateBill(){
    
    localStorage.setItem("cart", JSON.stringify(cart));

    localStorage.setItem("total", total);

    window.location.href = "bill.html";
}
/* ADD ITEM */

function addItem(){

    let name = prompt("Enter Food Name");

    if(name == null || name.trim() == ""){
        alert("❌ Food name cannot be empty");
        return;
    }

    name = name.trim();

    let price = prompt("Enter Price");

    if(price == null || price.trim() == ""){
        alert("❌ Price cannot be empty");
        return;
    }

    if(isNaN(price) || Number(price) <= 0){
        alert("❌ Enter valid price");
        return;
    }

    let image = prompt("Enter Image Path\nExample: images/pizza.jpg");

    if(image == null || image.trim() == ""){
        alert("❌ Image path cannot be empty");
        return;
    }

    image = image.trim();

    let menu = JSON.parse(localStorage.getItem("menu")) || [];

    // CHECK DUPLICATE ITEM
    let exists = menu.some(function(item){

        return item.name.toLowerCase() === name.toLowerCase();

    });

    if(exists){

        alert("❌ Same item already exists in menu");

        return;
    }

    // ADD NEW ITEM
    menu.push({

        name: name,
        price: Number(price),
        image: image
    });

    localStorage.setItem("menu", JSON.stringify(menu));

    alert("✅ Item Added Successfully");

    location.reload();
}
/* DELETE ITEM */

function deleteItem(){

    let name = prompt("Enter Food Name To Delete");

    if(name == null || name.trim() == ""){
        alert("❌ Food name cannot be empty");
        return;
    }

    let menu = JSON.parse(localStorage.getItem("menu"));

    // check if item exists
    let exists = menu.some(function(item){
        return item.name.toLowerCase() === name.toLowerCase();
    });

    if(!exists){
        alert("❌ Item not found in menu");
        return;
    }

    let updatedMenu = menu.filter(function(item){
        return item.name.toLowerCase() !== name.toLowerCase();
    });

    localStorage.setItem("menu", JSON.stringify(updatedMenu));

    alert("✅ Item Deleted Successfully");
}


/* UPDATE PRICE */

function updatePrice(){

    let name = prompt("Enter Food Name");

    if(name == null || name.trim() == ""){
        alert("❌ Food name cannot be empty");
        return;
    }

    let newPrice = prompt("Enter New Price");

    if(newPrice == null || newPrice.trim() == ""){
        alert("❌ Price cannot be empty");
        return;
    }

    if(isNaN(newPrice) || Number(newPrice) <= 0){
        alert("❌ Enter valid price");
        return;
    }

    let menu = JSON.parse(localStorage.getItem("menu"));

    let itemFound = false;

    menu.forEach(function(item){

        if(item.name.toLowerCase() === name.toLowerCase()){

            item.price = Number(newPrice);

            itemFound = true;
        }
    });

    if(itemFound){

        localStorage.setItem("menu", JSON.stringify(menu));

        alert("✅ Price Updated Successfully");
    }

    else{

        alert("❌ Item not found in menu");
    }
}

/* EXIT */

function exitPanel(){

    window.location.href = "index.html";
}


/* AUTO LOAD MENU */

loadMenu();
fetch("http://localhost:5000")
.then(res => res.text())
.then(data => {
    console.log(data);
});
fetch("http://localhost:5000/api/foods")
.then(res => res.json())
.then(data => {

    console.log(data);

});