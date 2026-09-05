/**
 * DUMORE Chocolate - Application Logic
 * Interactive Catalog, Custom Calculator, Shopping Cart & WhatsApp Integration
 */

// Format currency as Colombian Pesos
function formatCOP(amount) {
  return '$' + amount.toLocaleString('es-CO');
}

// Global Cart State
let cart = [];

// Try to load cart from localStorage
try {
  const savedCart = localStorage.getItem('dumore_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn('Could not load cart from localStorage', e);
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Update Cart Badge and Render Drawer
function updateCartUI() {
  const counter = document.getElementById('cart-counter');
  const itemsContainer = document.getElementById('cart-items-body');
  const totalDisplay = document.getElementById('cart-total-price');
  
  if (counter) {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    counter.textContent = totalCount;
  }

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <span class="material-symbols-outlined">shopping_basket</span>
          <p>Tu carrito está vacío</p>
          <p style="font-size: 0.8rem; margin-top: 6px;">Agrega productos desde nuestro catálogo para continuar.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h5 class="cart-item-title">${item.title}</h5>
            <p class="cart-item-variant">${item.variant}</p>
            <p class="cart-item-price">${formatCOP(item.price * item.qty)}</p>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeCartQty(${index}, -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 600; min-width: 16px; text-align: center;">${item.qty}</span>
            <button class="qty-btn" onclick="changeCartQty(${index}, 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeFromCart(${index})" title="Eliminar">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      `).join('');
    }
  }

  if (totalDisplay) {
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    totalDisplay.textContent = formatCOP(total);
  }

  // Save to localStorage
  try {
    localStorage.setItem('dumore_cart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save cart to localStorage', e);
  }
}

// Add Item to Cart
window.addToCart = function(title, price, variant, image) {
  const existing = cart.find(item => item.title === title && item.variant === variant);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      title,
      price,
      variant,
      image,
      qty: 1
    });
  }
  updateCartUI();
  showToast(`¡${title} añadido al pedido!`);
};

// Change Item Quantity
window.changeCartQty = function(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
};

// Remove Item from Cart
window.removeFromCart = function(index) {
  if (!cart[index]) return;
  const removed = cart.splice(index, 1)[0];
  updateCartUI();
  showToast(`Se eliminó ${removed.title}`);
};

// Open and Close Cart Drawer
function setupCartDrawer() {
  const cartBtn = document.getElementById('cart-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Checkout via WhatsApp
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Tu carrito está vacío. Elige tus productos favoritos primero.');
        return;
      }

      let message = '🌸 *¡Hola DUMORE Chocolate!* Quisiera realizar el siguiente pedido:\n\n';
      let grandTotal = 0;

      cart.forEach((item, i) => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        message += `*${i + 1}. ${item.title}*\n`;
        message += `   • Presentación: ${item.variant}\n`;
        message += `   • Cantidad: ${item.qty}\n`;
        message += `   • Subtotal: ${formatCOP(itemTotal)}\n\n`;
      });

      message += `💎 *TOTAL A PAGAR:* ${formatCOP(grandTotal)}\n\n`;
      message += `¿Podrían indicarme los métodos de pago disponibles y coordinar la entrega? Muchas gracias. ✨`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/573108239392?text=${encoded}`, '_blank');
    });
  }
}

