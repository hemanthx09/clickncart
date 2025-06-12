





/* search box matching word*/ 
// script.js

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  productCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(searchValue) ? "block" : "none";
  });
});

// cartitems
let cartItems = [];
let currentProduct = {};
/**/ 
function showProductDetail(title, price, desc, imageSrc) {
  currentProduct = { title, price, imageSrc };
  document.getElementById('detailTitle').textContent = title;
  document.getElementById('detailPrice').textContent = price;
  document.getElementById('detailDesc').textContent = desc;
  document.getElementById('detailImage').src = imageSrc;

  const detailSection = document.getElementById('productDetail');
  detailSection.classList.add('show');

  const overlay = document.getElementById('overlay');
  overlay.classList.add('show');
  document.getElementById("productDetail").classList.add("show");
}
//add item to cart
function addToCart() {
  cartItems.push(currentProduct);
  alert(`${currentProduct.title} added to cart! 🛒`);
  updateCartUI(); // Optional step to display the cart
   saveCartToStorage();
  document.getElementById("cart").classList.add("show");
}

//remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
  saveCartToStorage(); // 💾 Save again after remove
}

function saveCartToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


//filter products
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category');

    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


/*close the product detail page*/ 
document.getElementById('closeDetail').addEventListener('click', function () {
  document.getElementById('productDetail').classList.remove('show');
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.classList.remove('show');
});

/* add tab logic */
function showTab(tabId) {
  // Hide all tab contents
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(c => c.style.display = 'none');

  // Remove active from all buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  // Show selected tab + set active button
  document.getElementById(tabId).style.display = 'block';
  event.target.classList.add('active');
}
/* animation for tab switch */
function showTab(tabId) {
  // Hide all tab contents
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(c => {
    c.style.display = 'none';
    // Reset animation
    const p = c.querySelector('p');
    if (p) p.style.animation = 'none';
  });

  // Remove active from all buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  // Show selected tab + set active button
  const selectedTab = document.getElementById(tabId);
  selectedTab.style.display = 'block';

  // Re-trigger animation
  const activeP = selectedTab.querySelector('p');
  if (activeP) {
    setTimeout(() => {
      activeP.style.animation = 'boomIn 0.5s ease forwards';
    }, 10); // small delay to reset animation
  }

  event.target.classList.add('active');
}

//update cart ui
function updateCartUI() {
  const list = document.getElementById("cartList");
  const total = document.getElementById("cartTotal");
  list.innerHTML = "";
  let sum = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title} - ${item.price}
      <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
    `;
    list.appendChild(li);

    sum += parseInt(item.price.replace(/[^\d]/g, ""));
  });

  total.textContent = sum;
}
//removefrom cart item
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}
//close cart button
function closeCart() {
  document.getElementById("cart").classList.remove("show");
}

//logic to toggle the cart
document.getElementById("cartToggleBtn").addEventListener("click", () => {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show");
});

//DOMcontent loaded
window.addEventListener("DOMContentLoaded", () => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartUI();
  }
});
