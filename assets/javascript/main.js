/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart');
const cartShop = document.getElementById('cart-shop');
const cartClose = document.getElementById('cart-close');

/* Array para almacenar los productos agregados al carrito */
let cartItems = [];

/*===== CART SHOW =====*/
if (cartShop) {
  cartShop.addEventListener('click', () => {
    cart.classList.add('show-cart');
    showCartItems();
  });
}

/*===== CART HIDDEN =====*/
if (cartClose) {
  cartClose.addEventListener('click', () => {
    cart.classList.remove('show-cart');
  });
}

/* Agregar producto al carrito */
function addToCart(product) {
    let productExists = false;
    
    // Verificar si el producto ya está en el carrito
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === product.name) {
        productExists = true;
        break;
      }
    }
    
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
    message += `  Precio unitario: S/${product.price}\n`;
    message += `  Cantidad: ${product.quantity}\n`;
    message += `  Total: S/${total.toFixed(2)}\n\n`;
  });

  message += `Total de la compra: ${calculateTotal()}`;

  return message;
}


const buyButton = document.getElementById('cart-button');
buyButton.addEventListener('click', () => {
  sendWhatsAppMessage();
});
