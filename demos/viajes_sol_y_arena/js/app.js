/**
 * ==============================================================================
 * Viajes Sol y Arena - Lógica e Interactividad en Español
 * ==============================================================================
 */

// Teléfonos y configuración de la agencia
const TELEFONO_AGENCIA = "914690000";
const WHATSAPP_AGENCIA = "34600123456";

// Base de datos completa de destinos y ofertas
const DESTINOS_OFERTAS = [
  {
    id: "caribe-punta-cana",
    categoria: "caribe",
    titulo: "Caribe Soñado: Punta Cana o Cancún",
    imagen: "images/caribe.jpg",
    distintivo: "Todo Incluido 5 Estrellas",
    tipoDistintivo: "secundario",
    descripcion: "Vuelos directos desde Madrid • 7 noches en resort 5 estrellas con traslados y seguro incluido.",
    detalles: "Disfruta de playas paradisíacas de arena blanca y aguas cristalinas. Incluye vuelos directos de ida y vuelta desde Madrid Barajas, 7 noches en resort 5 estrellas con régimen Todo Incluido 24 horas, traslados privados entre aeropuerto y hotel, y seguro de viaje completo.",
    precio: 890,
    unidadPrecio: "persona",
    inclusiones: ["Todo Incluido 24h", "Vuelo Directo", "Resort 5 Estrellas", "Traslados Incluidos"],
    textoWhatsApp: "¡Hola! Deseo más información y disponibilidad para la oferta de Caribe (Punta Cana / Cancún) desde 890€ por persona."
  },
  {
    id: "latam-bogota-colombia",
    categoria: "latam",
    titulo: "Vuelos a Colombia: Bogotá, Cali o Medellín",
    imagen: "images/latam.jpg",
    distintivo: "2 Maletas de 23kg",
    tipoDistintivo: "primario",
    descripcion: "Vuelos directos con tarifa étnica especial, equipaje extra en bodega y cambios flexibles.",
    detalles: "La mejor opción para tus viajes familiares y de reencuentro. Te garantizamos tarifa étnica oficial con 2 maletas facturadas de 23kg cada una incluidas en bodega, selección de asientos y atención personalizada en nuestra oficina de Madrid.",
    precio: 640,
    unidadPrecio: "persona",
    inclusiones: ["2 Maletas 23kg", "Tarifa Étnica Oficial", "Cambios Flexibles", "Vuelos Directos"],
    textoWhatsApp: "¡Hola! Quisiera cotizar vuelos a Colombia (Bogotá / Cali / Medellín) con las 2 maletas de 23kg incluidas desde 640€."
  },
  {
    id: "latam-peru-ecuador",
    categoria: "latam",
    titulo: "Ruta Andina: Lima, Guayaquil o Quito",
    imagen: "images/latam.jpg",
    distintivo: "Tarifa Familiar Étnica",
    tipoDistintivo: "primario",
    descripcion: "Vuelos a Perú y Ecuador con equipaje completo, escalas optimizadas y pago fraccionado.",
    detalles: "Vuela a Lima, Guayaquil o Quito con las mejores aerolíneas transatlánticas. Incluye equipaje de mano y bodega (2x23kg), posibilidad de pagar en cómodos plazos y asistencia directa para el trámite de billetes infantiles.",
    precio: 680,
    unidadPrecio: "persona",
    inclusiones: ["Equipaje 2x23kg", "Pago en Cuotas", "Conexión Rápida", "Asistencia Documental"],
    textoWhatsApp: "¡Hola! Me gustaría cotizar billetes de avión para Perú o Ecuador (Lima / Guayaquil / Quito) con 2 maletas."
  },
  {
    id: "crucero-islas-griegas",
    categoria: "cruceros",
    titulo: "Crucero Islas Griegas e Italia",
    imagen: "images/crucero.jpg",
    distintivo: "Pensión Completa 5 Estrellas",
    tipoDistintivo: "secundario",
    descripcion: "8 días y 7 noches descubriendo Santorini, Mykonos, Atenas y Roma con salidas desde España.",
    detalles: "Una travesía inolvidable por el Mediterráneo y el Egeo a bordo de grandes barcos de lujo (MSC, Costa Cruceros, Royal Caribbean). Incluye régimen de pensión completa gourmet, espectáculos en vivo, piscinas, animación y todas las tasas de embarque.",
    precio: 750,
    unidadPrecio: "persona",
    inclusiones: ["Pensión Completa", "Tasas Portuarias", "8 Días / 7 Noches", "Espectáculos en Vivo"],
    textoWhatsApp: "¡Hola! Deseo recibir presupuesto y fechas disponibles para el Crucero por las Islas Griegas e Italia desde 750€."
  },
  {
    id: "escapada-capitales-europa",
    categoria: "escapadas",
    titulo: "Escapadas Europeas: Roma, París o Lisboa",
    imagen: "images/europa.jpg",
    distintivo: "Vuelo + Hotel Céntrico",
    tipoDistintivo: "terciario",
    descripcion: "4 días y 3 noches en hoteles céntricos seleccionados para descubrir las grandes capitales.",
    detalles: "Fin de semana largo o puente perfecto con vuelos en horarios cómodos y alojamiento en hoteles de 3 y 4 estrellas céntricos y bien comunicados. Incluye desayunos buffet, tasas turísticas y mapa con recomendaciones gastronómicas.",
    precio: 290,
    unidadPrecio: "persona",
    inclusiones: ["Hotel Céntrico", "4 Días / 3 Noches", "Desayuno Buffet", "Guía de Viaje"],
    textoWhatsApp: "¡Hola! Quisiera información y opciones para una escapada europea (Roma, París, Lisboa) desde 290€."
  },
  {
    id: "latam-republica-dominicana",
    categoria: "latam",
    titulo: "Vuelos a Santo Domingo y Santiago",
    imagen: "images/hero-beach.png",
    distintivo: "Vuelos Directos Barajas",
    tipoDistintivo: "primario",
    descripcion: "Conexiones directas Madrid - Santo Domingo con las mejores condiciones de equipaje familiar.",
    detalles: "Reserva tus billetes de avión a República Dominicana con antelación y benefíciate de facilidades de pago en cuotas, elección de asientos contiguos y atención presencial en nuestro local de Carabanchel.",
    precio: 595,
    unidadPrecio: "persona",
    inclusiones: ["Vuelo Directo", "Equipaje 2x23kg", "Pago Fraccionado", "Atención 24/7"],
    textoWhatsApp: "¡Hola! Quisiera consultar tarifas y fechas para vuelos a República Dominicana (Santo Domingo / Santiago)."
  },
  {
    id: "crucero-caribe-bahamas",
    categoria: "cruceros",
    titulo: "Crucero Caribe + Miami y Bahamas",
    imagen: "images/crucero.jpg",
    distintivo: "Aventura Tropical",
    tipoDistintivo: "secundario",
    descripcion: "Combina estancia en Miami Beach con un crucero por las paradisíacas islas privadas de Bahamas.",
    detalles: "El gran viaje familiar soñado: combina el ambiente de Miami con un crucero de 4 noches por CocoCay y Nassau. Incluye vuelos transatlánticos, hotel en Miami y crucero con comidas, bebidas y entretenimiento.",
    precio: 1190,
    unidadPrecio: "persona",
    inclusiones: ["Vuelo + Crucero", "Miami + Bahamas", "Pensión Completa", "Islas Privadas"],
    textoWhatsApp: "¡Hola! Me gustaría cotizar el paquete de Crucero Caribe + Miami y Bahamas desde 1.190€."
  }
];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  inicializarFechasPredeterminadas();
  mostrarOfertas('todas');
  configurarFiltrosCategorias();
  configurarFormularioPresupuesto();
  configurarBuscadorPlanificador();
  configurarEventosModales();
  configurarNavegacionMovil();
  configurarDesplazamientoSuave();
  configurarPildorasDuracion();
});

