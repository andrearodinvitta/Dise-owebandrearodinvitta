/**
 * ANDREA RODRIGUEZ - KINETIC EDITORIAL INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Active Navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all items
      accordionItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // If it wasn't open, open it
      if (!isOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Modal Contact Logic
  const contactModal = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const contactTriggers = document.querySelectorAll('.trigger-contact-modal');
  const serviceRadios = document.querySelectorAll('input[name="serviceType"]');

  function openContactModal(serviceType = null) {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (serviceType) {
        const targetRadio = document.querySelector(`input[name="serviceType"][value="${serviceType}"]`);
        if (targetRadio) {
          targetRadio.checked = true;
        }
      }
    }
  }

  function closeContactModal() {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  contactTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openContactModal(service);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeContactModal);
  }

  // Close modal on background click
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeServiceDetailModal();
    }
  });

  // 5. Service Detail Modal
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const serviceDetailCloseBtn = document.getElementById('serviceDetailCloseBtn');
  const serviceDetailTriggers = document.querySelectorAll('.trigger-service-detail');
  const detailTitle = document.getElementById('detailTitle');
  const detailDescription = document.getElementById('detailDescription');
  const detailPoints = document.getElementById('detailPoints');
  const detailCtaBtn = document.getElementById('detailCtaBtn');

  const serviceData = {
    negocio: {
      title: "Para Tu Negocio: Conversión y Presencia",
      desc: "Transformamos visitas en clientes reales desde el primer día. Olvídate de plantillas lentas o webs genéricas que nadie visita.",
      points: [
        "Auditoría y optimización de tu ficha de Google Business Profile.",
        "Arquitectura pensada para llamadas, reservas y mensajes directos a WhatsApp.",
        "Velocidad de carga de 100/100 en Google PageSpeed.",
        "Textos redactados con copywriting persuasivo para tu sector local.",
        "Diseño 100% adaptado a móviles (donde está el 85% de tus clientes).",
        "Panel sencillo para actualizar horarios, precios o menús.",
        "Entrega y publicación garantizada en solo 48 horas tras recibir tu material."
      ],
      tag: "negocio"
    },
    celebraciones: {
      title: "Para Tus Celebraciones: Bodas & Fiestas de 15 Años",
      desc: "Espacios digitales memorables diseñados a medida tanto para bodas elegantes como para celebraciones de 15 años (quinceañeras), emocionando a tus invitados y organizando todo sin complicaciones.",
      points: [
        "Entrega exprés en 48 horas lista para enviar a tus invitados.",
        "Invitación digital interactiva y responsive con estética editorial de revista.",
        "Formulario RSVP inteligente con recuento automático de invitados y filtros de intolerancias alimentarias.",
        "Pase VIP con Código QR y playlist colaborativa de Spotify para fiestas de 15 años.",
        "Ubicación interactiva con enlace directo a Google Maps y Waze.",
        "Cronograma dinámico del evento con horarios, itinerario y recomendaciones de vestimenta (dress code).",
        "Muro de recuerdos y fotos en tiempo real compartido con todos los invitados."
      ],
      tag: "celebraciones"
    }
  };

  function openServiceDetail(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data || !serviceDetailModal) return;

    detailTitle.textContent = data.title;
    detailDescription.textContent = data.desc;
    detailPoints.innerHTML = data.points.map(pt => `<li>${pt}</li>`).join('');

    detailCtaBtn.setAttribute('data-service', data.tag);
    serviceDetailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceDetailModal() {
    if (serviceDetailModal) {
      serviceDetailModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  serviceDetailTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-key');
      openServiceDetail(serviceKey);
    });
  });

  if (serviceDetailCloseBtn) {
    serviceDetailCloseBtn.addEventListener('click', closeServiceDetailModal);
  }

  if (detailCtaBtn) {
    detailCtaBtn.addEventListener('click', () => {
      const sType = detailCtaBtn.getAttribute('data-service');
      closeServiceDetailModal();
      openContactModal(sType);
    });
  }

  if (serviceDetailModal) {
    serviceDetailModal.addEventListener('click', (e) => {
      if (e.target === serviceDetailModal) {
        closeServiceDetailModal();
      }
    });
  }

  // 6. Form Submission & WhatsApp Generator
  const projectForm = document.getElementById('projectForm');
  const toastMsg = document.getElementById('formToast');
  const whatsappBtn = document.getElementById('whatsappBtn');

  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const contactInfo = document.getElementById('clientContact').value.trim();
      const service = document.querySelector('input[name="serviceType"]:checked')?.value || 'general';
      const notes = document.getElementById('clientNotes').value.trim();

      if (!name || !contactInfo) {
        alert('Por favor, completa tu nombre y contacto.');
        return;
      }

      const submitBtn = projectForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'ENVIANDO...';
      }

      const leadPayload = {
        name: name,
        contact: contactInfo,
        serviceType: service.toUpperCase(),
        message: notes || 'Sin notas adicionales',
        _replyto: contactInfo.includes('@') ? contactInfo : undefined,
        _subject: `🔔 Nueva Solicitud Web [${service.toUpperCase()}]: ${name}`
      };

      try {
        // 1. Enviar directamente a Formspree (entrega inmediata a andrearodinvitta@gmail.com)
        await fetch('https://formspree.io/f/mvkozrvb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(leadPayload)
        });

        // 2. Registro de respaldo en servidor local
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        }).catch(() => {});

      } catch (err) {
        console.warn('Error en el envío:', err);
      }

      // Mostrar aviso exacto en la misma página
      if (toastMsg) {
        toastMsg.style.display = 'block';
        toastMsg.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 0.4rem; padding: 0.6rem 0;">
            <div style="font-family: var(--font-display); font-weight: 700; color: #000; font-size: 1.15rem; text-transform: uppercase;">
              ✓ Su solicitud fue enviada con éxito
            </div>
            <p style="font-size: 0.95rem; font-weight: normal; margin: 0; color: #111;">
              En menos de 12 horas te responderemos.
            </p>
          </div>
        `;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }

      // Limpiar formulario y cerrar modal suavemente
      setTimeout(() => {
        projectForm.reset();
        setTimeout(() => {
          if (toastMsg) toastMsg.style.display = 'none';
          closeContactModal();
        }, 4000);
      }, 1500);
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('clientName').value.trim() || 'un cliente';
      const service = document.querySelector('input[name="serviceType"]:checked')?.value || 'un proyecto web';
      const notes = document.getElementById('clientNotes').value.trim();

      const text = encodeURIComponent(
        `¡Hola Andrea! Soy ${name}. Me gustaría hablar contigo sobre el diseño de una web para ${service}. ${notes ? `Detalles: ${notes}` : ''}`
      );

      window.open(`https://wa.me/34612286913?text=${text}`, '_blank');
    });
  }

  // ==========================================================================
  // 7. PORTFOLIO DATA & INTERACTIVE LIGHTBOX ENGINE
  // ==========================================================================

  const portfolioData = [
    // --- CATEGORÍA: COMERCIO & NEGOCIOS LOCALES ---
    {
      id: 'dumore-chocolate',
      name: 'DUMORE Chocolate',
      type: 'comercio',
      categoryLabel: 'Fresas con Chocolate & Regalos Gourmet • Alta Repostería',
      desc: 'Catálogo dulce de alta gama con selector interactivo de cajas de fresas personalizadas, chocobombas y ramos artesanales para celebraciones y fechas especiales.',
      previewImg: 'assets/portfolio/dumore_chocolate.png',
      urlDemo: 'demos/dumore_chocolate/index.html',
      status: 'active'
    },
    {
      id: 'viajes-sol-y-arena',
      name: 'Viajes Sol y Arena',
      type: 'comercio',
      categoryLabel: 'Agencia de Viajes Oficial • Carabanchel (Madrid)',
      desc: 'Web corporativa y comercial con buscador de paquetes vacacionales al Caribe, vuelos a Latinoamérica, circuitos por Europa, financiación a medida y contacto directo con agentes.',
      previewImg: 'assets/portfolio/viajes_sol_y_arena.png',
      urlDemo: 'demos/viajes_sol_y_arena/index.html',
      status: 'active'
    },
    {
      id: 'zafiro-travel',
      name: 'Zafiro Carpetana Travel',
      type: 'comercio',
      categoryLabel: 'Viajes, Circuitos Europeos & Visados • Madrid',
      desc: 'Diseño editorial para agencia especializada en circuitos europeos 100% en español, cruceros internacionales, vuelos y asesoría experta para trámites y visados Schengen y USA.',
      previewImg: 'assets/portfolio/zafiro_travel.png',
      urlDemo: 'demos/zafiro_travel/index.html',
      status: 'active'
    },

    // --- CATEGORÍA: CELEBRACIONES & EVENTOS ---
    {
      id: 'boda-marta-jeronimo',
      name: 'Boda Marta & Jerónimo',
      type: 'celebraciones',
      categoryLabel: 'Invitación Editorial de Boda • Burdeos & Sello de Cera',
      desc: 'Invitación web de lujo con apertura interactiva de sobre y sello de cera dorado ("OPEN THIS"), confirmación RSVP con selector de alérgenos, playlist y cronograma del evento.',
      previewImg: 'assets/portfolio/boda_marta_jeronimo.png',
      urlDemo: 'demos/boda_marta_jeronimo/index.html',
      status: 'active'
    },
    {
      id: 'boda-valentina-mateo',
      name: 'Boda Valentina & Mateo',
      type: 'celebraciones',
      categoryLabel: 'Invitación Romántica & Floral • Música & RSVP Inteligente',
      desc: 'Experiencia nupcial interactiva con reproductor musical, cuenta regresiva en vivo, formulario inteligente de confirmación de invitados, código de vestimenta e indicaciones en mapa.',
      previewImg: 'assets/portfolio/boda_valentina_mateo.png',
      urlDemo: 'demos/boda_valentina_mateo/index.html',
      status: 'active'
    }
  ];

  // DOM Elements for Portfolio
  const portfolioGrid = document.getElementById('portfolioGrid');
  const portfolioTabs = document.querySelectorAll('.portfolio-tab');
  const countTodos = document.getElementById('countTodos');
  const countComercio = document.getElementById('countComercio');
  const countCelebraciones = document.getElementById('countCelebraciones');

  // DOM Elements for Lightbox
  const portfolioModal = document.getElementById('portfolioModal');
  const portfolioModalTitle = document.getElementById('portfolioModalTitle');
  const portfolioModalCategory = document.getElementById('portfolioModalCategory');
  const modalStatusBadge = document.getElementById('modalStatusBadge');
  const portfolioExternalBtn = document.getElementById('portfolioExternalBtn');
  const portfolioModalCloseBtn = document.getElementById('portfolioModalCloseBtn');
  const portfolioIframe = document.getElementById('portfolioIframe');
  const portfolioIframeWrapper = document.querySelector('.portfolio-iframe-wrapper');
  const portfolioLoader = document.getElementById('portfolioLoader');
  const btnDeviceDesktop = document.getElementById('btnDeviceDesktop');
  const btnDeviceMobile = document.getElementById('btnDeviceMobile');

  // Update counter badges
  function updatePortfolioCounters() {
    if (countTodos) countTodos.textContent = portfolioData.length;
    if (countComercio) {
      const totalComercio = portfolioData.filter(item => item.type === 'comercio').length;
      countComercio.textContent = totalComercio;
    }
    if (countCelebraciones) {
      const totalCelebraciones = portfolioData.filter(item => item.type === 'celebraciones').length;
      countCelebraciones.textContent = totalCelebraciones;
    }
  }
  updatePortfolioCounters();

  // Render cards based on current category
  function renderPortfolio(category = 'comercio') {
    if (!portfolioGrid) return;

    const filtered = category === 'todos'
      ? portfolioData
      : portfolioData.filter(item => item.type === category);

    portfolioGrid.innerHTML = filtered.map(item => {
      const isLive = item.status === 'active' && item.urlDemo;
      const badgeClass = isLive ? 'badge-live' : 'badge-pending';
      const badgeText = isLive ? '● DEMO ACTIVA' : '◌ PRÓXIMAMENTE';

      const actionButtonHtml = isLive
        ? `<button class="btn-brutalist btn-portfolio-action trigger-portfolio-demo" data-id="${item.id}" aria-label="Abrir demo interactiva de ${item.name}">
            VER DEMO INTERACTIVA <span aria-hidden="true">↗</span>
           </button>`
        : `<button class="btn-portfolio-action btn-portfolio-disabled" disabled title="Proyecto en maquetación final. Muy pronto disponible.">
            PRÓXIMAMENTE
           </button>`;

      return `
        <article class="portfolio-card fade-in" id="card-${item.id}">
          <div class="portfolio-card-img-wrap">
            <span class="portfolio-badge-corner ${badgeClass}">${badgeText}</span>
            <img src="${item.previewImg}" alt="Previsualización web para ${item.name}" class="portfolio-card-img" loading="lazy">
          </div>
          <div class="portfolio-card-body">
            <span class="portfolio-card-category">${item.categoryLabel}</span>
            <h3 class="portfolio-card-title">${item.name}</h3>
            <p class="portfolio-card-desc">${item.desc}</p>
            <div class="portfolio-card-footer">
              ${actionButtonHtml}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to all active demo buttons
    const demoButtons = portfolioGrid.querySelectorAll('.trigger-portfolio-demo');
    demoButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-id');
        openPortfolioLightbox(projectId);
      });
    });
  }

  // Tab switching logic
  portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      portfolioTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      renderPortfolio(category);
    });
  });

  // Device switcher handlers
  if (btnDeviceDesktop && btnDeviceMobile && portfolioIframeWrapper) {
    btnDeviceDesktop.addEventListener('click', () => {
      btnDeviceDesktop.classList.add('active');
      btnDeviceMobile.classList.remove('active');
      portfolioIframeWrapper.classList.remove('mobile-view');
    });

    btnDeviceMobile.addEventListener('click', () => {
      btnDeviceMobile.classList.add('active');
      btnDeviceDesktop.classList.remove('active');
      portfolioIframeWrapper.classList.add('mobile-view');
    });
  }

  // Open Lightbox with Safe Iframe
  function openPortfolioLightbox(projectId) {
    const project = portfolioData.find(p => p.id === projectId);
    if (!project || !project.urlDemo || !portfolioModal) return;

    // Fill metadata
    portfolioModalTitle.textContent = project.name;
    portfolioModalCategory.textContent = project.categoryLabel;
    portfolioExternalBtn.href = project.urlDemo;

    // Default to desktop view
    if (btnDeviceDesktop && btnDeviceMobile && portfolioIframeWrapper) {
      btnDeviceDesktop.classList.add('active');
      btnDeviceMobile.classList.remove('active');
      portfolioIframeWrapper.classList.remove('mobile-view');
    }

    // Show loading spinner while iframe connects
    if (portfolioLoader) {
      portfolioLoader.classList.remove('hidden');
    }

    // Set iframe src to initiate clean loading
    portfolioIframe.src = project.urlDemo;

    portfolioIframe.onload = () => {
      if (portfolioLoader) {
        portfolioLoader.classList.add('hidden');
      }
    };

    // Open modal and lock background scroll
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Lightbox and Clear Iframe to prevent memory leak / background sound
  function closePortfolioLightbox() {
    if (!portfolioModal) return;

    portfolioModal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear iframe src
    if (portfolioIframe) {
      portfolioIframe.src = 'about:blank';
    }
  }

  if (portfolioModalCloseBtn) {
    portfolioModalCloseBtn.addEventListener('click', closePortfolioLightbox);
  }

  // Close on outside click
  if (portfolioModal) {
    portfolioModal.addEventListener('click', (e) => {
      if (e.target === portfolioModal) {
        closePortfolioLightbox();
      }
    });
  }

  // Escape key handler for portfolio modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('active')) {
      closePortfolioLightbox();
    }
  });

  // Initial render on page load: COMERCIO
  renderPortfolio('comercio');
});