// Category Filter Tabs
function setupCatalogFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filter === 'all' || cardCat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Custom Order Calculator System
const calculatorData = {
  'fresas-caja': {
    name: 'Fresas en Caja de Lujo',
    sizes: [
      { text: 'Caja x 6 fresas', price: 45000 },
      { text: 'Caja x 9 fresas', price: 55000 },
      { text: 'Caja x 12 fresas', price: 70000 },
      { text: 'Caja x 15 fresas', price: 80000 },
      { text: 'Caja x 20 fresas', price: 90000 }
    ]
  },
  'fresas-ramo': {
    name: 'Ramo Floral de Fresas',
    sizes: [
      { text: 'Ramo x 4 fresas', price: 40000 },
      { text: 'Ramo x 6 fresas', price: 50000 },
      { text: 'Ramo x 9 fresas', price: 60000 }
    ]
  },
  'chocobombas': {
    name: 'Chocobombas Gourmet',
    sizes: [
      { text: 'Unidad individual Clásica', price: 10000 },
      { text: 'Caja x 4 Clásicas', price: 40000 },
      { text: 'Caja x 6 Clásicas', price: 60000 },
      { text: 'Unidad individual Gourmet', price: 13000 },
      { text: 'Caja x 4 Gourmet', price: 52000 },
      { text: 'Caja x 6 Gourmet', price: 78000 },
      { text: 'Caja x 4 Mini Clásicas', price: 20000 }
    ]
  },
  'donas': {
    name: 'Mini Donas Glaseadas',
    sizes: [
      { text: 'Caja x 8 mini donas', price: 18000 },
      { text: 'Caja x 16 mini donas', price: 30000 },
      { text: 'Caja x 27 mini donas', price: 45000 },
      { text: 'Pack x 6 Brochetas de Donas', price: 40000 }
    ]
  }
};

