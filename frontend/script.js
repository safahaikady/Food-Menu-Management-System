let total = 0;
let cart=[];


/* DEFAULT MENU */




function loadMenu(){

fetch("http://localhost:5000/api/foods")
.then(res => res.json())
.then(menu => {

    let menuContainer = document.getElementById("menu-items");

    if(menuContainer == null){
        return;
    }

    menuContainer.innerHTML = "";

    menu.forEach(function(item){

        menuContainer.innerHTML += `
        <div class="food-card">

            <img src="${item.image}"
            onclick="addToCart('${item.name}',${item.price})">
            <p>ID: ${item.id}</p>   
            <h3>${item.name}</h3>

            <p>₹${item.price}</p>
            

            <button onclick="addToCart('${item.name}',${item.price})">
                Add to Cart
            </button>

        </div>
        `;
    });

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

    let existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity += 1;

    }

    else{

        cart.push({

            name: name,
            price: price,
            quantity: 1
        });

    }

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

    ${item.name} x ${item.quantity}
    - ₹${item.price * item.quantity}

    <button class="remove-btn" onclick="removeFromCart(${index})">
         ❌
    </button>

`;

        cartItems.appendChild(li);

    });

    document.getElementById("total").innerText = total;
}


function removeFromCart(index){

    total -= cart[index].price;

    cart[index].quantity -= 1;

    if(cart[index].quantity === 0){

        cart.splice(index, 1);

    }

    displayCart();
}

// GENERATE BILL
function generateBill(){

    if(cart.length === 0){

        alert("❌ Cart is empty");

        return;
    }

    let customerName = prompt("Enter Customer Name");

    if(!customerName || customerName.trim() === ""){

        alert("❌ Customer name required");

        return;
    }

    fetch("http://localhost:5000/api/orders/place", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            customer_name: customerName,
            items: cart,
            total: total
        })

    })

    .then(res => res.json())

    .then(data => {
        if(data.message){
            alert(data.message);
        }
        localStorage.setItem("customerName", customerName);

        localStorage.setItem("cart", JSON.stringify(cart));

        localStorage.setItem("total", total);

        window.location.href = "bill.html";

    });

}
function addItem(){

    let name = prompt("Enter Food Name");

    if(name == null || name.trim() == ""){
        alert("❌ Food name cannot be empty");
        return;
    }

    let price = prompt("Enter Price");

    if(price == null || price.trim() == ""){
        alert("❌ Price cannot be empty");
        return;
    }

    if(isNaN(price) || Number(price) <= 0){
        alert("❌ Enter valid price");
        return;
    }

    let image = prompt("Enter Image Path");

    if(image == null || image.trim() == ""){
        alert("❌ Image path cannot be empty");
        return;
    }

    fetch("http://localhost:5000/api/foods", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            price: Number(price),
            image: image
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadMenu();

    });

}
/* DELETE ITEM */

function deleteItem(){

    let id = prompt("Enter Food ID To Delete");

    if(!id || isNaN(id)){
        alert("❌ Enter valid ID");
        return;
    }

    fetch(`http://localhost:5000/api/foods/${id}`, {

        method: "DELETE"

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadMenu();

    });

}
function updatePrice(){

    let id = prompt("Enter Food ID");

    if(!id || isNaN(id)){
        alert("❌ Enter valid ID");
        return;
    }

    let newPrice = prompt("Enter New Price");

    if(!newPrice || isNaN(newPrice)){
        alert("❌ Enter valid price");
        return;
    }

    fetch(`http://localhost:5000/api/foods/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            price: Number(newPrice)
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadMenu();

    });

}
/* EXIT */

function exitPanel(){

    window.location.href = "index.html";
}


/* AUTO LOAD MENU */

loadMenu();

fetch("http://localhost:5000/api/foods")
.then(res => res.json())
.then(data => {

    console.log(data);

});