// Configurar fechas automáticas con formato correcto
function inicializarFechasPredeterminadas() {
  const hoy = new Date();
  
  // Fecha de salida: dentro de 15 días
  const fechaSalida = new Date();
  fechaSalida.setDate(hoy.getDate() + 15);
  
  // Fecha de regreso: 14 días después de la salida
  const fechaRegreso = new Date();
  fechaRegreso.setDate(fechaSalida.getDate() + 14);

  const formatoFecha = (fecha) => {
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const inputSalida = document.getElementById('plan-fecha-ida');
  const inputRegreso = document.getElementById('plan-fecha-vuelta');
  const cotSalida = document.getElementById('cot-fecha-ida');
  const cotRegreso = document.getElementById('cot-fecha-vuelta');

  const hoyStr = formatoFecha(hoy);
  const salidaStr = formatoFecha(fechaSalida);
  const regresoStr = formatoFecha(fechaRegreso);

  if (inputSalida) {
    inputSalida.min = hoyStr;
    inputSalida.value = salidaStr;
    inputSalida.addEventListener('change', () => {
      if (inputRegreso && inputRegreso.value < inputSalida.value) {
        const nuevaVuelta = new Date(inputSalida.value);
        nuevaVuelta.setDate(nuevaVuelta.getDate() + 14);
        inputRegreso.value = formatoFecha(nuevaVuelta);
      }
    });
  }

  if (inputRegreso) {
    inputRegreso.min = hoyStr;
    inputRegreso.value = regresoStr;
  }

  if (cotSalida) {
    cotSalida.min = hoyStr;
    cotSalida.value = salidaStr;
  }

  if (cotRegreso) {
    cotRegreso.min = hoyStr;
    cotRegreso.value = regresoStr;
  }
}

// Botones rápidos de duración (1 semana, 2 semanas, 1 mes)
function configurarPildorasDuracion() {
  const pildoras = document.querySelectorAll('.duracion-pill');
  const inputSalida = document.getElementById('plan-fecha-ida');
  const inputRegreso = document.getElementById('plan-fecha-vuelta');

  pildoras.forEach(pildora => {
    pildora.addEventListener('click', () => {
      pildoras.forEach(p => p.classList.remove('active', 'bg-[#7d562d]', 'text-white'));
      pildoras.forEach(p => p.classList.add('bg-[#f6ece2]', 'text-[#50453b]'));
      
      pildora.classList.remove('bg-[#f6ece2]', 'text-[#50453b]');
      pildora.classList.add('active', 'bg-[#7d562d]', 'text-white');

      const dias = parseInt(pildora.getAttribute('data-dias'), 10);
      if (inputSalida && inputRegreso && !isNaN(dias)) {
        const base = inputSalida.value ? new Date(inputSalida.value) : new Date();
        const fin = new Date(base);
        fin.setDate(fin.getDate() + dias);
        
        const yyyy = fin.getFullYear();
        const mm = String(fin.getMonth() + 1).padStart(2, '0');
        const dd = String(fin.getDate()).padStart(2, '0');
        inputRegreso.value = `${yyyy}-${mm}-${dd}`;
      }
    });
  });
}

// Renderizado de las tarjetas de ofertas
function mostrarOfertas(categoria = 'todas') {
  const contenedor = document.getElementById('offers-grid');
  if (!contenedor) return;

  const filtrados = (categoria === 'todas' || categoria === 'all')
    ? DESTINOS_OFERTAS 
    : DESTINOS_OFERTAS.filter(item => item.categoria === categoria);

  contenedor.innerHTML = '';

  filtrados.forEach(item => {
    const tarjeta = document.createElement('div');
    tarjeta.className = "w-full bg-white rounded-3xl overflow-hidden shadow-sm hover-lift flex flex-col border border-[#e8d8c8] animate-fade-in";
    
    // Colores de distintivo según tipo
    let estiloDistintivo = "bg-[#ffdcbd] text-[#2c1600]";
    if (item.tipoDistintivo === 'secundario') estiloDistintivo = "bg-[#7fedfe] text-[#004f58]";
    if (item.tipoDistintivo === 'terciario') estiloDistintivo = "bg-[#d2e4ff] text-[#001c37]";

    tarjeta.innerHTML = `
      <div class="relative h-60 w-full bg-cover bg-center overflow-hidden" style="background-image: url('${item.imagen}')">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a2540]/90 via-black/20 to-transparent"></div>
        <span class="absolute top-3 left-3 ${estiloDistintivo} text-xs px-3.5 py-1 rounded-full font-bold shadow-md">
          ${item.distintivo}
        </span>
        <div class="absolute bottom-3 left-4 right-4 text-white">
          <h3 class="font-display text-xl font-bold leading-tight drop-shadow-md text-white">${item.titulo}</h3>
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between gap-4">
        <div class="flex flex-col gap-3">
          <p class="text-sm text-[#50453b] leading-relaxed">${item.descripcion}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${item.inclusiones.map(inc => `<span class="bg-[#f6ece2] text-[#50453b] text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[13px] text-[#006874]">check</span>${inc}</span>`).join('')}
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-[#f0e7dd]">
          <div class="flex flex-col">
            <span class="text-xs text-[#50453b] font-medium">Precio desde</span>
            <div class="flex items-baseline gap-1">
              <span class="font-display text-2xl font-bold text-[#7d562d]">${item.precio}€</span>
              <span class="text-xs text-[#50453b]">/ ${item.unidadPrecio}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="abrirModalDestino('${item.id}')" class="min-h-[42px] px-4 rounded-full bg-[#f6ece2] hover:bg-[#e2d8cf] text-[#1f1b15] text-xs font-bold active:scale-95 transition-all">
              Ver detalles
            </button>
            <a href="https://wa.me/${WHATSAPP_AGENCIA}?text=${encodeURIComponent(item.textoWhatsApp)}" target="_blank" class="min-h-[42px] px-4 rounded-full bg-[#d4a373] text-[#422608] hover:bg-[#7d562d] hover:text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm">
              <span>Consultar</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// Configurar los botones de filtro por categoría
function configurarFiltrosCategorias() {
  const botones = document.querySelectorAll('.filter-btn');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const categoria = btn.getAttribute('data-category');
      mostrarOfertas(categoria);
    });
  });
}

// Modal de detalles del destino
window.abrirModalDestino = function(id) {
  const item = DESTINOS_OFERTAS.find(d => d.id === id);
  if (!item) return;

  const modal = document.getElementById('destination-modal');
  const titulo = document.getElementById('modal-dest-title');
  const imagen = document.getElementById('modal-dest-img');
  const distintivo = document.getElementById('modal-dest-badge');
  const detalles = document.getElementById('modal-dest-details');
  const precio = document.getElementById('modal-dest-price');
  const contenedorEtiquetas = document.getElementById('modal-dest-tags');
  const btnWhatsApp = document.getElementById('modal-dest-wa-btn');

  if (titulo) titulo.innerText = item.titulo;
  if (imagen) imagen.style.backgroundImage = `url('${item.imagen}')`;
  if (distintivo) distintivo.innerText = item.distintivo;
  if (detalles) detalles.innerText = item.detalles;
  if (precio) precio.innerText = `${item.precio}€ / ${item.unidadPrecio}`;
  
  if (contenedorEtiquetas) {
    contenedorEtiquetas.innerHTML = item.inclusiones.map(inc => 
      `<span class="bg-[#f6ece2] text-[#50453b] text-xs px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[16px] text-[#006874]">check_circle</span>${inc}
       </span>`
    ).join('');
  }

  if (btnWhatsApp) {
    btnWhatsApp.href = `https://wa.me/${WHATSAPP_AGENCIA}?text=${encodeURIComponent(item.textoWhatsApp)}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.cerrarModalDestino = function() {
  const modal = document.getElementById('destination-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
};

// Cerrar modales con clic fuera o tecla Escape
function configurarEventosModales() {
  const modalDestino = document.getElementById('destination-modal');
  if (modalDestino) {
    modalDestino.addEventListener('click', (e) => {
      if (e.target === modalDestino) cerrarModalDestino();
    });
  }
  
  const modalExito = document.getElementById('success-modal');
  if (modalExito) {
    modalExito.addEventListener('click', (e) => {
      if (e.target === modalExito) cerrarModalExito();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModalDestino();
      cerrarModalExito();
    }
  });
}

// Manejo del formulario de cotización
function configurarFormularioPresupuesto() {
  const formulario = document.getElementById('quote-form');
  if (!formulario) return;

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre')?.value.trim() || 'Viajero';
    const telefono = document.getElementById('telefono')?.value.trim() || 'No indicado';
    const origen = document.getElementById('cot-origen')?.value || 'Madrid Barajas (MAD)';
    const destino = document.getElementById('cot-destino')?.value || document.getElementById('destino')?.value || 'Destino por confirmar';
    const tipo = document.getElementById('tipo_viaje')?.value || 'Vuelo con maletas (2x23kg)';
    const fechaIda = document.getElementById('cot-fecha-ida')?.value || 'Flexible';
    const fechaVuelta = document.getElementById('cot-fecha-vuelta')?.value || 'Flexible';
    const personas = document.getElementById('personas')?.value || '2 adultos';
    const mensaje = document.getElementById('mensaje')?.value.trim() || 'Sin comentarios adicionales';

    // Crear mensaje formateado para WhatsApp
    const mensajeWhatsApp = 
      `☀️ *SOLICITUD DE PRESUPUESTO - VIAJES SOL Y ARENA*\n\n` +
      `👤 *Nombre:* ${nombre}\n` +
      `📱 *Teléfono:* ${telefono}\n` +
      `🛫 *Origen:* ${origen}\n` +
      `🛬 *Destino:* ${destino}\n` +
      `🏷️ *Tipo de viaje:* ${tipo}\n` +
      `📅 *Fecha de salida:* ${fechaIda}\n` +
      `📅 *Fecha de regreso:* ${fechaVuelta}\n` +
      `👥 *Viajeros:* ${personas}\n` +
      `📝 *Notas o peticiones:* ${mensaje}\n\n` +
      `Hola, me gustaría recibir las mejores tarifas disponibles para estas fechas. ¡Muchas gracias!`;

    const enlaceWhatsApp = `https://wa.me/${WHATSAPP_AGENCIA}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Mostrar ventana modal de confirmación
    abrirModalExito(nombre, enlaceWhatsApp);
    formulario.reset();
    inicializarFechasPredeterminadas();
  });
}

// Manejo del buscador / planificador superior
function configurarBuscadorPlanificador() {
  const formulario = document.getElementById('planner-form');
  if (!formulario) return;

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const origen = document.getElementById('plan-origen')?.value || 'Madrid Barajas (MAD)';
    const destino = document.getElementById('plan-destino')?.value || 'Latinoamérica / Caribe';
    const tipo = document.getElementById('plan-tipo')?.value || 'Vuelos con 2 maletas 23kg';
    const fechaIda = document.getElementById('plan-fecha-ida')?.value || 'Próximamente';
    const fechaVuelta = document.getElementById('plan-fecha-vuelta')?.value || 'Próximamente';
    const pasajeros = document.getElementById('plan-pasajeros')?.value || '2 adultos';

    const mensajeWhatsApp = 
      `✈️ *CONSULTA RÁPIDA DE VIAJE - VIAJES SOL Y ARENA*\n\n` +
      `• *Origen:* ${origen}\n` +
      `• *Destino:* ${destino}\n` +
      `• *Modalidad:* ${tipo}\n` +
      `• *Fecha de ida:* ${fechaIda}\n` +
      `• *Fecha de vuelta:* ${fechaVuelta}\n` +
      `• *Viajeros:* ${pasajeros}\n\n` +
      `¡Hola! Quisiera consultar precios y disponibilidad para esta búsqueda.`;

    window.open(`https://wa.me/${WHATSAPP_AGENCIA}?text=${encodeURIComponent(mensajeWhatsApp)}`, '_blank');
  });
}

// Modal de éxito y redirección
window.abrirModalExito = function(nombre, enlaceWhatsApp) {
  const modal = document.getElementById('success-modal');
  const spanNombre = document.getElementById('success-user-name');
  const btnWhatsApp = document.getElementById('success-wa-redirect');

  if (spanNombre) spanNombre.innerText = nombre ? `¡Muchas gracias, ${nombre}!` : '¡Muchas gracias!';
  if (btnWhatsApp) btnWhatsApp.href = enlaceWhatsApp;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.cerrarModalExito = function() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
};

// Navegación móvil inferior con seguimiento de sección
function configurarNavegacionMovil() {
  const enlacesMovil = document.querySelectorAll('.mobile-nav-item');
  const secciones = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let seccionActual = '';
    const posicionScroll = window.scrollY + 220;

    secciones.forEach(sec => {
      const tope = sec.offsetTop;
      const alto = sec.offsetHeight;
      if (posicionScroll >= tope && posicionScroll < tope + alto) {
        seccionActual = sec.getAttribute('id');
      }
    });

    enlacesMovil.forEach(enlace => {
      enlace.classList.remove('text-[#7d562d]', 'font-bold');
      enlace.classList.add('text-[#50453b]');
      if (enlace.getAttribute('data-target') === seccionActual) {
        enlace.classList.remove('text-[#50453b]');
        enlace.classList.add('text-[#7d562d]', 'font-bold');
      }
    });
  });
}

// Desplazamiento suave para enlaces internos
function configurarDesplazamientoSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      const idDestino = this.getAttribute('href');
      if (idDestino === '#' || idDestino === '') return;
      const elementoDestino = document.querySelector(idDestino);
      if (elementoDestino) {
        e.preventDefault();
        elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
