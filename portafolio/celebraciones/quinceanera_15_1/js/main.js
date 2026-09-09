/**
 * ==========================================================================
 * LANDING PAGE CELEBRACIONES 15.1 — JAVASCRIPT ENGINE
 * Gala Celestial & Haute Couture XV • Andrea Rodríguez Design Studio
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. VIP PASS MODAL & EXPERIENCE UNLOCK
  // ==========================================================================
  const vipOverlay = document.getElementById('vipOverlay');
  const btnOpenExperience = document.getElementById('btnOpenExperience');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicBtnText = document.getElementById('musicBtnText');

  if (btnOpenExperience && vipOverlay) {
    btnOpenExperience.addEventListener('click', () => {
      vipOverlay.classList.add('opened');
      // Iniciar música tras interacción de usuario
      toggleMusic(true);
      triggerConfettiSparkles();
    });
  }

  // ==========================================================================
  // 2. AMBIENT AUDIO SYNTHESIZER ENGINE (WEB AUDIO API)
  // Generates enchanting, crystal-clear celestial gala arpeggios seamlessly
  // ==========================================================================
  let audioCtx = null;
  let isPlaying = false;
  let synthInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  // Chords progression for romantic gala: F#maj9 -> D#m9 -> Bmaj7 -> C#7sus4
  const galaScaleNotes = [
    // F#maj9 notes (Hz)
    [370.0, 440.0, 554.37, 659.25, 740.0, 880.0],
    // D#m9 notes
    [311.13, 370.0, 466.16, 554.37, 622.25, 740.0],
    // Bmaj7 notes
    [246.94, 311.13, 370.0, 493.88, 587.33, 740.0],
    // C#7sus4 notes
    [277.18, 370.0, 415.3, 493.88, 554.37, 830.61]
  ];

  let currentChordIndex = 0;
  let noteIndex = 0;

  function playCelestialHarpNote(freq, timeOffset = 0, duration = 2.2) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + timeOffset);

      // Lowpass for soft warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime + timeOffset);

      // Ethereal envelope
      const now = audioCtx.currentTime + timeOffset;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  function startMusicLoop() {
    if (synthInterval) clearInterval(synthInterval);
    
    // Play an arpeggiated note every 380ms
    synthInterval = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const chord = galaScaleNotes[currentChordIndex];
      const freq = chord[noteIndex % chord.length];
      
      // Random gentle octave sparkle
      const octaveMultiplier = Math.random() > 0.75 ? 2 : 1;
      playCelestialHarpNote(freq * octaveMultiplier, 0, 2.0);

      noteIndex++;
      if (noteIndex >= chord.length * 2) {
        noteIndex = 0;
        currentChordIndex = (currentChordIndex + 1) % galaScaleNotes.length;
      }
    }, 420);
  }

  function toggleMusic(forcePlay = false) {
    initAudioContext();
    if (forcePlay) {
      isPlaying = true;
    } else {
      isPlaying = !isPlaying;
    }

    if (isPlaying) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      startMusicLoop();
      if (musicToggleBtn) {
        musicToggleBtn.classList.add('playing');
        if (musicBtnText) musicBtnText.textContent = "Música de Gala: ON";
      }
    } else {
      if (synthInterval) clearInterval(synthInterval);
      if (musicToggleBtn) {
        musicToggleBtn.classList.remove('playing');
        if (musicBtnText) musicBtnText.textContent = "Música de Gala: OFF";
      }
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => toggleMusic());
  }

  // ==========================================================================
  // 3. LIVE COUNTDOWN CLOCK
  // Target: Sábado 18 de Octubre, 2025 17:00:00
  // ==========================================================================
  const targetDate = new Date('2025-10-18T17:00:00').getTime();
  const elDays = document.getElementById('countDays');
  const elHours = document.getElementById('countHours');
  const elMinutes = document.getElementById('countMinutes');
  const elSeconds = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (elDays) elDays.textContent = "00";
      if (elHours) elHours.textContent = "00";
      if (elMinutes) elMinutes.textContent = "00";
      if (elSeconds) elSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==========================================================================
  // 4. STARDUST PARTICLES CANVAS (INTERACTIVE BACKGROUND)
  // ==========================================================================
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(width > 768 ? 65 : 30, 80);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? 'rgba(230, 197, 148,' : 'rgba(232, 165, 184,'
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#e6c594';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================================================
  // 5. NAVBAR SCROLL DETECTOR
  // ==========================================================================
  const navbar = document.getElementById('galaNavbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ==========================================================================
  // 6. 1-CLICK COPY BANK DETAILS & TOAST NOTIFICATION
  // ==========================================================================
  const toast = document.getElementById('galaToast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  const copyBankButtons = document.querySelectorAll('.btn-copy-bank');
  copyBankButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = `✓ ¡DATOS COPIADOS!`;
          showToast("✨ Cuenta bancaria copiada al portapapeles");

          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalText;
          }, 2500);
        }).catch(() => {
          showToast("No se pudo copiar automáticamente");
        });
      }
    });
  });

  // ==========================================================================
  // 7. PHOTO GALLERY FILTER & LIGHTBOX MODAL
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (btnCloseLightbox && lightboxModal) {
    btnCloseLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 8. SMART RSVP FORM WITH WHATSAPP INTEGRATION
  // ==========================================================================
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('guestName')?.value.trim() || 'Invitado(a)';
      const guestPhone = document.getElementById('guestPhone')?.value.trim() || '';
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Sí asistiré con alegría';
      const passes = document.getElementById('guestPasses')?.value || '1 pase';
      const dietary = document.getElementById('guestDietary')?.value.trim() || 'Ninguna';
      const songRequest = document.getElementById('guestSong')?.value.trim() || 'Cualquiera para bailar';

      const isAttending = attendance.includes('Sí');

      let message = `✨ *CONFIRMACIÓN DE ASISTENCIA — GALA DE XV AÑOS DE VALENTINA (EDICIÓN 15.1)* ✨\n\n`;
      message += `👑 *Nombre del Invitado(a):* ${guestName}\n`;
      message += `📱 *Teléfono:* ${guestPhone}\n`;
      message += `🎟️ *Respuesta:* ${attendance}\n`;
      if (isAttending) {
        message += `👥 *Número de Pases:* ${passes}\n`;
        message += `🍽️ *Restricciones/Alérgenos:* ${dietary}\n`;
        message += `🎵 *Canción para el DJ:* "${songRequest}"\n\n`;
        message += `¡Nos vemos en la Gala Celestial de XV Años! 💫`;
      } else {
        message += `\nLamento no poder acompañarte pero te deseo la noche más mágica y feliz en tus XV años. 💖`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/34612286913?text=${encodedMessage}`;

      showToast("🚀 Redirigiendo a WhatsApp para enviar confirmación...");
      triggerConfettiSparkles();

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 900);
    });
  }

  // ==========================================================================
  // 9. MURO DE DESEOS (GUESTBOOK) & LOCAL PERSISTENCE
  // ==========================================================================
  const wishForm = document.getElementById('wishForm');
  const wishesDeck = document.getElementById('wishesDeck');

  if (wishForm && wishesDeck) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('wishAuthor')?.value.trim();
      const message = document.getElementById('wishMessage')?.value.trim();

      if (!author || !message) return;

      const newCard = document.createElement('div');
      newCard.className = 'wish-item-card';
      newCard.innerHTML = `
        <div class="wish-sender">✨ ${author}</div>
        <p class="wish-text">"${message}"</p>
      `;

      wishesDeck.prepend(newCard);
      wishForm.reset();
      showToast("💫 ¡Tu deseo ha sido publicado en el Muro de Gala!");
      triggerConfettiSparkles();
    });
  }

  // ==========================================================================
  // 10. CELEBRATION SPARKLE / CONFETTI BURST
  // ==========================================================================
  function triggerConfettiSparkles() {
    const burstCount = 35;
    const colors = ['#e6c594', '#f6e5cd', '#e8a5b8', '#ffffff', '#ffd700'];

    for (let i = 0; i < burstCount; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'fixed';
      spark.style.top = '50%';
      spark.style.left = '50%';
      spark.style.width = Math.random() * 8 + 4 + 'px';
      spark.style.height = spark.style.width;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      spark.style.boxShadow = '0 0 10px rgba(230, 197, 148, 0.8)';
      spark.style.zIndex = '999999';
      spark.style.pointerEvents = 'none';

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 320 + 80;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;

      spark.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 1000 + 800,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      });

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1800);
    }
  }

});
