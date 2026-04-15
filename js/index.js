let listaFavoritos = [];
let carrito = [];

const cartCounter = document.querySelector('.checkout_items');

function updateCartCounter() {
    if(cartCounter){
        cartCounter.textContent = carrito.length;
    }
}

function recuperarCarrito(){
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
};

//Constructor de cada producto
class producto{
    constructor(nombre, precio, categoria, imagen, descuento = false, favorito = false){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
        this.descuento = descuento;
        this.favorito = favorito;
    }

    agregarACarrito(){
        carrito.push({ ...this });;  //Agregamos el producto al carrito
        localStorage.setItem("carrito", JSON.stringify(carrito));  //Guardamos en el localStorage
        updateCartCounter();  // Actualizamos el contador del carrito
        cargarCarrito();
        return `Añadido al carrito: ${this.nombre}`;   //enviamos una confirmacion por consola
    }

    agregarFavoritos(){
        this.favorito = true;       //cambiamos el estado de favorito
        listaFavoritos.push(this);  //Agregamos el producto a la lista de favoritos
        localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));  //Guardamos en el localStorage
        return `Añadido a favoritos: ${this.nombre}`;   //enviamos una confirmacion por consola
    }

    eliminarFavoritos(){
        this.favorito = false;       //cambiamos el estado de favorito
        listaFavoritos = listaFavoritos.filter(producto => producto.nombre !== this.nombre);   // Eliminamos el producto de la lista de favoritos
        localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));  // Actualizamos el localStorage
        return `Eliminado de favoritos: ${this.nombre}`;   //enviamos una confirmacion por consola
    }

    descuento(porciento){
      let discount = parseInt(porciento * 100) / 100
      let precioDiscount = this.precio * discount
      let valordescontado = this.precio - precioDiscount
      return valordescontado
    }
}

const stock = [
    new producto("Banano", 3000, "Frutas", "./images/banano.webp", false),
    new producto("Papa sabanera", 1500, "Verduras", "./images/papasabanera.webp", false),
    new producto("Pescado", 2000, "Carnes", "./images/pescado.webp", false),
    new producto("Manzana roja", 300, "Frutas", "./images/manzanaroja.jpg", false),
    new producto("Espinaca", 700, "Verduras", "./images/espinaca.webp", false),
    new producto("Queso", 1500, "Lacteos", "./images/queso.webp", false),
    new producto("Naranja", 2500, "Frutas", "./images/naranja.webp", false),
    new producto("Leche", 1600, "Lacteos", "./images/leche.webp", false),
    new producto("Pollo", 1500, "Carnes", "./images/pollo.webp", false),
    new producto("Ciruela", 650, "Frutas", "./images/ciruela.webp", false),
    new producto("Carne de Cerdo", 2500, "Carnes", "./images/carne_cerdo.webp", false),
    new producto("Mantequilla", 1000, "Lacteos", "./images/mantequilla.webp", false),
    new producto("Lechuga", 700, "Verduras", "./images/lechuga.jpg", false),
    new producto("Brocoli", 400, "Verduras", "./images/brocoli.jpg", false),
    new producto("Zanahoria", 900, "Verduras", "./images/zanahoria.webp", false),
    new producto("Carne de Res", 1850, "Carnes", "./images/carne_res.webp", false),
    new producto("Yogurt", 500, "Lacteos", "./images/yogurt.webp", false),

]

function cargarStock(){
    const container = document.querySelector('.product-grid');
    stock.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item ' + producto.categoria.toLowerCase();
        productItem.innerHTML = `
            <div class="product product_filter">
                <div class="product_image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="favorite favorite_left"></div>
                <div class="product_info">
                    <h6 class="product_name">
                        <a href="#">${producto.nombre}</a>
                    </h6>
                    <div class="product_price">$${producto.precio.toFixed(2)}</div>
                </div>
                <div class="red_button add_to_cart_button" onclick="agregarCarrito('${producto.nombre}')">
                    <span>add to cart</span>
                </div>
            </div>

        `;
        container.appendChild(productItem);
    });
}

function cargarCarrito(){
    const container = document.querySelector('#cartItems');
    container.innerHTML = ""; // 🔥 LIMPIAR ANTES

    console.log(carrito);

    carrito.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item ' + producto.categoria.toLowerCase();
        productItem.innerHTML = `
            <div class="product product_filter">
                <div class="product_image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="product_info">
                    <h6 class="product_name">
                        <a href="#">${producto.nombre}</a>
                    </h6>
                    <div class="product_price">$${producto.precio.toFixed(2)}</div>
                </div>
                <div class="remove_from_cart_button" onclick="eliminarDelCarrito('${producto.nombre}')">
                    <span>Remove</span>
                </div>
            </div>

        `;
        container.appendChild(productItem);
    });
}

function agregarCarrito(nombre){
    const producto = stock.find(p => p.nombre === nombre);
    if(producto){
        producto.agregarACarrito();
        console.log(`Añadido: ${producto.nombre}`);
    }
}

function eliminarDelCarrito(nombre){
    carrito = carrito.filter(p => p.nombre !== nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateCartCounter();
    cargarCarrito();
    console.log(`Eliminado: ${nombre}`);
}

// _______________________

cargarStock();
recuperarCarrito();
updateCartCounter();
cargarCarrito();