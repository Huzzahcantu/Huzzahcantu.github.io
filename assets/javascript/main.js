/* Array para almacenar los productos agregados al carrito */
let cartItems = [];

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart');
const cartShop = document.getElementById('cart-shop');
const cartClose = document.getElementById('cart-close');

/*===== CART SHOW =====*/
/* Validar si la constante existe */
if (cartShop) {
  cartShop.addEventListener('click', () => {
    cart.classList.add('show-cart');
  });
}

/*===== CART HIDDEN =====*/
/* Validar si la constante existe */
if (cartClose) {
  cartClose.addEventListener('click', () => {
    cart.classList.remove('show-cart');
  });
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const cartIcon = document.querySelector('.cart__icon'); // Actualiza el selector para el elemento del icono del carrito

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    cartIcon.style.display = 'none'; // Ocultar el icono del carrito
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    cartIcon.style.display = 'block'; // Mostrar el icono del carrito
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  // Cuando se hace clic en cada nav__link, se remueve la clase show-menu
  navMenu.classList.remove('show-menu');
};

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', linkAction);
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header');
  // Cuando el desplazamiento es mayor que 50 unidades de la ventana gráfica, se agrega la clase scroll-header a la etiqueta del encabezado
  window.scrollY >= 50
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);



/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Tema seleccionado previamente (si el usuario lo eligió)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Obtenemos el tema actual de la interfaz validando la clase dark-theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

// Validamos si el usuario eligió previamente un tema
if (selectedTheme) {
  // Si la validación se cumple, preguntamos cuál fue el tema para saber si activamos o desactivamos el modo oscuro
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](
    iconTheme
  );
}

// Activar / desactivar el tema manualmente con el botón
themeButton.addEventListener('click', () => {
  // Agregar o remover el tema oscuro / de iconos
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // Guardamos el tema y el icono actual seleccionado por el usuario
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/* Agregar producto al carrito */
function addToCart(product) {
  const productExists = cartItems.some((item) => item.name === product.name);

  if (productExists) {
    alert('Este producto ya fue agregado al carrito.');
  } else {
    // Agregar el producto al carrito
    product.quantity = 1;
    cartItems.push(product);
    showCartItems();
  }
}

/* Eliminar producto del carrito */
function removeFromCart(index) {
  cartItems.splice(index, 1);
  showCartItems();
}

/* Mostrar los productos en el carrito */
function showCartItems() {
  const cartContainer = document.querySelector('.cart__container');
  cartContainer.innerHTML = '';

  let totalQuantity = 0; // Contador de la cantidad total de productos en el carrito

  cartItems.forEach((product, index) => {
    const article = document.createElement('article');
    article.classList.add('cart__card');

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart__box');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = '';
    img.classList.add('cart__img');
    cartBox.appendChild(img);

    const cartDetails = document.createElement('div');
    cartDetails.classList.add('cart__details');

    const title = document.createElement('h3');
    title.classList.add('cart__title');
    title.textContent = product.name;
    cartDetails.appendChild(title);

    const price = document.createElement('span');
    price.classList.add('cart__price');
    price.textContent = `S/${product.price}`;
    cartDetails.appendChild(price);

    const cartAmount = document.createElement('div');
    cartAmount.classList.add('cart__amount');

    const cartAmountContent = document.createElement('div');
    cartAmountContent.classList.add('cart__amount-content');

    const minusButton = document.createElement('span');
    minusButton.classList.add('cart__amount-box');
    minusButton.innerHTML = '<i class="bx bx-minus"></i>';
    minusButton.addEventListener('click', () => {
      decreaseQuantity(index);
    });
    cartAmountContent.appendChild(minusButton);

    const amountNumber = document.createElement('span');
    amountNumber.classList.add('cart__amount-number');
    amountNumber.textContent = product.quantity;
    cartAmountContent.appendChild(amountNumber);

    const plusButton = document.createElement('span');
    plusButton.classList.add('cart__amount-box');
    plusButton.innerHTML = '<i class="bx bx-plus"></i>';
    plusButton.addEventListener('click', () => {
      increaseQuantity(index);
    });
    cartAmountContent.appendChild(plusButton);

    cartAmount.appendChild(cartAmountContent);

    const removeButton = document.createElement('i');
    removeButton.classList.add('bx', 'bx-trash-alt', 'cart__amount-trash');
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });
    cartAmount.appendChild(removeButton);

    cartDetails.appendChild(cartAmount);

    article.appendChild(cartBox);
    article.appendChild(cartDetails);
    cartContainer.appendChild(article);

    totalQuantity += product.quantity; // Actualizar el contador de cantidad total
  });

  // Actualizar el valor del contador en el HTML
  const cartCounter = document.querySelector('.cart__counter');
  cartCounter.textContent = totalQuantity;

  // Actualizar el total y la cantidad de productos en el carrito
  const cartPrices = document.querySelector('.cart__prices');
  cartPrices.innerHTML = `
      <span class="cart__prices-item">${cartItems.length} items</span>
      <span class="cart__prices-total">Total: ${calculateTotal()}</span>
    `;
}

/* Calcular el total de la compra */
function calculateTotal() {
  let total = 0;
  cartItems.forEach((product) => {
    total += product.price * product.quantity;
  });
  return `S/${total.toFixed(2)}`;
}

/* Incrementar la cantidad del producto en el carrito */
function increaseQuantity(index) {
  cartItems[index].quantity++;
  showCartItems();
}

/* Decrementar la cantidad del producto en el carrito */
function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    showCartItems();
  }
}

// const addToCartFeaturedButtons = document.querySelectorAll('.featured__card .featured__button');

// addToCartFeaturedButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const cardContainer = button.closest('.featured__card');
//     const productImage = cardContainer.querySelector('.featured__img').src;
//     const productName = cardContainer.querySelector('.featured__title').textContent;
//     const productPrice = parseFloat(cardContainer.querySelector('.featured__price').textContent.slice(2)).toFixed(2);

//     const product = {
//       image: productImage,
//       name: productName,
//       price: productPrice,
//     };

//     addToCart(product);
//   });
// });

/* Agregar productos al hacer clic en el botón "Add to Cart" */
const addToCartButtons = document.querySelectorAll('.products__button');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productContainer = button.parentElement;
    const productImage = productContainer.querySelector('.products__img').src;
    const productName = productContainer.querySelector('.products__title').textContent;
    const productPrice = parseFloat(productContainer.querySelector('.products__price').textContent.slice(2)).toFixed(2);

    const product = {
      image: productImage,
      name: productName,
      price: productPrice,
    };

    addToCart(product);
  });
});

const phoneNumber = '943802059'; // Número de teléfono de destino

function sendWhatsAppMessage() {
  const message = generateWhatsAppMessage();
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
}

function generateWhatsAppMessage() {
  let message = '¡Hola! Quisiera realizar la siguiente compra:\n\n';

  cartItems.forEach((product) => {
    const total = product.price * product.quantity;
    message += `  Producto: ${product.name}\n`;
    message += `  Precio: S/${product.price}\n`;
    message += `  Cantidad: ${product.quantity}\n\n`;
    // message += `  Total: S/${total.toFixed(2)}\n\n`;
  });

  message += `Total de la compra: ${calculateTotal()}`;

  return message;
}

const buyButton = document.getElementById('cart-button');
buyButton.addEventListener('click', () => {
  sendWhatsAppMessage();
});
