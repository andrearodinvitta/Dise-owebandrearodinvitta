/**
 * ZOE SUBLIGRAFT - Interactive Magical Frontend Logic
 * Ethereal Alchemy & Soft-Tactile Glassmorphism
 */

// Product Data
const PRODUCTS = [
  {
    id: 'tumbler-skinny',
    category: 'vasos',
    title: 'Vaso Skinny Mágico 20oz',
    subtitle: 'Hechizo Líquido • Aislamiento Térmico',
    price: 24.99,
    baseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEepvnfX-yakU0O1DtekwvY--K2Z3V-9oq6ezxBUr0-00OhBgoDGpmXYLKEdNoLVaSgutom8VEnATkiFGyULz0SI-vU2b8wjSxVcdglX4FWBrMYcDA6wAfZVRZ-Ch5xcRYK02A-_ETVrtx2ivDjl83U1adGqSJGVuk1q2yzE0e6vvGXCNsvGCoDtP7QhZimdg3VDF7Z6RDfac2vAWFuWX1vvVnnmE_brXRSDPq8cN9atdTr0hvKNI',
    badge: 'Más Deseado',
    description: 'Vaso térmico de acero inoxidable con sublimación de alta definición calidad fotográfica. Mantiene pociones frías 24h o calientes 12h. Incluye pajita mágica reutilizable.',
    options: ['Brillo Galaxia', 'Oro Rosa Místico', 'Aura Lavanda']
  },
  {
    id: 'taza-alquimia',
    category: 'tazas',
    title: 'Taza Cerámica de Alquimista',
    subtitle: 'Poción Matutina • 11oz / 15oz',
    price: 16.50,
    baseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYhxIiAUU3sFKwbaltp7jsm1OSR-ziwNjR1fcyvtTZPp9nz8v4uMHoPkuVKgLOVm0ouNsLI9ca9Ld2wPd9c2lVEwMzHy7HDpeZqgdRBjLj_8nC2mAqGD17v6cJOGh1AgeiFhg8C7NKdExvJdRJyszDR2h_zPIjgM5C4zNSbK3qBP8n1zYTWdLCz8eTYxBBdnhbTwoGtR1IfTRvRreE0S2MT2ZoVnXglj4ZPXDf-RPrcVTtehBPdoQ',
    badge: 'Clásico Encantado',
    description: 'Taza de cerámica premium con filo dorado y acabado brillante. Apta para microondas y lavavajillas. Colores vibrantes que no se desvanecen con el tiempo.',
    options: ['Blanco Puro con Borde Oro', 'Taza Mágica Termosensible', 'Efecto Perlado']
  },
  {
    id: 'cubo-luz',
    category: 'cubos',
    title: 'Cubo de Cristal con Luz LED',
    subtitle: 'Aura Luminosa • Grabado Eterno',
    price: 32.00,
    baseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGlYSURmvZb83ygfrjzO01Hh-GR0PTXQZFHhSL8qDfk0rvF2jlSEXywfDJoJdrO2BWihLF6ZRauzbopzx5zSj9_tQ12KVI2CLvA8v8SVdWT3Wa51JMaYor8zqpCwbcDfOh3xFYh-esmKq55hv4ZcXDWTdbfzW_w1D6jxbHOPljevqQmfjELv6gtkeC6ubHilA08-qd3C_0VaEi767ZyVR-lqrJQse9wZrLtH1H-zWiyjGg8AdWqr0',
    badge: 'Edición Especial',
    description: 'Cubo de cristal óptico K9 con base de madera noble e iluminación LED cálida. Tu fotografía favorita proyectada en 3D con un halo místico inigualable.',
    options: ['Luz Cálida Ámbar', 'Luz Multicolor RGB', 'Base Madera Grabada']
  },
  {
    id: 'llavero-taliman',
    category: 'llaveros',
    title: 'Llavero Talismán Porta Labial',
    subtitle: 'Amuleto Protector • Neopreno Suave',
    price: 9.90,
    baseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnrkd0h9UDbJmzSCIlyjmaQWbEQhPWEO3H8iI-1vN2WZYl82sIoxXOGazzEC-iwVcJzqqOhjPCHpqGJ4WSRYlyK-ZtMxC2xBkz32L2fZWP4Zwm5P00GeqD6kwqaNML29yvPYFer1qghAqDjZsnI3ppOU9hs3HC7t5l_BOv2TXvLPwVF6wOm88iBW2b3i4tUhGUNNUaVteiLKIQEu6oW3SZ8Wd_9tNOtmcN-bIYfnXDZf3RTCY6Jk8',
    badge: 'Accesorio Mágico',
    description: 'Funda compacta para bálsamo labial o lápiz de labios con mosquetón dorado. Tela técnica impermeable con estampados celestiales de alta durabilidad.',
    options: ['Constelaciones Noche', 'Flores de Hada', 'Símbolos Alquímicos']
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Valentina & Mateo',
    city: 'Madrid',
    product: 'Vasos Skinny Personalizados',
    stars: 5,
    text: '¡Quedaron absolutamente espectaculares! El brillo y los detalles de la foto de nuestro aniversario son increíbles. Zoe es una verdadera maga del diseño.',
    date: 'Hace 3 días'
  },
  {
    name: 'Clara Domínguez',
    city: 'Barcelona',
    product: 'Cubo de Luz Fotográfico',
    stars: 5,
    text: 'Se lo regalé a mi madre por su cumpleaños y lloró de la emoción. La calidad del cristal y la luz cálida crean un ambiente mágico en el salón.',
    date: 'Hace 1 semana'
  },
  {
    name: 'Sofía Navarro',
    city: 'Valencia',
    product: 'Tazas Mágicas de Alquimista',
    stars: 5,
    text: 'Pedí 4 tazas personalizadas para mis mejores amigas. El empaque de regalo parecía salido de un cuento de hadas. ¡100% recomendada!',
    date: 'Hace 2 semanas'
  }
];

