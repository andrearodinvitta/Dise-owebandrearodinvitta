/* ==========================================================================
   THE QUINCEAÑERA TIMES / VOGUE XV — DIGITAL MAGAZINE CONTROLLER
   Interactive Page Turner, Touch Gestures, Audio, Confetti, and RSVP
   ========================================================================== */

let currentPage = 0;
const totalPages = 7;

document.addEventListener('DOMContentLoaded', () => {
  initMagazineNavigation();
  initCountdown();
  initConfetti();
  initAudioSystem();
  initGalleryLightbox();
  initRSVPForm();
  initTOCModal();
});

/* ==========================================================================
   1. MAGAZINE PAGE-BY-PAGE TURNER & GESTURES
   ========================================================================== */
function initMagazineNavigation() {
  const pages = document.querySelectorAll('.magazine-page');
  const dots = document.querySelectorAll('.dock-dot');
  const pageCounterTop = document.getElementById('pageCounterTop');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const viewport = document.getElementById('magazineViewport');

  function updatePageView(direction = 1) {
    pages.forEach((page, index) => {
      page.classList.remove('active', 'slide-prev');
      if (index === currentPage) {
        page.classList.add('active');
        page.scrollTop = 0; // Reset internal scroll on turn
      }
    });

    // Update Bottom Dots
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update Top Counter
    if (pageCounterTop) {
      pageCounterTop.textContent = `PÁG. 0${currentPage + 1} / 0${totalPages}`;
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;
  }

  window.goToPage = function(pageIdx) {
    if (pageIdx >= 0 && pageIdx < totalPages) {
      currentPage = pageIdx;
      updatePageView();
    }
  };

  window.nextPage = function() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updatePageView(1);
    }
  };

  window.prevPage = function() {
    if (currentPage > 0) {
      currentPage--;
      updatePageView(-1);
    }
  };

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      nextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevPage();
    } else if (e.key === 'Escape') {
      const toc = document.getElementById('tocModal');
      const lb = document.getElementById('lightboxModal');
      if (toc) toc.classList.remove('active');
      if (lb) lb.classList.remove('active');
    }
  });

  // Mobile Touch Swipe Gesture
  let touchStartX = 0;
  let touchEndX = 0;

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextPage();
      } else {
        prevPage();
      }
    }
  }

  // Initial render
  updatePageView();
}

/* ==========================================================================
   2. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('2025-10-18T17:30:00').getTime();

  function update() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance < 0) {
      distance = (30 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (45 * 60 * 1000);
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMins');
    const secsEl = document.getElementById('cdSecs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. SUBTLE GOLDEN & ROSE CONFETTI CANVAS (COVER PAGE)
   ========================================================================== */
function initConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = 35;
  const colors = ['#D4AF37', '#FFE898', '#F7D6DC', '#FFFFFF', '#C5A059', '#E8A598'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.7 + 0.3
    });
  }

  function render() {
    if (currentPage !== 0) {
      // Pause heavy renders when not on cover
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.size > 2.5) {
        ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. AMBIENT AUDIO SYSTEM (GALA WALTZ SYNTHESIZER)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let audioInterval = null;

function initAudioSystem() {
  const musicBtn = document.getElementById('musicToggleBtn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    toggleMusic();
  });
}

function toggleMusic() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const btnText = document.getElementById('musicBtnText');

  if (!isAudioPlaying) {
    startMelody();
    isAudioPlaying = true;
    if (musicBtn) musicBtn.classList.add('playing');
    if (btnText) btnText.textContent = 'Música: On';
  } else {
    stopMelody();
    isAudioPlaying = false;
    if (musicBtn) musicBtn.classList.remove('playing');
    if (btnText) btnText.textContent = 'Música de Gala';
  }
}

function startMelody() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const notes = [311.13, 392.00, 466.16, 622.25, 523.25, 466.16, 392.00, 523.25];
  let idx = 0;

  function playNote(freq) {
    if (!audioCtx || !isAudioPlaying) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
  }

  playNote(notes[0]);
  audioInterval = setInterval(() => {
    if (!isAudioPlaying) return;
    idx = (idx + 1) % notes.length;
    playNote(notes[idx]);
  }, 900);
}

function stopMelody() {
  if (audioInterval) {
    clearInterval(audioInterval);
    audioInterval = null;
  }
}

/* ==========================================================================
   5. GALLERY LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const cards = document.querySelectorAll('.fashion-card-mag');

  if (!modal || !modalImg) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        modalImg.src = img.src;
        modal.classList.add('active');
      }
    });
  });

  function closeLb() { modal.classList.remove('active'); }
  if (closeBtn) closeBtn.addEventListener('click', closeLb);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLb();
  });
}

/* ==========================================================================
   6. RSVP FORM & WHATSAPP GENERATOR
   ========================================================================== */
function initRSVPForm() {
  const form = document.getElementById('magazineRsvpForm');
  const successCard = document.getElementById('rsvpSuccessCard');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvpName').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'si';
    const passes = document.getElementById('rsvpPasses')?.value || '1';
    const allergies = document.getElementById('rsvpAllergies')?.value.trim() || 'Ninguna';

    const attendanceText = attendance === 'si' ? '¡Sí asistiré con mucho gusto!' : 'No podré asistir';

    const organizerPhone = '5213312345678';
    const textMsg = encodeURIComponent(
      `*CONFIRMACIÓN DE ASISTENCIA — LUCIANA XV*\n` +
      `------------------------------------\n` +
      `👑 *Invitado:* ${name}\n` +
      `✨ *Estado:* ${attendanceText}\n` +
      `🎟️ *Pases:* ${passes}\n` +
      `🍽️ *Alergias:* ${allergies}\n` +
      `------------------------------------\n` +
      `_Enviado desde la Revista Digital Vogue XV_`
    );

    const waLink = `https://api.whatsapp.com/send?phone=${organizerPhone}&text=${textMsg}`;

    const guestEl = document.getElementById('successGuestName');
    const waBtn = document.getElementById('rsvpWhatsAppBtn');

    if (guestEl) guestEl.textContent = name;
    if (waBtn) waBtn.href = waLink;

    form.style.display = 'none';
    if (successCard) successCard.style.display = 'block';
  });
}

/* ==========================================================================
   7. TABLE OF CONTENTS MODAL
   ========================================================================== */
function initTOCModal() {
  const modal = document.getElementById('tocModal');
  const openBtn = document.getElementById('openTocBtn');
  const closeBtn = document.getElementById('closeTocBtn');

  if (!modal) return;

  window.toggleTOC = function() {
    modal.classList.toggle('active');
  };

  if (openBtn) openBtn.addEventListener('click', () => modal.classList.add('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
