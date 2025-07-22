// Inicializar AOS
AOS.init();

// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Caramañola 500 ML",
        price: 7500.00,
        category: "accesorios",
        subcategory: "accesorios",
        image: "../images/productos/Caramañola 500 ML - NUTREMAX.jpg",
        description: "Botella deportiva de 500 ml, ideal para mantenerte hidratado durante tus entrenamientos o actividades al aire libre. Práctica, liviana y fácil de transportar."
    },
    {
        id: 2,
        name: "Shaker S Negro - GOLD NUTRITION",
        price: 6000.00,
        category: "accesorios",
        subcategory: "accesorios",
        image: "../images/productos/Shaker S Negro - GOLD NUTRITION.jpg",
        description: "Vaso mezclador compacto y resistente de la marca Gold Nutrition, perfecto para preparar y tomar tus batidos de proteínas o suplementos de forma rápida y sin grumos."
    },
    {
        id: 3,
        name: "Creatine 300 G - GOLD NUTRITION",
        price: 31000.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/Creatine 300 G - GOLD NUTRITION.jpg",
        description: "Creatina monohidratada de alta pureza, fomenta la fuerza y la resistencia muscular, ideal para mejorar el rendimiento en entrenamientos de alta intensidad."
    },
    {
        id: 4,
        name: "Whey Protein 2 LB - ULTRA TECH",
        price: 44500.00,
        category: "proteinas",
        subcategory: "suplementos",
        image: "../images/productos/Whey Protein 2 LB - ULTRA TECH.jpg",
        nutritionImage: "../images/productos/Whey Protein 2 LB - ULTRA TECH informacion nutricional.jpg",
        description: "Proteína de suero concentrada de 2 libras de la marca Ultra Tech, contribuye a la recuperación muscular y al desarrollo de masa magra.",
        sabores: ["Vainilla", "Chocolate"]
    },
    {
        id: 5,
        name: "Creatine Monohydrate 309 G - BSN",
        price: 37000.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/Creatine Monohydrate 309 G - BSN.jpg",
        description: "Creatina monohidratada premium de 309 gramos de la reconocida marca BSN, ayuda a incrementar la energía y la potencia en entrenamientos intensos."
    },
    {
        id: 6,
        name: "100 % Whey Protein 2 LB - GOLD NUTRITION",
        price: 36600.00,
        category: "proteinas",
        subcategory: "suplementos",
        image: "../images/productos/whey-gold-2lb.jpg",
        nutritionImage: "../images/productos/100 % Whey Protein 2 LB - GOLD NUTRITION informacion nutrional.jpg",
        description: "Proteína 100% de suero de leche de 2 libras, excelente fuente de aminoácidos para favorecer la recuperación y el crecimiento muscular.",
        sabores: ["Vainilla", "Chocolate"]
    },
    {
        id: 7,
        name: "Creatina Micronizada 300 G - ENA",
        price: 30000.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/Creatina Micronizada 300 G.jpg",
        description: "Creatina monohidratada micronizada de 300 gramos, se absorbe mejor y se mezcla fácilmente, potencia la fuerza y la resistencia muscular."
    },
    {
        id: 8,
        name: "Creatina 150gr - Body Advance",
        price: 12800.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/creatina body adbance.jpg",
        description: "Creatina pura en polvo de 150 gramos, ideal para potenciar tu rendimiento físico, aumentar la fuerza y optimizar la recuperación muscular en entrenamientos exigentes."
    },
    {
        id: 9,
        name: "WHEY PROTEIN x907g - Body Advance",
        price: 23000.00,
        category: "proteinas",
        subcategory: "suplementos",
        image: "../images/productos/WHEY PROTEIN x907g - Body Advance.jpg",
        nutritionImage: "../images/productos/WHEY PROTEIN x907g - Body Advance informacion nutricional.jpg",
        description: "Proteína de suero de 907 gramos de Body Advance, excelente opción para complementar la dieta, ganar masa muscular y optimizar la recuperación post entrenamiento.",
        sabores: ["Chocolate", "Vainilla"]
    }
];

