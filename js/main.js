"use strict";

// SELECTORES
const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const productsSection = document.querySelector(".js-products");

// VARIABLES GLOBALES

let products = [];

// FUNCIONES

function getProductsFromAPI() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    });
}

function renderProducts(productsList) {
  const defaultImage = "https://via.placeholder.com/150?text=No+image";
  let html = "";
  for (const product of productsList) {
    let image;
    if (product.image) {
      image = product.image;
    } else {
      image = defaultImage;
    }

    html += `
      <article class="product">
        <img src="${image}" alt="${product.title}" class="product__img" />
        <h3 class="product__title">${product.title}</h3>
        <p class="product__price">${product.price.toFixed(2)} €</p> 
        <button class="product__btn js-add-btn">Añadir</button>
      </article>
    `;
  }

  productsSection.innerHTML = html;
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