// Current State
let currentProduct = PRODUCTS[0];
let soundEnabled = false;
let audioCtx = null;

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSparkles();
  initProductFilter();
  initFAQ();
  initTestimonials();
  initAudio();
  initContactForm();
  initNewsletter();
});

// Mobile Navigation Drawer
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = mobileMenu?.querySelectorAll('a');

  function openMenu() {
    mobileMenu?.classList.remove('-translate-x-full');
    backdrop?.classList.remove('hidden');
    setTimeout(() => backdrop?.classList.remove('opacity-0'), 10);
    playChime();
  }

  function closeMenu() {
    mobileMenu?.classList.add('-translate-x-full');
    backdrop?.classList.add('opacity-0');
    setTimeout(() => backdrop?.classList.add('hidden'), 300);
  }

  menuBtn?.addEventListener('click', openMenu);
  closeMenuBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  navLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Sparkle Particle Animation Canvas
function initSparkles() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = ['#fcd400', '#d8bfd8', '#ffe16d', '#ffffff', '#e9c400', '#fbdbde'];

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * (isBurst ? 4.5 : 2.5) + 1;
      this.speedX = (Math.random() - 0.5) * (isBurst ? 5 : 1.5);
      this.speedY = (Math.random() - 0.5) * (isBurst ? 5 : 1.5) - (isBurst ? 1 : 0.5);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
      this.rotation += this.rotationSpeed;
      if (this.size > 0.2) this.size -= 0.02;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      
      // Draw 4-point star
      ctx.beginPath();
      const spikes = 4;
      const outerRadius = this.size * 2;
      const innerRadius = this.size * 0.7;
      let rot = Math.PI / 2 * 3;
      let cx = 0, cy = 0;
      const step = Math.PI / spikes;

      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        cx = Math.cos(rot) * outerRadius;
        cy = Math.sin(rot) * outerRadius;
        ctx.lineTo(cx, cy);
        rot += step;

        cx = Math.cos(rot) * innerRadius;
        cy = Math.sin(rot) * innerRadius;
        ctx.lineTo(cx, cy);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Pointer move throttle
  let lastMove = 0;
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastMove > 40) {
      particles.push(new Particle(e.clientX, e.clientY));
      lastMove = now;
    }
  });

  // Pointer click burst
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 14; i++) {
      particles.push(new Particle(e.clientX, e.clientY, true));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Category Filtering
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
      playChime();
    });
  });
}

// Product Customizer Modal
window.openCustomizer = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  currentProduct = product;

  const modal = document.getElementById('customizer-modal');
  const title = document.getElementById('modal-product-title');
  const subtitle = document.getElementById('modal-product-subtitle');
  const desc = document.getElementById('modal-product-desc');
  const price = document.getElementById('modal-product-price');
  const previewImg = document.getElementById('modal-preview-img');
  const finishSelect = document.getElementById('modal-finish-select');
  const customTextInput = document.getElementById('modal-custom-text');
  const previewText = document.getElementById('modal-text-preview');

  if (title) title.innerText = product.title;
  if (subtitle) subtitle.innerText = product.subtitle;
  if (desc) desc.innerText = product.description;
  if (price) price.innerText = `$${product.price.toFixed(2)}`;
  if (previewImg) previewImg.src = product.baseImage;
  if (customTextInput) customTextInput.value = '';
  if (previewText) previewText.innerText = 'Tu Frase Mágica';

  // Populate options
  if (finishSelect) {
    finishSelect.innerHTML = product.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
  }

  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
  playChime();
};

