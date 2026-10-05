const products=[
{id:1,name:"Noir Automatic",cat:"classic",price:395,img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80",desc:"Automatic · 40mm"},
{id:2,name:"Aurelia Gold",cat:"minimal",price:285,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",desc:"Quartz · 36mm",tag:"Bestseller"},
{id:3,name:"Atlas Chronograph",cat:"sport",price:520,img:"https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=700&q=80",desc:"Chronograph · 42mm"},
{id:4,name:"Linea Silver",cat:"minimal",price:240,img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=700&q=80",desc:"Quartz · 38mm"},
{id:5,name:"Heritage 1968",cat:"classic",price:450,img:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=700&q=80",desc:"Automatic · 39mm"},
{id:6,name:"Terra Field",cat:"sport",price:325,img:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=700&q=80",desc:"Automatic · 40mm",tag:"New"},
{id:7,name:"Eclipse Black",cat:"minimal",price:310,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",desc:"Quartz · 38mm"},
{id:8,name:"Regent Blue",cat:"classic",price:475,img:"https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=700&q=80",desc:"Automatic · 41mm"}
];
let cart=JSON.parse(localStorage.getItem("chronos-cart")||"[]");
const productsEl=document.getElementById("products");
const cartPanel=document.getElementById("cartPanel"),overlay=document.getElementById("overlay");
function renderProducts(filter="all",query=""){let list=products.filter(p=>(filter==="all"||p.cat===filter)&&(!query||p.name.toLowerCase().includes(query.toLowerCase())||p.cat.includes(query.toLowerCase())));productsEl.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image">${p.tag?`<span class="tag">${p.tag}</span>`:""}<img src="${p.img}" alt="${p.name}" loading="lazy"><button class="quick-add" onclick="addToCart(${p.id})">Add to bag +</button></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.desc}</p></div><span class="price">$ ${p.price}</span></div></article>`).join("")||'<p>No watches found.</p>'}
function addToCart(id){const p=products.find(x=>x.id===id),item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});saveCart();renderCart();toast(p.name+" added to your bag");}
function saveCart(){localStorage.setItem("chronos-cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function renderCart(){const el=document.getElementById("cartItems");if(!cart.length){el.innerHTML='<div style="text-align:center;padding:70px 20px;color:#888;font-size:12px">Your bag is empty.<br><br>Discover a watch worth keeping.</div>';document.getElementById("cartTotal").textContent="$0";return}el.innerHTML=cart.map(x=>`<div class="cart-row"><img src="${x.img}" alt=""><div><h4>${x.name}</h4><p>$ ${x.price} · Qty ${x.qty}</p><button class="remove" onclick="removeItem(${x.id})">Remove</button></div><strong>$ ${x.price*x.qty}</strong></div>`).join("");document.getElementById("cartTotal").textContent="$"+cart.reduce((a,x)=>a+x.price*x.qty,0)}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();renderCart()}
function openCart(){cartPanel.classList.add("open");overlay.classList.add("open")}
function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("open")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>cart.length?toast("Checkout is ready — connect your payment gateway to go live."):toast("Your bag is empty.");
const searchModal=document.getElementById("searchModal"),searchInput=document.getElementById("searchInput");
document.getElementById("searchBtn").onclick=()=>{searchModal.classList.add("open");setTimeout(()=>searchInput.focus(),100)};
document.getElementById("closeSearch").onclick=()=>searchModal.classList.remove("open");
searchInput.oninput=()=>renderProducts("all",searchInput.value);
document.getElementById("menuBtn").onclick=()=>{document.querySelector("nav").style.display=document.querySelector("nav").style.display==="flex"?"none":"flex";document.querySelector("nav").style.position="absolute";document.querySelector("nav").style.top="68px";document.querySelector("nav").style.left="0";document.querySelector("nav").style.right="0";document.querySelector("nav").style.padding="20px";document.querySelector("nav").style.background="#f4f2ed";document.querySelector("nav").style.flexDirection="column"};
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();toast("Thanks — you're on the list.");e.target.reset()};
renderProducts();saveCart();renderCart();