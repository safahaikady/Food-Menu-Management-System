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
            name: "Masala Dosa",
            price: 90,
            image: "images/masala-dosa.jpg"
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


/* ADD TO CART */
function addToCart(item, price){

    total += price;

    cart.push({ item, price });

    document.getElementById("total").innerText = total;

    let li = document.createElement("li");
    li.innerText = item + " - ₹" + price;
    document.getElementById("cart-items").appendChild(li);
}

/* GENERATE BILL */
function generateBill(){

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);

    window.location.href = "bill.html";
}

/* ADD ITEM */

function addItem(){

    let name = prompt("Enter Food Name");

    let price = prompt("Enter Price");

    let image = prompt("Enter Image Path\nExample: images/pizza.jpg");

    let menu = JSON.parse(localStorage.getItem("menu"));

    menu.push({

        name:name,
        price:price,
        image:image
    });

    localStorage.setItem("menu", JSON.stringify(menu));

    alert("✅ Item Added Successfully");
}


/* DELETE ITEM */
function deleteItem(){

    let name = prompt("Enter Food Name To Delete");

    let menu = JSON.parse(localStorage.getItem("menu"));

    // check if item exists
    let exists = menu.some(function(item){
        return item.name.toLowerCase() === name.toLowerCase();
    });

    if(!exists){
        alert("❌ Item not found in menu!");
        return;
    }

    let updatedMenu = menu.filter(function(item){
        return item.name.toLowerCase() !== name.toLowerCase();
    });

    localStorage.setItem("menu", JSON.stringify(updatedMenu));

    alert("❌ Item Deleted Successfully");
}


/* UPDATE PRICE */

function updatePrice(){

    let name = prompt("Enter Food Name");

    let newPrice = prompt("Enter New Price");

    let menu = JSON.parse(localStorage.getItem("menu"));

    menu.forEach(function(item){

        if(item.name == name){

            item.price = newPrice;
        }
    });

    localStorage.setItem("menu", JSON.stringify(menu));

    alert("✅ Price Updated Successfully");
}


/* EXIT */

function exitPanel(){

    window.location.href = "home.html";
}


/* AUTO LOAD MENU */

loadMenu();
fetch("http://localhost:5000")
.then(res => res.text())
.then(data => {
    console.log(data);
});