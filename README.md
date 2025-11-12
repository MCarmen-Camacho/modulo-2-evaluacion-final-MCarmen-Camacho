# Mini Online Store  
**Evaluación Final — Módulo 2**

Este proyecto forma parte de la evaluación final del Módulo 2 del curso de Desarrollo Front-End.  
Se trata de una aplicación web que simula una tienda online, desarrollada en **HTML**, **CSS** y **JavaScript**, con conexión a una **API pública** (FakeStore API) y persistencia del carrito mediante **LocalStorage**.

---

## Funcionalidades principales

### 1. Búsqueda de productos
Permite buscar productos por nombre dentro del catálogo obtenido desde la API.  
El filtro muestra únicamente los productos que contienen el texto buscado.

### 2. Visualización dinámica de productos
Los productos se cargan desde [FakeStoreAPI](https://fakestoreapi.com/products).  
Si un producto no tiene imagen, se muestra una imagen de relleno:  
`https://placehold.co/200x150`  
Los productos se renderizan dinámicamente con JavaScript y se actualizan al realizar una búsqueda.

### 3. Carrito de la compra
La usuaria puede añadir productos al carrito haciendo clic en el botón **"Comprar"**.  
Cuando un producto se añade al carrito:
- El texto del botón cambia a **"Eliminar"**.
- El color de fondo y el de fuente cambian.
- El producto pasa a mostrarse en el listado del carrito, que se mantiene visible en el lateral derecho de la página.  

El carrito no desaparece al realizar nuevas búsquedas.

### 4. Persistencia con LocalStorage
Los productos añadidos al carrito se almacenan automáticamente en `localStorage`.  
Si la usuaria recarga la página, los productos añadidos permanecen en el carrito.

---

## Estructura del proyecto

```bash
modulo-2-evaluacion-final-MCarmen-Camacho
│
├── index.html           → Estructura principal de la página
├── js/
│   └── main.js          → Lógica de la aplicación (JavaScript)
├── styles/
│   └── main.css         → Estilos base y maquetación con Flexbox
└── README.md            → Documentación del proyecto
