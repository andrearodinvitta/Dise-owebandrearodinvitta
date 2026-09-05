// ==========================================================================
// Restaurante Asador Unión Latina - Lógica de la Aplicación
// ==========================================================================

// Estado global de la aplicación
const AppState = {
  activeCategory: 'all',
  searchQuery: '',
  cart: [],
  selectedDish: null
};

// Referencias al DOM
let dom = {};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  loadCartFromStorage();
  initEventListeners();
  renderPopularDishes();
  renderMenu();
  updateCartUI();
});

// Cachear elementos del DOM
function cacheDOM() {
  dom = {
    header: document.getElementById('main-header'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileNav: document.getElementById('mobile-nav'),
    popularGrid: document.getElementById('popular-dishes-grid'),
    menuGrid: document.getElementById('menu-items-grid'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    searchInput: document.getElementById('menu-search'),
    searchCount: document.getElementById('search-result-count'),
    // Carrito
    cartDrawer: document.getElementById('cart-drawer'),
    cartOverlay: document.getElementById('cart-drawer-overlay'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTotal: document.getElementById('cart-total'),
    cartCountBadges: document.querySelectorAll('.cart-count-badge'),
    openCartBtns: document.querySelectorAll('.open-cart-btn'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    sendWhatsAppBtn: document.getElementById('send-whatsapp-order-btn'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    customerNameInput: document.getElementById('order-customer-name'),
    orderTypeSelect: document.getElementById('order-type'),
    // Modal de Detalle
    dishModal: document.getElementById('dish-detail-modal'),
    dishModalOverlay: document.getElementById('dish-modal-overlay'),
    closeDishModalBtn: document.getElementById('close-dish-modal-btn'),
    dishModalImg: document.getElementById('modal-dish-img'),
    dishModalTitle: document.getElementById('modal-dish-title'),
    dishModalPrice: document.getElementById('modal-dish-price'),
    dishModalBadge: document.getElementById('modal-dish-badge'),
    dishModalCountry: document.getElementById('modal-dish-country'),
    dishModalDesc: document.getElementById('modal-dish-desc'),
    dishModalAllergens: document.getElementById('modal-dish-allergens'),
    dishModalQty: document.getElementById('modal-dish-qty'),
    dishModalQtyMinus: document.getElementById('modal-qty-minus'),
    dishModalQtyPlus: document.getElementById('modal-qty-plus'),
    dishModalAddBtn: document.getElementById('modal-add-to-cart-btn'),
    // Modal de Reservas
    reservationModal: document.getElementById('reservation-modal'),
    reservationModalOverlay: document.getElementById('reservation-modal-overlay'),
    openReservationBtns: document.querySelectorAll('.open-reservation-btn'),
    closeReservationBtn: document.getElementById('close-reservation-btn'),
    reservationForm: document.getElementById('reservation-form'),
    // Toast Container
    toastContainer: document.getElementById('toast-container')
  };
}

// Configurar event listeners
function initEventListeners() {
  // Scroll de la barra de navegación
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      dom.header.classList.add('scrolled');
    } else {
      dom.header.classList.remove('scrolled');
    }
  });

  // Menú móvil
  if (dom.mobileMenuBtn && dom.mobileNav) {
    dom.mobileMenuBtn.addEventListener('click', () => {
      dom.mobileNav.classList.toggle('hidden');
    });
    dom.mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => dom.mobileNav.classList.add('hidden'));
    });
  }

  // Filtros de categoría
  dom.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.activeCategory = tab.dataset.category;
      renderMenu();
    });
  });

  // Tarjetas de categorías del Hero (Nuestra Carta)
  document.querySelectorAll('.category-feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      const targetTab = document.querySelector(`.filter-tab[data-category="${category}"]`);
      if (targetTab) {
        dom.filterTabs.forEach(t => t.classList.remove('active'));
        targetTab.classList.add('active');
        AppState.activeCategory = category;
        renderMenu();
        // Desplazamiento suave al menú
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Búsqueda en vivo
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderMenu();
    });
  }

  // Carrito Drawer
  dom.openCartBtns.forEach(btn => {
    btn.addEventListener('click', openCart);
  });
  if (dom.closeCartBtn) dom.closeCartBtn.addEventListener('click', closeCart);
  if (dom.cartOverlay) dom.cartOverlay.addEventListener('click', closeCart);
  if (dom.clearCartBtn) dom.clearCartBtn.addEventListener('click', clearCart);
  if (dom.sendWhatsAppBtn) dom.sendWhatsAppBtn.addEventListener('click', sendWhatsAppOrder);

  // Modal de Detalle
  if (dom.closeDishModalBtn) dom.closeDishModalBtn.addEventListener('click', closeDishModal);
  if (dom.dishModalOverlay) dom.dishModalOverlay.addEventListener('click', closeDishModal);
  if (dom.dishModal) {
    dom.dishModal.addEventListener('click', (e) => {
      if (e.target === dom.dishModal) closeDishModal();
    });
  }
  
  if (dom.dishModalQtyMinus) {
    dom.dishModalQtyMinus.addEventListener('click', () => {
      let qty = parseInt(dom.dishModalQty.textContent) || 1;
      if (qty > 1) dom.dishModalQty.textContent = qty - 1;
    });
  }
  if (dom.dishModalQtyPlus) {
    dom.dishModalQtyPlus.addEventListener('click', () => {
      let qty = parseInt(dom.dishModalQty.textContent) || 1;
      dom.dishModalQty.textContent = qty + 1;
    });
  }
  if (dom.dishModalAddBtn) {
    dom.dishModalAddBtn.addEventListener('click', () => {
      if (AppState.selectedDish) {
        const qty = parseInt(dom.dishModalQty.textContent) || 1;
        addToCart(AppState.selectedDish, qty);
        closeDishModal();
      }
    });
  }

  // Modal de Reservas
  dom.openReservationBtns.forEach(btn => {
    btn.addEventListener('click', openReservationModal);
  });
  if (dom.closeReservationBtn) dom.closeReservationBtn.addEventListener('click', closeReservationModal);
  if (dom.reservationModalOverlay) dom.reservationModalOverlay.addEventListener('click', closeReservationModal);
  if (dom.reservationModal) {
    dom.reservationModal.addEventListener('click', (e) => {
      if (e.target === dom.reservationModal) closeReservationModal();
    });
  }
  if (dom.reservationForm) dom.reservationForm.addEventListener('submit', handleReservationSubmit);

  // Cerrar cualquier modal con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDishModal();
      closeReservationModal();
      closeCart();
    }
  });
}