// Configuración del carrito
const SHIPPING_THRESHOLD = 50; // Envío gratis a partir de $50
const SHIPPING_COST = 5; // Costo de envío base

// Inicializar carrito
let cart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    total: 0
};



// Función para mostrar productos
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToShow.map(product => {
        // Verificar si el producto tiene sabores
        const hasFlavors = product.sabores && Array.isArray(product.sabores) && product.sabores.length > 0;
        
        return `
        <div class="col-md-4 mb-4" data-aos="fade-up">
            <div class="card product-card h-100" style="cursor: pointer;" onclick="showProductDetail(${JSON.stringify(product).replace(/\"/g, '&quot;')})">
                <div class="product-image position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <span class="product-zoom-icon" title="Ver detalle"><i class="fas fa-search-plus"></i></span>
                    <span class="product-more-info-label">Más info</span>
                    ${hasFlavors ? `
                    <div class="product-overlay">
                        <div class="text-center">
                            <i class="fas fa-tag fa-2x mb-2"></i>
                            <p class="mb-0">Elegir sabor para agregar al carrito</p>
                        </div>
                    </div>
                    ` : `
                    <div class="product-overlay">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${JSON.stringify(product).replace(/\"/g, '&quot;')})">
                            Añadir al Carrito
                        </button>
                    </div>
                    `}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text"><strong>$${product.price.toLocaleString('es-AR')} ARS</strong></p>
                    ${hasFlavors ? `<small class="text-muted"><i class="fas fa-tag"></i> Disponible en sabores</small>` : ''}
                    
                    <!-- 🔵 2️⃣ BOTONES PARA MÓVIL - Siempre visibles en móvil -->
                    <div class="mobile-product-buttons d-block d-md-none mt-2">
                        ${hasFlavors ? `
                            <button class="btn btn-outline-primary btn-sm w-100 mb-2" onclick="event.stopPropagation(); showProductDetail(${JSON.stringify(product).replace(/\"/g, '&quot;')})">
                                <i class="fas fa-tag me-1"></i>Elegir sabor
                            </button>
                        ` : ''}
                        <button class="btn btn-primary btn-sm w-100" onclick="event.stopPropagation(); ${hasFlavors ? `showProductDetail(${JSON.stringify(product).replace(/\"/g, '&quot;')})` : `addToCart(${JSON.stringify(product).replace(/\"/g, '&quot;')})`}">
                            <i class="fas fa-shopping-cart me-1"></i>Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Función para actualizar el carrito
function updateCart() {
    // Verificar que cart existe y tiene la estructura correcta
    if (!cart || !cart.items) {
        cart = { items: [], total: 0 };
    }
    
    const emptyCartElement = document.getElementById('emptyCart');
    const cartContentElement = document.getElementById('cartContent');
    const cartItemsElement = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const mobileCartCountElement = document.getElementById('mobileCartCount');
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const cartShippingElement = document.getElementById('cartShipping');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');

    // Calcular totales
    const subtotal = cart.items.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        return total + (itemPrice * itemQuantity);
    }, 0);
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    // Actualizar contador del carrito (desktop y móvil)
    const totalItems = cart.items.reduce((count, item) => count + item.quantity, 0);
    
    // Actualizar badge desktop
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    }
    
    // Actualizar badge móvil
    if (mobileCartCountElement) {
        mobileCartCountElement.textContent = totalItems;
        mobileCartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    }

    // Mostrar carrito vacío o con productos
    if (emptyCartElement && cartContentElement) {
        if (cart.items.length === 0) {
            emptyCartElement.style.display = 'block';
            cartContentElement.style.display = 'none';
        } else {
            emptyCartElement.style.display = 'none';
            cartContentElement.style.display = 'block';
        }
    }

    // Actualizar items en el carrito
    if (cartItemsElement) {
        cartItemsElement.innerHTML = cart.items.map(item => {
            // Usar displayName si existe, sino el nombre original
            const displayName = item.displayName || item.name;
            // Crear ID único para identificar el item (incluyendo sabor)
            const uniqueId = item.sabor ? `${item.id}-${item.sabor}` : item.id;
            
            // --- CORRECCIÓN DE RUTA DE IMAGEN DINÁMICA ---
            let imageSrc = item.image;
            const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            if (isIndex && imageSrc.startsWith('../')) {
                imageSrc = imageSrc.substring(3); // Remover ../
            } else if (!isIndex && !imageSrc.startsWith('../')) {
                imageSrc = '../' + imageSrc; // Añadir ../
            }
            // --- FIN CORRECCIÓN ---

            return `
            <tr data-item-id="${uniqueId}">
                <td data-label="Producto">
                    <div class="d-flex align-items-center" style="cursor:pointer" onclick="goToProduct(${item.id})">
                        <img src="${imageSrc}" alt="${displayName}" 
                             style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                        <div>
                            <h6 class="mb-0">${displayName}</h6>
                            <small class="text-muted">${item.category}</small>
                            ${item.sabor ? `<br><small class="text-primary"><i class="fas fa-tag"></i> Sabor: ${item.sabor}</small>` : ''}
                        </div>
                    </div>
                </td>
                <td data-label="Precio"><span>$${item.price.toLocaleString('es-AR')} ARS</span></td>
                <td data-label="Cantidad">
                    <div class="quantity-controls d-flex align-items-center justify-content-center">
                        <button class="btn btn-sm btn-outline-danger decrease-btn" type="button" data-item-id="${uniqueId}" title="Disminuir">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display mx-2 fw-bold text-primary">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-success increase-btn" type="button" data-item-id="${uniqueId}" title="Aumentar">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td data-label="Subtotal"><span>$${(item.price * item.quantity).toLocaleString('es-AR')} ARS</span></td>
                <td data-label="Eliminar">
                    <button class="btn btn-sm btn-danger remove-btn" data-item-id="${uniqueId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        }).join('');
        
        // Agregar event listeners después de crear el HTML
        setTimeout(() => {
            // Botones de aumentar cantidad
            document.querySelectorAll('.increase-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    const item = cart.items.find(item => {
                        const itemUniqueId = item.sabor ? `${item.id}-${item.sabor}` : item.id;
                        return itemUniqueId == itemId;
                    });
                    if (item) {
                        updateQuantity(itemId, item.quantity + 1);
                    }
                });
            });
            
            // Botones de disminuir cantidad
            document.querySelectorAll('.decrease-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    const item = cart.items.find(item => {
                        const itemUniqueId = item.sabor ? `${item.id}-${item.sabor}` : item.id;
                        return itemUniqueId == itemId;
                    });
                    if (item) {
                        updateQuantity(itemId, item.quantity - 1);
                    }
                });
            });
            

            
            // Botones de eliminar
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    removeFromCart(itemId);
                });
            });
        }, 100);
    }

    // Actualizar totales
    if (cartSubtotalElement) cartSubtotalElement.textContent = subtotal.toLocaleString('es-AR');
    if (cartShippingElement) {
        cartShippingElement.innerHTML = '<div>Envío: <span class="fw-bold">A coordinar</span></div>';
    }
    if (cartTotalElement) cartTotalElement.innerHTML = `<span>${subtotal.toLocaleString('es-AR')} ARS</span>`;

    // Habilitar/deshabilitar botón de checkout
    if (checkoutButton) {
        checkoutButton.disabled = cart.items.length === 0;
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para limpiar el carrito
function clearCart() {
    cart = { items: [], total: 0 };
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItems'); // Asegurarse de limpiar ambos
    updateCart();
    console.log('Carrito limpiado y actualizado.');
}

// Función para actualizar cantidad
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    // Buscar item por ID único (que puede incluir sabor)
    const item = cart.items.find(item => {
        const itemUniqueId = item.sabor ? `${item.id}-${item.sabor}` : item.id;
        return itemUniqueId == productId || item.id == productId;
    });
    
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        showNotification('Cantidad actualizada');
    }
}

// Función para añadir al carrito
function addToCart(product, cantidad = 1) {
    cantidad = parseInt(cantidad) || 1;
    
    // Crear un ID único que incluya el sabor si existe
    let uniqueId = product.id;
    let itemName = product.name;
    
    if (product.sabor) {
        uniqueId = `${product.id}-${product.sabor}`;
        itemName = `${product.name} (${product.sabor})`;
    }
    
    // Buscar item existente por ID único (incluyendo sabor)
    const existingItem = cart.items.find(item => {
        if (item.sabor && product.sabor) {
            return item.id === product.id && item.sabor === product.sabor;
        } else if (!item.sabor && !product.sabor) {
            return item.id === product.id;
        }
        return false;
    });
    
    if (existingItem) {
        existingItem.quantity += cantidad;
        showNotification(`Se aumentó la cantidad de ${itemName} en tu carrito`);
    } else {
        cart.items.push({
            ...product,
            quantity: cantidad,
            displayName: itemName // Nombre para mostrar en el carrito
        });
        showNotification(`${itemName} añadido al carrito`);
    }
    
    updateCart();
}

// Función para eliminar del carrito
function removeFromCart(productId) {
    // Buscar item por ID único (que puede incluir sabor)
    const itemIndex = cart.items.findIndex(item => {
        const itemUniqueId = item.sabor ? `${item.id}-${item.sabor}` : item.id;
        return itemUniqueId == productId || item.id == productId;
    });
    
    if (itemIndex > -1) {
        const removedItem = cart.items[itemIndex];
        cart.items.splice(itemIndex, 1);
        updateCart();
        showNotification(`${removedItem.displayName || removedItem.name} eliminado del carrito`);
    }
}

// Variables globales para el modal de detalle
let currentProduct = null;
let currentImageIndex = 0;
let productImages = [];

// Función para mostrar el detalle del producto
function showProductDetail(product) {
    currentProduct = product;
    productImages = [product.image];
    if (product.nutritionImage) {
        productImages.push(product.nutritionImage);
    }
    currentImageIndex = 0;

    updateGallery();
    
    // Actualizar contenido del modal
    document.getElementById('productDetailName').textContent = product.name;
    document.getElementById('productDetailCategory').textContent = product.category;
    document.getElementById('productDetailPrice').textContent = `$${product.price.toLocaleString('es-AR')} ARS`;
    document.getElementById('productDetailDescription').textContent = product.description;
    // Resetear cantidad
    document.getElementById('productQuantity').value = 1;
    // Mostrar selector de sabor si corresponde
    const flavorContainer = document.getElementById('flavorSelectorContainer');
    if (product.sabores && Array.isArray(product.sabores) && product.sabores.length > 0) {
        flavorContainer.style.display = '';
        flavorContainer.innerHTML = `
          <label for="productFlavor" class="form-label mb-1">
            <i class="fas fa-tag text-danger"></i> Sabor: <span class="text-danger">*</span>
          </label>
          <select id="productFlavor" class="form-select" required>
            <option value="">-- Selecciona un sabor --</option>
            ${product.sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
          </select>
          <small class="text-muted">Debes elegir un sabor antes de añadir al carrito</small>
        `;
    } else {
        flavorContainer.style.display = 'none';
        flavorContainer.innerHTML = '';
    }
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
}

// Función para generar características del producto
function generateProductFeatures(product) {
    const features = [];
    
    // Características basadas en la categoría
    if (product.category === 'suplementos') {
        features.push('Proteína de alta calidad');
        features.push('Sin ingredientes artificiales');
        features.push('Fácil de mezclar');
        features.push('Sabor natural');
    } else if (product.category === 'accesorios') {
        features.push('Material resistente');
        features.push('Diseño ergonómico');
        features.push('Fácil de transportar');
        features.push('Garantía de calidad');
    }
    
    // Características generales
    features.push('Envío rápido');
    features.push('Garantía de satisfacción');
    
    return features.map(feature => `<li>${feature}</li>`).join('');
}

// Función para aumentar cantidad
function increaseQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

// Función para disminuir cantidad
function decreaseQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Función para añadir al carrito desde el modal
function addToCartFromDetail() {
    if (!currentProduct) return;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const productToAdd = { ...currentProduct };
    
    // Verificar si el producto tiene sabores disponibles
    const flavorSelect = document.getElementById('productFlavor');
    if (flavorSelect && flavorSelect.style.display !== 'none') {
        const selectedFlavor = flavorSelect.value;
        if (!selectedFlavor || selectedFlavor === '') {
            showNotification('Por favor, elige un sabor antes de añadir al carrito', 'error');
            // Resaltar el selector de sabor
            flavorSelect.classList.add('error');
            setTimeout(() => {
                flavorSelect.classList.remove('error');
            }, 3000);
            return;
        }
        productToAdd.sabor = selectedFlavor;
    }
    
    addToCart(productToAdd, quantity);
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
    modal.hide();
    
    const displayName = productToAdd.sabor ? `${productToAdd.name} (${productToAdd.sabor})` : productToAdd.name;
    showNotification(`${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${displayName} añadida${quantity === 1 ? '' : 's'} al carrito`);
}

// Función para ver el carrito
function viewCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Función para aplicar ordenamiento
function applySorting(productsToSort) {
    const sortValue = document.getElementById('sortBy')?.value;
    if (!sortValue) return productsToSort;
    
    const sortedProducts = [...productsToSort];
    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    return sortedProducts;
}

// =============================================
// 🔹 1. LÓGICA DE FILTRADO Y BÚSQUEDA DE PRODUCTOS
// =============================================

// Función centralizada para filtrar y mostrar productos
function applyFilters() {
    let filteredProducts = [...products];
    
    // 1. Filtrar por término de búsqueda
    const searchTerm = document.getElementById('searchProducts')?.value.toLowerCase().trim();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // 2. Filtrar por categoría (usando los botones de filtro)
    const activeCategoryFilter = document.querySelector('[data-filter].active');
    if (activeCategoryFilter) {
        const category = activeCategoryFilter.getAttribute('data-filter');
        if (category !== 'todos') {
            if (category === 'suplementos') {
                // Filtra por la subcategoría 'suplementos'
                filteredProducts = filteredProducts.filter(p => p.subcategory === 'suplementos');
            } else if (category === 'accesorios') {
                // Filtra por la categoría 'accesorios'
                filteredProducts = filteredProducts.filter(p => p.category === 'accesorios');
            } else {
                // Filtro para otras categorías como 'proteinas', 'creatinas', etc.
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
        }
    }
    
    // 3. Aplicar ordenamiento
    filteredProducts = applySorting(filteredProducts);
    
    // 4. Mostrar los productos resultantes
    displayProducts(filteredProducts);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' : 
                           'info-circle'}"></i>
        </div>
        <div class="notification-message">${message}</div>
    `;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Eliminar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function updateGallery() {
    const gallery = document.getElementById('productImageGallery');
    const counter = document.getElementById('imageCounter');
    
    gallery.innerHTML = productImages.map((img, index) => 
        `<img src="${img}" class="${index === currentImageIndex ? 'active' : ''}" alt="Imagen de producto" style="cursor: zoom-in;">`
    ).join('');

    counter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;

    // Re-attach event listener for lightbox
    const galleryImages = gallery.querySelectorAll('img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
    });
}

// =============================================
// 🔹 2. MANEJO DE EVENTOS PRINCIPALES
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');

    if (prevImageBtn && nextImageBtn) {
        prevImageBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
            updateGallery();
        });

        nextImageBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % productImages.length;
            updateGallery();
        });
    }
    // --- Manejar redirección post-compra ---
    if (sessionStorage.getItem('orderPlaced') === 'true') {
        const handleOrderNotification = () => {
            // Solo actuar si la pestaña está visible
            if (document.visibilityState === 'visible') {
                sessionStorage.removeItem('orderPlaced'); // Limpiar flag para evitar repeticiones
                clearCart();
                showNotification('¡Pedido Enviado! Gracias por tu compra.', 'success');
                // Remover el listener una vez ejecutado
                document.removeEventListener('visibilitychange', handleOrderNotification);
            }
        };

        // Si la pestaña ya está visible al cargar la página, mostrar la notificación.
        if (document.visibilityState === 'visible') {
            handleOrderNotification();
        } else {
            // Si el usuario estaba en otra pestaña (ej. WhatsApp), esperar a que vuelva.
            document.addEventListener('visibilitychange', handleOrderNotification);
        }
    }

    // --- INICIALIZACIÓN ---
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    // Mostrar productos y actualizar carrito
    if (document.getElementById('productsGrid')) {
        applyFilters(); // Usar la nueva función de filtrado
    }
    updateCart();

    // --- EVENT LISTENERS PARA FILTROS (Página de Productos) ---
    const searchInput = document.getElementById('searchProducts');
    if (searchInput) {
        // Llenar el campo de búsqueda si viene de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('search');
        if (searchTermFromUrl) {
            searchInput.value = decodeURIComponent(searchTermFromUrl);
            applyFilters();
        }
        // Listener para la búsqueda en tiempo real
        searchInput.addEventListener('input', applyFilters);
    }

    // Listener para el ordenamiento
    document.getElementById('sortBy')?.addEventListener('change', applyFilters);

    // Listeners para los botones de filtro de categoría
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Manejar la clase 'active'
            document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar texto del dropdown si es un item de dropdown
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                const dropdownButton = dropdown.querySelector('.dropdown-toggle');
                dropdownButton.textContent = this.textContent;
                // También marcar el botón principal del dropdown como activo
                dropdownButton.classList.add('active');
            }

            applyFilters();
        });
    });

    // --- EVENT LISTENERS GENERALES ---
    // Carrito (móvil y desktop)
    document.querySelector('.mobile-cart')?.addEventListener('click', (e) => { e.preventDefault(); viewCart(); });
    document.getElementById('cartButton')?.addEventListener('click', (e) => { e.preventDefault(); viewCart(); });

    // Búsqueda desde la Navbar (para index.html)
    const navbarSearch = document.getElementById('navbarSearch');
    if (navbarSearch) {
        const handleNavbarSearch = () => {
            const searchTerm = navbarSearch.value.trim();
            if (searchTerm) {
                window.location.href = `pages/productos.html?search=${encodeURIComponent(searchTerm)}`;
            }
        };
        navbarSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNavbarSearch();
            }
        });
        // También para el botón de búsqueda del navbar
        navbarSearch.nextElementSibling?.addEventListener('click', handleNavbarSearch);
    }

    // Limpiar modal del carrito al cerrar
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('hidden.bs.modal', () => {
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
    }
    
    // Botón de finalizar compra
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cartData = JSON.parse(localStorage.getItem('cart')) || { items: [] };
            if (cartData.items.length === 0) {
                showNotification('Tu carrito está vacío.', 'error');
                return;
            }
            localStorage.setItem('cartItems', JSON.stringify(cartData.items));
            const targetUrl = window.location.pathname.includes('/pages/') ? 'checkout.html' : 'pages/checkout.html';
            window.location.href = targetUrl;
        });
    }

    // Abrir detalle de producto si viene ID en la URL
    if (window.location.pathname.includes('productos.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            const prod = products.find(p => p.id == id);
            if (prod) {
                setTimeout(() => showProductDetail(prod), 300);
            }
        }

        const category = params.get('categoria');
        if (category) {
            const filterButton = document.querySelector(`[data-filter="${category}"]`);
            if (filterButton) {
                // Quitar la clase 'active' de cualquier otro botón
                document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
                // Añadir 'active' al botón correcto y aplicar filtros
                filterButton.classList.add('active');
                applyFilters();
            }
        }
    }
});
// Función mejorada para mostrar notificaciones
function showNotification(message, type = 'success') {
    const toast = document.getElementById(type === 'success' ? 'successToast' : 'errorToast');
    const messageElement = document.getElementById(type === 'success' ? 'successToastMessage' : 'errorToastMessage');
    
    if (toast && messageElement) {
        messageElement.textContent = message;
        const bsToast = new bootstrap.Toast(toast, {
            animation: true,
            autohide: true,
            delay: 5000
        });
        bsToast.show();
    }
}

