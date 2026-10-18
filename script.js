const PHONE="2250545239483";
const products=[
{id:1,name:"Air Urban Red",cat:"TN",gender:"Homme",price:45000,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",desc:"Une silhouette urbaine forte pour les looks street.",badge:"NEW"},
{id:2,name:"Classic Street",cat:"Homme",gender:"Homme",price:38000,img:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=85",desc:"Un modèle polyvalent pour un style quotidien.",badge:"HOT"},
{id:3,name:"Jordan Legacy",cat:"Jordan",gender:"Homme",price:55000,img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85",desc:"Une inspiration basketball au caractère premium.",badge:"DROP"},
{id:4,name:"Cream Runner",cat:"Femme",gender:"Femme",price:42000,img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",desc:"Une paire claire et élégante.",badge:"NEW"},
{id:5,name:"Urban Black",cat:"TN",gender:"Femme",price:48000,img:"https://images.unsplash.com/photo-1600269452121-4f2416e9a2b0?auto=format&fit=crop&w=800&q=85",desc:"Noir profond et attitude urbaine.",badge:"BEST"},
{id:6,name:"Brown Essential",cat:"Homme",gender:"Homme",price:40000,img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=85",desc:"Palette chaude et style contemporain.",badge:"EDIT"},
{id:7,name:"Street Rose",cat:"Femme",gender:"Femme",price:43000,img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=85",desc:"Une touche féminine dans une silhouette street.",badge:"NEW"},
{id:8,name:"Jordan Dark",cat:"Jordan",gender:"Homme",price:60000,img:"https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=85",desc:"Un modèle sombre au caractère premium.",badge:"LIMITED"}];
let cart=JSON.parse(localStorage.getItem("byashop-cart")||"[]"),selected=null;
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function renderProducts(filter="Tous"){const list=filter==="Tous"?products:products.filter(p=>p.cat===filter||p.gender===filter);document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="product-card" onclick="openProduct(${p.id})"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="badge">${p.badge}</span><button class="quick" onclick="event.stopPropagation();addToCart(${p.id})">+</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.cat} • ${p.gender}</p><span class="product-price">${money(p.price)}</span></div></article>`).join("")}
function addToCart(id,size="42"){let p=products.find(x=>x.id===id),e=cart.find(x=>x.id===id&&x.size===size);e?e.qty++:cart.push({id,size,qty:1});save();toast("Ajouté au panier ✓")}
function removeItem(i){cart.splice(i,1);save()}
function save(){localStorage.setItem("byashop-cart",JSON.stringify(cart));renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);let total=0;document.getElementById("cartItems").innerHTML=cart.length?cart.map((x,i)=>{let p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cartrow"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>Taille ${x.size} • Qté ${x.qty}</p><p>${money(p.price*x.qty)}</p></div><button class="remove" onclick="removeItem(${i})">Supprimer</button></div>`}).join(""):'<p style="text-align:center;color:#8d817a;font-size:12px;margin-top:40px">Ton panier est vide.</p>';document.getElementById("cartTotal").textContent=money(total)}
function openProduct(id){selected=products.find(p=>p.id===id);document.getElementById("modalImg").src=selected.img;document.getElementById("modalName").textContent=selected.name;document.getElementById("modalCategory").textContent=selected.cat+" • "+selected.gender;document.getElementById("modalPrice").textContent=money(selected.price);document.getElementById("modalDescription").textContent=selected.desc;document.getElementById("productModal").classList.add("open")}
function closeProduct(){document.getElementById("productModal").classList.remove("open")}
function openWhatsApp(msg){window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank","noopener")}
function toast(t){let e=document.getElementById("toast");e.textContent=t;e.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>e.classList.remove("show"),2200)}
document.getElementById("menuBtn").onclick=()=>{let m=document.getElementById("mobileMenu"),b=document.getElementById("menuBtn");let o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)}
document.querySelectorAll(".mobile-menu a").forEach(a=>a.onclick=()=>document.getElementById("mobileMenu").classList.remove("open"));
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{let f=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===f));renderProducts(f);document.getElementById("nouveautes").scrollIntoView({behavior:"smooth"})});
document.getElementById("cartBtn").onclick=()=>{document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("open")};
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("backdrop").classList.remove("open")}
document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;
document.getElementById("closeProduct").onclick=closeProduct;
document.getElementById("modalAdd").onclick=()=>{if(selected)addToCart(selected.id,document.getElementById("sizeSelect").value);closeProduct()};
document.getElementById("modalWhatsApp").onclick=()=>{if(selected)openWhatsApp(`Bonjour ByaShop 👋
Je suis intéressé(e) par : ${selected.name}
Taille : ${document.getElementById("sizeSelect").value}
Prix affiché : ${money(selected.price)}
Pouvez-vous confirmer la disponibilité ?`)};
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length){toast("Ton panier est vide");return}let lines=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `• ${p.name} — taille ${x.size} — x${x.qty}`}).join("\n");let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);openWhatsApp(`Bonjour ByaShop 👋
Je souhaite commander :
${lines}

Total affiché : ${money(total)}
Merci de confirmer la disponibilité et la livraison.`)};
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchOverlay").classList.add("open");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchOverlay").classList.remove("open");
document.getElementById("searchInput").oninput=e=>{let q=e.target.value.toLowerCase().trim(),r=document.getElementById("searchResult");if(!q){r.textContent="Commence à taper pour rechercher.";return}let f=products.filter(p=>(p.name+" "+p.cat+" "+p.gender).toLowerCase().includes(q));r.textContent=f.length?`${f.length} modèle(s) trouvé(s) : ${f.map(p=>p.name).join(", ")}`:"Aucun modèle dans la démo. Essaie Jordan, TN, homme ou femme."};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeProduct();closeCart();document.getElementById("searchOverlay").classList.remove("open")}});
document.getElementById("year").textContent=new Date().getFullYear();renderProducts();renderCart();