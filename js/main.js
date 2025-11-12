"use strict";

// SELECTORES
const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const productsSection = document.querySelector(".js-products");
const cartList = document.querySelector(".js-cart-list");

// VARIABLES GLOBALES
let products = [];
let cart = []; //Productos añadidos al carrito

// FUNCIONES

// Obtener productos desde la API
function getProductsFromAPI() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    });
}

// Renderizar los productos en pantalla
function renderProducts(productList) {
  let html = "";

  for (const product of productList) {
    let image;
    if (product.image) {
      image = product.image;
    } else {
      image = "https://placehold.co/200x150";
    }

    //Comprobar si el producto ya está en el carrito
    const isInCart = cart.some((item) => item.id === product.id);

    html += `
      <article class="product">
        <img class="product__img" src="${image}" alt="${product.title}">
        <h3 class="product__title">${product.title}</h3>
        <p class="product__price">${product.price.toFixed(2)} €</p>
        <button 
          class="product__btn js-add-btn ${isInCart ? "in-cart" : ""}" 
          data-id="${product.id}">
          ${isInCart ? "Eliminar" : "Comprar"}
        </button>
      </article>
    `;
  }

  productsSection.innerHTML = html;

  // Añadir eventos a cada botón
  const addButtons = document.querySelectorAll(".js-add-btn");
  for (const button of addButtons) {
    button.addEventListener("click", handleToggleCart);
  }
}

// Renderizar el carrito
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

// Añadir o eliminar producto del carrito
function handleToggleCart(event) {
  const productId = parseInt(event.currentTarget.dataset.id);
  const selectedProduct = products.find((product) => product.id === productId);
  const indexInCart = cart.findIndex((item) => item.id === productId);

  if (indexInCart === -1) {
    // No está en el carrito → lo añadimos
    cart.push(selectedProduct);
  } else {
    // Ya está en el carrito → lo eliminamos
    cart.splice(indexInCart, 1);
  }

  // Volvemos a renderizar productos y carrito
  renderProducts(products);
  renderCart();
}

// Buscar producto por texto
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
