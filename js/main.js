"use strict";

// SELECTORES
const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const productsSection = document.querySelector(".js-products");
const cartList = document.querySelector(".js-cart-list");

// VARIABLES GLOBALES
let products = [];
let cart = [];

// FUNCIONES

function getProductsFromAPI() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    });
}

function renderProducts(productList) {
  let html = "";

  for (const product of productList) {
    let image;
    if (product.image) {
      image = product.image;
    } else {
      image = "https://placehold.co/200x150";
    }

    html += `
      <article class="product">
        <img class="product__img" src="${image}" alt="${product.title}">
        <h3 class="product__title">${product.title}</h3>
        <p class="product__price">${product.price.toFixed(2)} €</p>
        <button class="product__btn js-add-btn" data-id="${
          product.id
        }">Comprar</button>
      </article>
    `;
  }

  productsSection.innerHTML = html;

  const addButtons = document.querySelectorAll(".js-add-btn");
  for (const button of addButtons) {
    button.addEventListener("click", handleAddToCart);
  }
}

function renderCart() {
  let html = "";

  if (cart.length === 0) {
    html = `<li class="cart__item--empty">Tu carrito está vacío</li>`;
  } else {
    for (const item of cart) {
      html += `<li class="cart__item">${item.title} - ${item.price.toFixed(
        2
      )} €</li>`;
    }
  }

  cartList.innerHTML = html;
}

function handleAddToCart(event) {
  const productId = parseInt(event.currentTarget.dataset.id);
  const selectedProduct = products.find((product) => product.id === productId);

  if (selectedProduct) {
    cart.push(selectedProduct);
    renderCart();
  }
}

function handleSearch() {
  const searchText = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText)
  );

  renderProducts(filteredProducts);
}

// EVENTOS
searchBtn.addEventListener("click", handleSearch);

// CÓDIGO AL CARGAR LA PÁGINA
getProductsFromAPI();
renderCart();