function setupCalculator() {
  const baseRadios = document.querySelectorAll('input[name="calc-base"]');
  const sizeSelect = document.getElementById('calc-size-select');
  const chocoRadios = document.querySelectorAll('input[name="calc-choco"]');
  const addonGold = document.getElementById('addon-gold');
  const addonToppings = document.getElementById('addon-toppings');
  const addonRibbon = document.getElementById('addon-ribbon');
  const addonCard = document.getElementById('addon-card');
  const noteInput = document.getElementById('calc-note');

  // Summary Elements
  const sumProduct = document.getElementById('sum-product');
  const sumSize = document.getElementById('sum-size');
  const sumChoco = document.getElementById('sum-choco');
  const sumAddons = document.getElementById('sum-addons');
  const totalDisplay = document.getElementById('calc-total-display');
  const orderWhatsAppBtn = document.getElementById('calc-order-whatsapp-btn');

  function populateSizes(baseKey) {
    const data = calculatorData[baseKey];
    if (!data) return;

    sizeSelect.innerHTML = data.sizes.map((s, idx) => `
      <option value="${s.price}" data-name="${s.text}" ${idx === 0 ? 'selected' : ''}>
        ${s.text} (${formatCOP(s.price)})
      </option>
    `).join('');
  }

  function calculateTotal() {
    // Selected Base
    let selectedBase = 'fresas-caja';
    baseRadios.forEach(radio => {
      const label = radio.closest('.calc-radio-label');
      if (radio.checked) {
        selectedBase = radio.value;
        if (label) label.classList.add('selected');
      } else {
        if (label) label.classList.remove('selected');
      }
    });

    // Base Price
    const baseData = calculatorData[selectedBase];
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const basePrice = selectedOption ? parseInt(selectedOption.value, 10) : 45000;
    const sizeName = selectedOption ? selectedOption.getAttribute('data-name') : 'Estándar';

    // Selected Chocolate
    let selectedChoco = 'Combinado';
    chocoRadios.forEach(radio => {
      const label = radio.closest('.calc-radio-label');
      if (radio.checked) {
        selectedChoco = radio.value;
        if (label) label.classList.add('selected');
      } else {
        if (label) label.classList.remove('selected');
      }
    });

    // Addons
    let addonsTotal = 0;
    const addonsList = ['🛵 Envío Gratis (< 2 km)'];

    if (addonGold && addonGold.checked) {
      addonsTotal += parseInt(addonGold.getAttribute('data-price'), 10);
      addonsList.push('Hojas de Oro (+ $8.000)');
    }
    if (addonToppings && addonToppings.checked) {
      addonsTotal += parseInt(addonToppings.getAttribute('data-price'), 10);
      addonsList.push('Toppings Especiales (+ $5.000)');
    }
    if (addonRibbon && addonRibbon.checked) {
      addonsTotal += parseInt(addonRibbon.getAttribute('data-price'), 10);
      addonsList.push('Lazo Satinado (+ $6.000)');
    }
    if (addonCard && addonCard.checked) {
      addonsList.push('Tarjeta Dedicatoria (Gratis)');
    }

    const grandTotal = basePrice + addonsTotal;

    // Update UI Summary
    if (sumProduct) sumProduct.textContent = baseData.name;
    if (sumSize) sumSize.textContent = sizeName;
    if (sumChoco) sumChoco.textContent = selectedChoco;
    if (sumAddons) {
      sumAddons.textContent = addonsList.join(', ');
    }
    if (totalDisplay) {
      totalDisplay.textContent = formatCOP(grandTotal);
    }
  }

  // Base radio change listener
  baseRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      populateSizes(radio.value);
      calculateTotal();
    });
  });

  // Size dropdown change
  if (sizeSelect) sizeSelect.addEventListener('change', calculateTotal);

  // Chocolate options change
  chocoRadios.forEach(radio => {
    radio.addEventListener('change', calculateTotal);
  });

  // Addons change
  [addonGold, addonToppings, addonRibbon, addonCard].forEach(checkbox => {
    if (checkbox) checkbox.addEventListener('change', calculateTotal);
  });

  // Init
  populateSizes('fresas-caja');
  calculateTotal();

  // WhatsApp Order Submission
  if (orderWhatsAppBtn) {
    orderWhatsAppBtn.addEventListener('click', () => {
      const prodName = sumProduct.textContent;
      const sizeText = sumSize.textContent;
      const chocoText = sumChoco.textContent;
      const addonsText = sumAddons.textContent;
      const totalText = totalDisplay.textContent;
      const noteText = noteInput && noteInput.value.trim() ? noteInput.value.trim() : 'Sin mensaje especificado';

      let msg = `🌸 *¡Hola DUMORE Chocolate!* Acabo de cotizar un pedido en su sitio web:\n\n`;
      msg += `🍓 *Producto:* ${prodName}\n`;
      msg += `📦 *Presentación:* ${sizeText}\n`;
      msg += `🍫 *Tipo de Chocolate:* ${chocoText}\n`;
      msg += `✨ *Adicionales:* ${addonsText}\n`;
      msg += `💌 *Dedicatoria:* "${noteText}"\n\n`;
      msg += `💰 *TOTAL COTIZADO:* ${totalText}\n\n`;
      msg += `¿Tienen disponibilidad para coordinar fecha y entrega? ¡Muchas gracias! 💕`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/573108239392?text=${encoded}`, '_blank');
    });
  }
}

// Reservation Form
function setupReservationForm() {
  const form = document.getElementById('reserve-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const address = document.getElementById('res-address').value.trim();
    const product = document.getElementById('res-product').value;

    let msg = `🌸 *¡Hola DUMORE!* Quisiera agendar una reserva de sorpresa:\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📱 *Teléfono:* ${phone}\n`;
    msg += `📅 *Fecha Deseada:* ${date}\n`;
    msg += `⏰ *Franja Horaria:* ${time}\n`;
    msg += `📍 *Dirección de Entrega:* ${address}\n`;
    msg += `🛵 *Envío:* Envío gratis si es a menos de 2 km a la redonda (Bogotá)\n`;
    msg += `🎁 *Producto de Interés:* ${product}\n\n`;
    msg += `Quedo atento a su confirmación y cálculo de envío. ¡Gracias! ✨`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/573108239392?text=${encoded}`, '_blank');
    showToast('¡Redirigiendo a WhatsApp para confirmar tu reserva!');
  });
}

// Mobile Menu Navigation
function setupMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    toggle.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.querySelector('.material-symbols-outlined').textContent = 'menu';
    });
  });
}

// Header Scroll Effect & Active Nav Link Spy
function setupScrollEffects() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header blur/shadow on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy for navigation
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupCartDrawer();
  setupCatalogFilter();
  setupCalculator();
  setupReservationForm();
  setupMobileMenu();
  setupScrollEffects();
  updateCartUI();

  // Set min date for delivery to tomorrow
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }
});
