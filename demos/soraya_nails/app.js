/* ==========================================================================
   SORAYA NAILS - JAVASCRIPT APPLICATION LOGIC
   Features: Mobile Nav, Interactive Booking, WhatsApp Generator,
             Gallery Filter, Lightbox Modal, FAQ Accordion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initDatePicker();
  initBookingForm();
  initGalleryFilter();
  initKeyboardListeners();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const icon = document.getElementById('menuToggleIcon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (icon) icon.textContent = 'menu';
    } else {
      drawer.classList.add('open');
      if (icon) icon.textContent = 'close';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (icon) icon.textContent = 'menu';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Date Picker Initialization (Default min today)
   -------------------------------------------------------------------------- */
function initDatePicker() {
  const dateInput = document.getElementById('bookingDate');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  dateInput.min = minDate;
  dateInput.value = minDate;
}

/* --------------------------------------------------------------------------
   4. Booking Form & Time Slots Logic
   -------------------------------------------------------------------------- */
let selectedTime = '09:30';

function selectTimeSlot(buttonElement, timeString) {
  const allSlotButtons = document.querySelectorAll('.time-slot-btn');
  allSlotButtons.forEach(btn => btn.classList.remove('selected'));
  buttonElement.classList.add('selected');
  selectedTime = timeString;
}

function updateBookingPrice() {
  const select = document.getElementById('serviceSelect');
  const summaryName = document.getElementById('summaryServiceName');
  const summaryPrice = document.getElementById('summaryServicePrice');

  if (!select || !summaryName || !summaryPrice) return;

  const selectedOption = select.options[select.selectedIndex];
  const price = selectedOption.getAttribute('data-price') || 'A consultar';

  summaryName.textContent = selectedOption.value;
  summaryPrice.textContent = price;
}

function selectServiceInForm(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (!select) return;

  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === serviceName || select.options[i].value.includes(serviceName)) {
      select.selectedIndex = i;
      break;
    }
  }

  updateBookingPrice();

  const bookingSection = document.getElementById('reservar');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const serviceSelect = document.getElementById('serviceSelect');
  const dateInput = document.getElementById('bookingDate');
  const nameInput = document.getElementById('clientName');
  const phoneInput = document.getElementById('clientPhone');
  const notesInput = document.getElementById('clientNotes');

  const service = serviceSelect ? serviceSelect.value : 'Servicio general';
  const date = dateInput ? dateInput.value : 'Fecha por concretar';
  const name = nameInput ? nameInput.value.trim() : 'Cliente';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const notes = notesInput && notesInput.value.trim() ? `\n• Notas: ${notesInput.value.trim()}` : '';

  // Construct structured WhatsApp message for Sorayda
  const message = 
`✨ *Solicitud de Cita - Soraya Nails* ✨
-----------------------------
• *Nombre:* ${name}
• *Teléfono:* ${phone}
• *Servicio:* ${service}
• *Fecha preferida:* ${date}
• *Hora preferida:* ${selectedTime}${notes}
-----------------------------
_Enviado desde sorayanails.es_`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/34614154881?text=${encodedMsg}`;

  // Show celebratory toast
  showToastNotice();

  // Redirect to WhatsApp after short feedback delay
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 1200);
}

function initBookingForm() {
  updateBookingPrice();
}

function showToastNotice() {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* --------------------------------------------------------------------------
   5. Gallery Filtering Logic
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Lightbox Modal Logic
   -------------------------------------------------------------------------- */
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (!modal || !img || !caption) return;

  img.src = imageSrc;
  caption.textContent = captionText || 'Soraya Nails Madrid';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event) event.stopPropagation();
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function initKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      const drawer = document.getElementById('mobileNavDrawer');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        const icon = document.getElementById('menuToggleIcon');
        if (icon) icon.textContent = 'menu';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function toggleFaq(headerElement) {
  const item = headerElement.parentElement;
  const wasActive = item.classList.contains('active');

  // Close all other items in accordion
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => i.classList.remove('active'));

  if (!wasActive) {
    item.classList.add('active');
  }
}