// Renderizar Platos Populares
function renderPopularDishes() {
  if (!dom.popularGrid) return;
  const populars = MENU_ITEMS.filter(item => item.popular).slice(0, 4);

  dom.popularGrid.innerHTML = populars.map(dish => `
    <div class="menu-card snap-center flex-shrink-0 min-w-[280px] md:min-w-[290px]">
      <div class="img-wrapper cursor-pointer" onclick="openDishDetail('${dish.id}')">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy">
        <span class="card-badge">${dish.badge || 'Popular 🔥'}</span>
        <span class="card-country-badge">${dish.flag} ${dish.countryLabel.split('/')[0]}</span>
      </div>
      <div class="p-5 flex flex-col flex-grow justify-between bg-surface-container">
        <div>
          <h3 class="font-display text-xl text-inverse-surface mb-1 font-bold cursor-pointer hover:text-primary transition-colors" onclick="openDishDetail('${dish.id}')">${dish.name}</h3>
          <p class="text-xs text-on-surface-variant line-clamp-2 mb-3">${dish.description}</p>
        </div>
        <div class="flex items-center justify-between mt-auto pt-2 border-t border-outline-subtle">
          <span class="font-display text-xl font-bold text-primary">${dish.price.toFixed(2)}€</span>
          <button class="btn-cart-add" onclick="event.stopPropagation(); addToCartById('${dish.id}')">
            <span class="material-symbols-outlined text-sm">shopping_bag</span> Pedir
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Renderizar Menú Completo con Filtro y Búsqueda
function renderMenu() {
  if (!dom.menuGrid) return;

  const filtered = MENU_ITEMS.filter(item => {
    // Filtro por categoría
    let categoryMatch = false;
    if (AppState.activeCategory === 'all') {
      categoryMatch = true;
    } else if (AppState.activeCategory === item.category || AppState.activeCategory === item.country) {
      categoryMatch = true;
    }

    // Filtro por búsqueda
    let searchMatch = true;
    if (AppState.searchQuery) {
      const q = AppState.searchQuery;
      searchMatch = item.name.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.countryLabel.toLowerCase().includes(q) ||
                    (item.badge && item.badge.toLowerCase().includes(q));
    }

    return categoryMatch && searchMatch;
  });

  if (dom.searchCount) {
    dom.searchCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'plato disponible' : 'platos disponibles'}`;
  }

  if (filtered.length === 0) {
    dom.menuGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <span class="material-symbols-outlined text-5xl text-primary/40 mb-3">search_off</span>
        <h4 class="font-display text-2xl text-on-surface mb-2">No encontramos platos con ese nombre</h4>
        <p class="text-on-surface-variant text-sm mb-6">Prueba buscando otro término como "chaufa", "pollo", "batido", "fritada" o selecciona otra categoría.</p>
        <button class="btn-outline" onclick="resetSearch()">Ver toda la carta</button>
      </div>
    `;
    return;
  }

  dom.menuGrid.innerHTML = filtered.map(dish => `
    <div class="menu-card group">
      <div class="img-wrapper cursor-pointer" onclick="openDishDetail('${dish.id}')">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy">
        ${dish.badge ? `<span class="card-badge">${dish.badge}</span>` : ''}
        <span class="card-country-badge">${dish.flag} ${dish.countryLabel.split('/')[0]}</span>
      </div>
      <div class="p-5 flex flex-col flex-grow justify-between bg-surface-container">
        <div>
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <h4 class="font-display text-lg text-inverse-surface font-semibold group-hover:text-primary transition-colors cursor-pointer" onclick="openDishDetail('${dish.id}')">
              ${dish.name}
            </h4>
            <span class="font-display text-lg font-bold text-primary whitespace-nowrap">
              ${dish.price.toFixed(2)}€
            </span>
          </div>
          <p class="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">${dish.description}</p>
        </div>
        <div class="flex items-center gap-2 pt-2 border-t border-outline-subtle mt-auto">
          <button class="btn-ghost flex-1 py-1.5 text-xs text-center justify-center" onclick="openDishDetail('${dish.id}')">
            Detalles
          </button>
          <button class="btn-cart-add flex-1 py-1.5 justify-center" onclick="addToCartById('${dish.id}')">
            <span class="material-symbols-outlined text-sm">add_shopping_cart</span> Añadir
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function resetSearch() {
  AppState.searchQuery = '';
  AppState.activeCategory = 'all';
  if (dom.searchInput) dom.searchInput.value = '';
  dom.filterTabs.forEach(t => t.classList.remove('active'));
  const allTab = document.querySelector('.filter-tab[data-category="all"]');
  if (allTab) allTab.classList.add('active');
  renderMenu();
}

// Modal de Detalle de Plato
function openDishDetail(dishId) {
  const dish = MENU_ITEMS.find(i => i.id === dishId);
  if (!dish) return;

  AppState.selectedDish = dish;
  dom.dishModalImg.src = dish.image;
  dom.dishModalImg.alt = dish.name;
  dom.dishModalTitle.textContent = dish.name;
  dom.dishModalPrice.textContent = `${dish.price.toFixed(2)}€`;
  dom.dishModalDesc.textContent = dish.description;
  dom.dishModalCountry.textContent = `${dish.flag} ${dish.countryLabel}`;

  if (dish.badge) {
    dom.dishModalBadge.textContent = dish.badge;
    dom.dishModalBadge.classList.remove('hidden');
  } else {
    dom.dishModalBadge.classList.add('hidden');
  }

  if (dish.allergens && dish.allergens.length > 0) {
    dom.dishModalAllergens.innerHTML = `
      <span class="text-xs text-on-surface-muted">Alérgenos / Contiene: </span>
      <div class="flex flex-wrap gap-1 mt-1">
        ${dish.allergens.map(a => `<span class="text-[11px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant border border-outline-subtle">${a}</span>`).join('')}
      </div>
    `;
    dom.dishModalAllergens.classList.remove('hidden');
  } else {
    dom.dishModalAllergens.classList.add('hidden');
  }

  dom.dishModalQty.textContent = '1';
  dom.dishModal.classList.add('open');
  dom.dishModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDishModal() {
  if (dom.dishModal) dom.dishModal.classList.remove('open');
  if (dom.dishModalOverlay) dom.dishModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Exponer funciones globales
window.openDishDetail = openDishDetail;
window.closeDishModal = closeDishModal;
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.openCart = openCart;
window.closeCart = closeCart;
window.addToCartById = addToCartById;
window.resetSearch = resetSearch;

// Gestión del Carrito
function addToCartById(dishId, qty = 1) {
  const dish = MENU_ITEMS.find(i => i.id === dishId);
  if (dish) addToCart(dish, qty);
}

function addToCart(dish, qty = 1) {
  const existing = AppState.cart.find(item => item.id === dish.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    AppState.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: qty
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`¡"${dish.name}" añadido al pedido! 🛒`);
}

function updateCartQuantity(dishId, change) {
  const itemIndex = AppState.cart.findIndex(i => i.id === dishId);
  if (itemIndex === -1) return;

  AppState.cart[itemIndex].quantity += change;
  if (AppState.cart[itemIndex].quantity <= 0) {
    AppState.cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(dishId) {
  AppState.cart = AppState.cart.filter(i => i.id !== dishId);
  saveCartToStorage();
  updateCartUI();
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast('Pedido vaciado');
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Actualizar badges
  dom.cartCountBadges.forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  // Totales
  if (dom.cartSubtotal) dom.cartSubtotal.textContent = `${totalAmount.toFixed(2)}€`;
  if (dom.cartTotal) dom.cartTotal.textContent = `${totalAmount.toFixed(2)}€`;

  // Renderizar items
  if (!dom.cartItemsList) return;

  if (AppState.cart.length === 0) {
    dom.cartItemsList.innerHTML = `
      <div class="py-12 text-center text-on-surface-variant flex flex-col items-center">
        <span class="material-symbols-outlined text-5xl text-primary/30 mb-3">shopping_basket</span>
        <p class="font-display text-lg text-on-surface mb-1">Tu pedido está vacío</p>
        <p class="text-xs text-on-surface-muted max-w-[200px]">Explora nuestra carta y añade tus platos favoritos para pedir al momento.</p>
      </div>
    `;
    if (dom.sendWhatsAppBtn) dom.sendWhatsAppBtn.disabled = true;
    return;
  }

  if (dom.sendWhatsAppBtn) dom.sendWhatsAppBtn.disabled = false;

  dom.cartItemsList.innerHTML = AppState.cart.map(item => `
    <div class="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-subtle">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-md flex-shrink-0">
      <div class="flex-grow min-w-0">
        <h5 class="font-display text-sm text-inverse-surface font-semibold truncate">${item.name}</h5>
        <span class="text-xs text-primary font-bold">${item.price.toFixed(2)}€ / ud</span>
        <div class="flex items-center gap-2 mt-1.5">
          <button class="w-6 h-6 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center text-xs" onclick="updateCartQuantity('${item.id}', -1)">-</button>
          <span class="text-xs font-bold text-inverse-surface px-1">${item.quantity}</span>
          <button class="w-6 h-6 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center text-xs" onclick="updateCartQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <div class="text-right flex flex-col justify-between items-end h-14">
        <button class="text-on-surface-muted hover:text-error transition-colors" onclick="removeFromCart('${item.id}')">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
        <span class="font-display text-sm font-bold text-inverse-surface">${(item.price * item.quantity).toFixed(2)}€</span>
      </div>
    </div>
  `).join('');
}

function openCart() {
  dom.cartDrawer.classList.add('open');
  dom.cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  dom.cartDrawer.classList.remove('open');
  dom.cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Envío del Pedido a WhatsApp
function sendWhatsAppOrder() {
  if (AppState.cart.length === 0) return;

  const customerName = (dom.customerNameInput && dom.customerNameInput.value.trim()) || 'Cliente';
  const orderType = (dom.orderTypeSelect && dom.orderTypeSelect.value) || 'Recogida en Restaurante (Takeaway)';
  const totalAmount = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let message = `¡Hola *Restaurante Asador Unión Latina*! 👋🍗\n`;
  message += `Quisiera realizar el siguiente pedido:\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `📍 *Modalidad:* ${orderType}\n\n`;
  message += `🍽️ *DETALLE DE PLATOS:*\n`;

  AppState.cart.forEach((item, index) => {
    message += `• ${item.quantity}x ${item.name} — ${(item.price * item.quantity).toFixed(2)}€\n`;
  });

  message += `\n💰 *TOTAL A PAGAR:* *${totalAmount.toFixed(2)}€*\n\n`;
  message += `Por favor confirmadme el tiempo estimado de preparación. ¡Muchas gracias! 🔥`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/34603330575?text=${encodedMsg}`;

  window.open(whatsappUrl, '_blank');
  showToast('Redirigiendo a WhatsApp para enviar tu pedido...');
}

// Modal de Reservas
function openReservationModal() {
  dom.reservationModal.classList.add('open');
  dom.reservationModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
  dom.reservationModal.classList.remove('open');
  dom.reservationModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function handleReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('res-name').value.trim();
  const phone = document.getElementById('res-phone').value.trim();
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const guests = document.getElementById('res-guests').value;
  const notes = document.getElementById('res-notes').value.trim();

  let message = `¡Hola *Unión Latina*! 📅 Deseo solicitar una *Reserva de Mesa*:\n\n`;
  message += `👤 *Nombre:* ${name}\n`;
  message += `📞 *Teléfono:* ${phone}\n`;
  message += `🗓️ *Fecha:* ${date}\n`;
  message += `⏰ *Hora:* ${time}\n`;
  message += `👥 *Comensales:* ${guests} personas\n`;
  if (notes) message += `📝 *Observaciones:* ${notes}\n`;
  message += `\n¿Tienen disponibilidad? ¡Muchas gracias! 🔥`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/34603330575?text=${encodedMsg}`;

  closeReservationModal();
  dom.reservationForm.reset();
  showToast('¡Solicitud de reserva completada! Enviando confirmación por WhatsApp...');
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 400);
}

// Almacenamiento local
function saveCartToStorage() {
  try {
    localStorage.setItem('unionlatina_cart', JSON.stringify(AppState.cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('unionlatina_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {}
}

// Toast Notificaciones
function showToast(message) {
  if (!dom.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
    <span>${message}</span>
  `;

  dom.toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