// Las funciones addToCart, removeFromCart y updateQuantity ya están definidas arriba
// con el manejo correcto de sabores

// Inicializar los toasts cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los toasts
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        new bootstrap.Toast(toast, {
            animation: true,
            autohide: true,
            delay: 3000
        });
    });
});

// Manejar evento de clic en el botón de checkout
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cartData = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
            
            // Verificar si hay productos en el carrito
            if (cartData.items.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
                return;
            }
            
            // Sincronizar cartItems para compatibilidad con la página de checkout
            localStorage.setItem('cartItems', JSON.stringify(cartData.items));
            
            // Redirigir a la página de checkout
            // Comprobar si ya estamos en una página dentro de 'pages' o en la raíz
            const isInPagesDir = window.location.pathname.includes('/pages/');
            if (isInPagesDir) {
                window.location.href = 'checkout.html';
            } else {
                window.location.href = 'pages/checkout.html';
            }
        });
    }
});

function goToProduct(id) {
    window.location.href = 'productos.html?id=' + id;
}

// Lightbox para imagen expandida en el modal de producto
document.addEventListener('DOMContentLoaded', function() {
  var productImg = document.getElementById('productDetailImage');
  if (productImg) {
    productImg.style.cursor = 'zoom-in';
    productImg.addEventListener('click', function() {
      openLightbox(productImg.src);
    });
  }
});