window.closeCustomizer = function() {
  const modal = document.getElementById('customizer-modal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
};

// Live Text update on Preview
window.updateCustomText = function(val) {
  const previewText = document.getElementById('modal-text-preview');
  if (previewText) {
    previewText.innerText = val.trim() ? val : 'Tu Frase Mágica';
  }
};

window.updatePreviewFont = function(fontClass) {
  const previewText = document.getElementById('modal-text-preview');
  if (previewText) {
    previewText.className = `text-overlay-preview text-xl md:text-2xl font-bold text-white drop-shadow-lg ${fontClass}`;
  }
};

// Handle Custom Photo Upload
window.handleImageUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const previewImg = document.getElementById('modal-preview-img');
    if (previewImg) {
      previewImg.src = e.target.result;
    }
    showToast('✨ Foto mágica cargada correctamente');
  };
  reader.readAsDataURL(file);
};

// Send Order via WhatsApp
window.sendWhatsAppOrder = function() {
  const product = currentProduct;
  const text = document.getElementById('modal-custom-text')?.value || 'Sin texto personalizado';
  const finish = document.getElementById('modal-finish-select')?.value || 'Estándar';
  const giftBox = document.getElementById('modal-gift-box')?.checked ? 'Sí (Caja de Regalo de Terciopelo con Lazo Dorado +$4.00)' : 'No (Empaque estándar)';
  const notes = document.getElementById('modal-notes')?.value || 'Ninguna';

  const totalPrice = product.price + (document.getElementById('modal-gift-box')?.checked ? 4 : 0);

  const message = `✨ *NUEVO PEDIDO MÁGICO - ZOE SUBLIGRAFT* ✨\n\n` +
    `🔮 *Artefacto:* ${product.title}\n` +
    `💎 *Acabado:* ${finish}\n` +
    `✍️ *Texto/Dedicatoria:* "${text}"\n` +
    `🎁 *Empaque de Regalo:* ${giftBox}\n` +
    `📝 *Instrucciones especiales:* ${notes}\n` +
    `💰 *Precio Estimado:* $${totalPrice.toFixed(2)}\n\n` +
    `¡Hola Zoe! Me encantaría confeccionar este recuerdo contigo. ¿Cómo procedemos con el diseño y envío?`;

  const phone = '34600000000'; // Target WhatsApp number
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  window.open(waUrl, '_blank');
  closeCustomizer();
  showToast('🪄 ¡Redirigiendo a tu chat mágico de WhatsApp!');
};

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
        playChime();
      }
    });
  });
}

// Testimonials Gallery
function initTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:scale-102 transition-transform duration-300 relative border border-secondary-container/40">
      <div>
        <div class="flex items-center gap-1 text-secondary mb-3">
          ${'★'.repeat(t.stars)}
        </div>
        <p class="font-serif italic text-on-surface text-base mb-4">"${t.text}"</p>
      </div>
      <div class="pt-4 border-t border-primary-fixed-dim/40 flex items-center justify-between">
        <div>
          <h4 class="font-bold text-sm text-primary">${t.name}</h4>
          <p class="text-xs text-on-surface-variant">${t.product} • ${t.city}</p>
        </div>
        <span class="text-[11px] text-outline">${t.date}</span>
      </div>
    </div>
  `).join('');
}

// Web Audio API Synthesizer Chime
function initAudio() {
  const soundToggle = document.getElementById('sound-toggle');
  soundToggle?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled 
      ? '<span class="material-symbols-outlined text-sm text-primary">volume_up</span> <span class="hidden sm:inline">Sonido Mágico ON</span>'
      : '<span class="material-symbols-outlined text-sm text-on-surface-variant">volume_off</span> <span class="hidden sm:inline">Sonido OFF</span>';
    
    if (soundEnabled) {
      playChime(true);
      showToast('🔔 Sonidos del taller activados');
    } else {
      showToast('🔕 Sonidos silenciados');
    }
  });
}

function playChime(force = false) {
  if (!soundEnabled && !force) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.06);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + index * 0.06);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + index * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + index * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + index * 0.06);
      osc.stop(audioCtx.currentTime + index * 0.06 + 0.45);
    });
  } catch (e) {
    console.warn('Audio not available', e);
  }
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('magic-contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value;
    const msg = document.getElementById('contact-msg')?.value;
    
    const waText = encodeURIComponent(`Hola Zoe, mi nombre es ${name}. Quería consultarte: ${msg}`);
    window.open(`https://wa.me/34600000000?text=${waText}`, '_blank');
    
    showToast('✨ Mensaje enviado con éxito');
    form.reset();
  });
}

// Newsletter Subscription
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 ¡Bienvenido a nuestra Comunidad Mágica!');
      form.reset();
      playChime();
    });
  });
}

// Notification Toast
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-full text-on-surface font-medium text-sm border border-secondary-container shadow-2xl flex items-center gap-2';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="material-symbols-outlined text-primary text-base">auto_awesome</span> ${msg}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
