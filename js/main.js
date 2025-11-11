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

// EVENTOS

// CÓDIGO AL CARGAR LA PÁGINA

getProductsFromAPI();
