// 1. Seleccionamos el contenedor donde queremos inyectar el producto
const container = document.querySelector('.product-grid'); // Cambia el selector según tu HTML

// 2. Creamos el elemento padre
const productItem = document.createElement('div');
productItem.className = 'product-item men';

// 3. Definimos la estructura interna (usando Template Strings para mayor claridad)
productItem.innerHTML = `
    <div class="product discount product_filter">
        <div class="product_image">
            <img src="images/product_1.png" alt="Fujifilm X100T">
        </div>
        <div class="favorite favorite_left"></div>
        <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
            <span>-$20</span>
        </div>
        <div class="product_info">
            <h6 class="product_name">
                <a href="single.html">Fujifilm X100T 16 MP Digital Camera (Silver)</a>
            </h6>
            <div class="product_price">$520.00<span>$590.00</span></div>
        </div>
    </div>
    <div class="red_button add_to_cart_button">
        <a href="#">add to cart</a>
    </div>
`;

// 4. Inyectamos el nuevo elemento al contenedor
container.appendChild(productItem);

