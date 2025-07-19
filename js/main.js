// Inicializar AOS
AOS.init();

// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Caramañola 500 ML",
        price: 8000.00,
        category: "accesorios",
        subcategory: "accesorios",
        image: "../images/productos/Caramañola 500 ML - NUTREMAX.jpg",
        description: "Botella deportiva de 500 ml, ideal para mantenerte hidratado durante tus entrenamientos o actividades al aire libre. Práctica, liviana y fácil de transportar."
    },
    {
        id: 2,
        name: "Shaker S Negro - GOLD NUTRITION",
        price: 6500.00,
        category: "accesorios",
        subcategory: "accesorios",
        image: "../images/productos/Shaker S Negro - GOLD NUTRITION.jpg",
        description: "Vaso mezclador compacto y resistente de la marca Gold Nutrition, perfecto para preparar y tomar tus batidos de proteínas o suplementos de forma rápida y sin grumos."
    },
    {
        id: 3,
        name: "Creatine 300 G - GOLD NUTRITION",
        price: 31500.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/Creatine 300 G - GOLD NUTRITION.jpg",
        description: "Creatina monohidratada de alta pureza, fomenta la fuerza y la resistencia muscular, ideal para mejorar el rendimiento en entrenamientos de alta intensidad."
    },
    {
        id: 4,
        name: "Whey Protein 2 LB - ULTRA TECH",
        price: 45000.00,
        category: "proteinas",
        subcategory: "suplementos",
        image: "../images/productos/Whey Protein 2 LB - ULTRA TECH.jpg",
        description: "Proteína de suero concentrada de 2 libras de la marca Ultra Tech, contribuye a la recuperación muscular y al desarrollo de masa magra.",
        sabores: ["Vainilla", "Chocolate"]
    },
    {
        id: 5,
        name: "Creatine Monohydrate 309 G - BSN",
        price: 37500.00,
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
        description: "Proteína 100% de suero de leche de 2 libras, excelente fuente de aminoácidos para favorecer la recuperación y el crecimiento muscular.",
        sabores: ["Vainilla", "Chocolate"]
    },
    {
        id: 7,
        name: "Creatina Micronizada 300 G - ENA",
        price: 30500.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/Creatina Micronizada 300 G.jpg",
        description: "Creatina monohidratada micronizada de 300 gramos, se absorbe mejor y se mezcla fácilmente, potencia la fuerza y la resistencia muscular."
    },
    {
        id: 8,
        name: "Creatina 150gr - Body Advance",
        price: 13000.00,
        category: "creatinas",
        subcategory: "suplementos",
        image: "../images/productos/creatina body adbance.jpg",
        description: "Creatina pura en polvo de 150 gramos, ideal para potenciar tu rendimiento físico, aumentar la fuerza y optimizar la recuperación muscular en entrenamientos exigentes."
    },
    {
        id: 9,
        name: "WHEY PROTEIN x910g - Body Advance",
        price: 23500.00,
        category: "proteinas",
        subcategory: "suplementos",
        image: "../images/productos/proteina body adbance.jpg",
        description: "Proteína de suero de 910 gramos de Body Advance, excelente opción para complementar la dieta, ganar masa muscular y optimizar la recuperación post entrenamiento.",
        sabores: ["Chocolate"]
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
            
            // --- CORRECCIÓN DE RUTA DE IMAGEN SOLO EN index.html ---
            let imageSrc = item.image;
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                imageSrc = imageSrc.replace(/^\.\.\//, '');
            }
            // --- FIN CORRECCIÓN ---

            return `
            <tr data-item-id="${uniqueId}">
                <td>
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
                <td><span style="white-space:nowrap;">$${item.price.toLocaleString('es-AR')} ARS</span></td>
                <td>
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
                <td><span style="white-space:nowrap;">$${(item.price * item.quantity).toLocaleString('es-AR')} ARS</span></td>
                <td>
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
        cartShippingElement.innerHTML = '<div>Retiro en local: <span class="badge bg-success">Gratis</span></div><div>Envío: <span class="fw-bold">A coordinar</span></div>';
    }
    if (cartTotalElement) cartTotalElement.innerHTML = `<span style="white-space:nowrap;">${subtotal.toLocaleString('es-AR')} ARS</span>`;

    // Habilitar/deshabilitar botón de checkout
    if (checkoutButton) {
        checkoutButton.disabled = cart.items.length === 0;
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
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

// Función para mostrar el detalle del producto
function showProductDetail(product) {
    currentProduct = product;
    
    // Actualizar contenido del modal
    document.getElementById('productDetailImage').src = product.image;
    document.getElementById('productDetailImage').alt = product.name;
    document.getElementById('productDetailName').textContent = product.name;
    document.getElementById('productDetailCategory').textContent = product.category;
    document.getElementById('productDetailPrice').textContent = `$${product.price.toLocaleString('es-AR')} ARS`;
    document.getElementById('productDetailDescription').textContent = product.description;
    // Imagen de valor nutricional
    if (product.nutritionImage) {
        document.getElementById('productDetailNutrition').src = product.nutritionImage;
        document.getElementById('productDetailNutrition').alt = 'Valor nutricional de ' + product.name;
        document.getElementById('productDetailNutrition').style.display = '';
    } else {
        document.getElementById('productDetailNutrition').src = '';
        document.getElementById('productDetailNutrition').alt = '';
        document.getElementById('productDetailNutrition').style.display = 'none';
    }
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

// Función para filtrar productos
function filterProducts() {
    let filteredProducts = [...products];
    
    // Filtrar por búsqueda
    const searchTerm = document.getElementById('searchProducts')?.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por categoría
    const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked'))
        .map(checkbox => checkbox.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    // Filtrar por precio
    const maxPrice = document.getElementById('priceRange')?.value || 200;
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Aplicar ordenamiento
    filteredProducts = applySorting(filteredProducts);
    
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
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar productos y carrito
    displayProducts();
    updateCart();
    
    // Si estamos en productos.html y hay un parámetro id, abrir el modal de ese producto
    if (window.location.pathname.includes('productos.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            const prod = products.find(p => p.id == id);
            if (prod) {
                setTimeout(() => showProductDetail(prod), 300);
            }
        }
    }

    // Event listeners para filtros
    document.getElementById('searchProducts')?.addEventListener('input', filterProducts);
    document.getElementById('sortBy')?.addEventListener('change', () => {
        // Aplicar ordenamiento inmediatamente
        const currentProducts = document.querySelectorAll('.product-card').length > 0 ? 
            Array.from(document.querySelectorAll('.product-card')).map(card => {
                const productId = card.getAttribute('onclick').match(/showProductDetail\(([^)]+)\)/)[1];
                return products.find(p => p.id === JSON.parse(productId).id);
            }).filter(Boolean) : products;
        
        const sortedProducts = applySorting(currentProducts);
        displayProducts(sortedProducts);
    });
    document.getElementById('priceRange')?.addEventListener('input', (e) => {
        document.getElementById('priceValue').textContent = `$${e.target.value}`;
        filterProducts();
    });
    document.querySelectorAll('.filter-category').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Event listener para el carrito móvil
    const mobileCart = document.querySelector('.mobile-cart');
    if (mobileCart) {
        mobileCart.addEventListener('click', function(e) {
            e.preventDefault();
            viewCart();
        });
    }

    // Event listener para el carrito desktop
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            viewCart();
        });
    }

    // Limpiar backdrop cuando se cierra el modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('hidden.bs.modal', function () {
            // Remover backdrop y clases del body
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            // Restaurar el scroll
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
    }

    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Inicializar el carrito
    updateCart();
});
// Funciones mejoradas para el buscador
function applySearch(term) {
    const searchInput = document.getElementById('searchProducts');
    searchInput.value = term;
    filterProducts();
    showSearchResults();
}

function showSearchResults() {
    const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    const resultCount = document.getElementById('resultCount');
    const quickResults = document.getElementById('quickResults');
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (searchTerm) {
        // Filtrar productos
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        // Mostrar resultados
        searchResults.classList.remove('d-none');
        searchSuggestions.classList.add('d-none');
        resultCount.textContent = filteredProducts.length;

        // Mostrar resultados rápidos
        if (quickResults) {
            quickResults.innerHTML = filteredProducts
                .slice(0, 5)
                .map(product => `
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" 
                                 style="width: 50px; height: 50px; object-fit: cover; margin-right: 15px;">
                            <div>
                                <h6 class="mb-0">${product.name}</h6>
                                <small class="text-muted">${product.category} - $${product.price}</small>
                            </div>
                        </div>
                    </div>
                `).join('');
        }
    } else {
        searchResults.classList.add('d-none');
        searchSuggestions.classList.remove('d-none');
    }

    filterProducts();
}

// Event Listeners para el buscador mejorado
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchProducts');
    const clearButton = document.getElementById('clearSearch');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            showSearchResults();
            clearButton.style.display = searchInput.value ? 'block' : 'none';
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            showSearchResults();
            clearButton.style.display = 'none';
            document.getElementById('searchResults').classList.add('d-none');
            document.getElementById('searchSuggestions').classList.remove('d-none');
            filterProducts();
        });
    }
});
// Función para manejar la búsqueda desde el navbar
function handleNavbarSearch() {
    const searchTerm = document.getElementById('navbarSearch').value;
    if (searchTerm) {
        // Si estamos en index.html
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            window.location.href = 'pages/productos.html?search=' + encodeURIComponent(searchTerm);
        } 
        // Si estamos en productos.html
        else {
            const searchInput = document.getElementById('searchProducts');
            if (searchInput) {
                searchInput.value = searchTerm;
                filterProducts();
                showSearchResults();
            }
        }
    }
}

// Verificar si hay término de búsqueda en la URL al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Código existente del DOMContentLoaded...

    // Añadir esto para manejar búsquedas desde el index
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        const searchInput = document.getElementById('searchProducts');
        const navbarSearch = document.getElementById('navbarSearch');
        
        if (searchInput) {
            searchInput.value = searchTerm;
            filterProducts();
            showSearchResults();
        }
        
        if (navbarSearch) {
            navbarSearch.value = searchTerm;
        }
    }

    // Añadir evento para la tecla Enter en el buscador del navbar
    const navbarSearch = document.getElementById('navbarSearch');
    if (navbarSearch) {
        navbarSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNavbarSearch();
            }
        });
    }
});
// Efecto de scroll en el navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.3rem 0';
    } else {
        navbar.style.padding = '0.5rem 0';
    }
});
// Función para manejar los filtros de categoría
function handleCategoryFilter(category) {
    // Remover clase active de todos los botones y elementos del dropdown
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });

    // Añadir clase active al botón seleccionado
    const selectedButton = document.querySelector(`[data-filter="${category}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Filtrar productos
    let filteredProducts;
    if (category === 'todos') {
        filteredProducts = [...products];
    } else if (category === 'suplementos') {
        // Mostrar todos los productos cuya subcategoría sea suplementos (proteínas y creatinas)
        filteredProducts = products.filter(product => product.subcategory === 'suplementos');
    } else if (category === 'proteinas' || category === 'creatinas') {
        // Filtrar por categoría específica
        filteredProducts = products.filter(product => product.category === category);
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }

    // Aplicar ordenamiento
    filteredProducts = applySorting(filteredProducts);

    // Mostrar productos filtrados
    displayProducts(filteredProducts);
}

// Agregar event listeners a los botones de filtro
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners a los botones de filtro
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            handleCategoryFilter(category);
        });
    });

    // Agregar listeners a los elementos del dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter');
            handleCategoryFilter(category);
            
            // Actualizar el texto del botón dropdown
            const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
            dropdownButton.textContent = this.textContent;
        });
    });

    // Mostrar todos los productos inicialmente
    displayProducts(products);

    // Filtrar por categoría desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    if (categoria) {
        handleCategoryFilter(categoria);
    } else {
        displayProducts(products);
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
            delay: 3000
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

