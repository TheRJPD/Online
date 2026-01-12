const menuData={
"Paneer Tikka":{price:250},
"Shahi Paneer":{price:320}
};

let cart=JSON.parse(localStorage.getItem("cart"))||{};

function changeQty(item,delta){
cart[item]=(cart[item]||0)+delta;
if(cart[item]<=0) delete cart[item];
saveCart();
}

function updateMenuQty(){
Object.keys(menuData).forEach(i=>{
const el=document.getElementById("qty-"+i);
if(el) el.innerText=cart[i]||0;
});
}

function renderCart(){
const box=document.getElementById("cartItems");
const totalEl=document.getElementById("cartPageTotal");
if(!box||!totalEl) return;
box.innerHTML="";
let total=0;
Object.keys(cart).forEach(i=>{
const qty=cart[i],price=menuData[i].price;
total+=price*qty;
box.innerHTML+=`<p>${i} x ${qty} = ₹${price*qty}</p>`;
});
totalEl.innerText=`₹${total}`;
}

function updateCartTotalUI(){
let total=0;
Object.keys(cart).forEach(i=>total+=menuData[i].price*cart[i]);
const el=document.getElementById("cartTotal");
if(el) el.innerText=`₹${total}`;
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
updateMenuQty();
renderCart();
updateCartTotalUI();
}

function orderWhatsApp(){
let msg="Order from The Rajputana Darbar:%0A";
let total=0;
Object.keys(cart).forEach(i=>{
msg+=`${i} x ${cart[i]}%0A`;
total+=menuData[i].price*cart[i];
});
msg+=`Total: ₹${total}`;
window.open("https://wa.me/91XXXXXXXXXX?text="+msg);
clearCart();
}

function orderEmail(){
let body="";
let total=0;
Object.keys(cart).forEach(i=>{
body+=`${i} x ${cart[i]}\n`;
total+=menuData[i].price*cart[i];
});
body+=`Total: ₹${total}`;
window.location.href=`mailto:your@email.com?subject=New Order&body=${encodeURIComponent(body)}`;
clearCart();
}

function clearCart(){
cart={};
localStorage.removeItem("cart");
saveCart();
}

document.addEventListener("DOMContentLoaded",()=>{
updateMenuQty();
renderCart();
updateCartTotalUI();
});