function openLightbox(src) {
  var lightbox = document.getElementById('imageLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
  }
}
function closeLightbox() {
  var lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.getElementById('lightboxImg').src = '';
  }
}
// Cerrar lightbox al hacer clic fuera de la imagen
window.addEventListener('click', function(e) {
  var lightbox = document.getElementById('imageLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && e.target === lightbox) {
    closeLightbox();
  }
});

// Función para verificar si hay más productos abajo
function checkMoreProducts() {
  const productsGrid = document.getElementById('productsGrid');
  const scrollIndicator = document.querySelector('.scroll-down-indicator');
  
  if (!productsGrid || !scrollIndicator) return;
  
  const gridRect = productsGrid.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  
  // Mostrar el indicador con animación suave al hacer scroll
  if (scrollY > 50) {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.transform = 'translateY(0)';
    
    // Si el final de la grilla está fuera de la vista, hay más productos
    if (gridRect.bottom > windowHeight) {
      scrollIndicator.innerHTML = `
        <span class="animate__animated animate__bounce animate__infinite" style="font-size:2rem; color:#3b82f6;">
          <i class="fas fa-chevron-down"></i>
        </span>
        <div class="text-muted" style="font-size:1rem;">Desliza hacia abajo para ver más productos</div>
      `;
    } else {
      scrollIndicator.innerHTML = `
        <span style="font-size:2rem; color:#10b981;">
          <i class="fas fa-check-circle"></i>
        </span>
        <div class="text-success" style="font-size:1rem;">Has visto todos los productos</div>
      `;
    }
  } else {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.transform = 'translateY(-10px)';
  }
}

// Agregar event listener para scroll
window.addEventListener('scroll', checkMoreProducts);
window.addEventListener('resize', checkMoreProducts);

// Verificar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
      setTimeout(checkMoreProducts, 500); // Esperar a que se carguen los productos
  });
  
  // Inicializar carrito
  updateCart();
