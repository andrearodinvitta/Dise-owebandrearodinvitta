/**
 * BODA OTOÑAL — CAMILA & CRISTÓBAL
 * Motor de Interactividad, Música, Cuenta Regresiva, RSVP y Partículas de Otoño
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. SOBRE VIRTUAL / SELLO DE CERA
  // ==========================================================================
  const waxSealOverlay = document.getElementById('waxSealOverlay');
  const openInvitationBtn = document.getElementById('openInvitationBtn');

  function openInvitation() {
    if (waxSealOverlay) {
      waxSealOverlay.classList.add('opened');
      // Iniciar música suavemente si el usuario interactuó
      toggleAudio(true);
    }
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', openInvitation);
  }

  // ==========================================================================
  // 2. CONTADOR REGRESIVO EN TIEMPO REAL
  // ==========================================================================
  const weddingDate = new Date('2025-10-18T17:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 3. REPRODUCTOR DE MÚSICA & SINTETIZADOR WEB AUDIO AMBIENTAL
  // ==========================================================================
  let audioCtx = null;
  let isPlaying = false;
  let pianoTimer = null;
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');

  // Arpegio romántico en modo mayor para ambiente cálido
  const notes = [
    261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
    220.00, 261.63, 329.63, 440.00, // A3, C4, E4, A4
    174.61, 220.00, 261.63, 349.23, // F3, A3, C4, F4
    196.00, 246.94, 293.66, 392.00  // G3, B3, D4, G4
  ];

  function playPianoNote(freq, duration = 2.5) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Envolvente de piano suave
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  let noteIndex = 0;
  function startMusicLoop() {
    if (pianoTimer) clearInterval(pianoTimer);
    pianoTimer = setInterval(() => {
      if (!isPlaying) return;
      playPianoNote(notes[noteIndex % notes.length], 2.8);
      noteIndex++;
    }, 600);
  }

  function toggleAudio(forcePlay = false) {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (forcePlay) {
      isPlaying = true;
    } else {
      isPlaying = !isPlaying;
    }

    if (isPlaying) {
      startMusicLoop();
      if (audioToggleBtn) {
        audioToggleBtn.classList.add('playing');
      }
      if (audioIcon) {
        audioIcon.textContent = 'volume_up';
      }
      showToast('🎵 Música ambiental romántica activada');
    } else {
      if (pianoTimer) clearInterval(pianoTimer);
      if (audioToggleBtn) {
        audioToggleBtn.classList.remove('playing');
      }
      if (audioIcon) {
        audioIcon.textContent = 'volume_off';
      }
      showToast('🔇 Música pausada');
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => toggleAudio());
  }

  // ==========================================================================
  // 4. ANIMACIÓN DE HOJAS DE OTOÑO (CANVAS PARTICLES)
  // ==========================================================================
  const canvas = document.getElementById('leavesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const leafColors = [
      '#B15E3B', // Terracotta
      '#C9A876', // Heirloom gold
      '#8C4334', // Rust
      '#D49B4B', // Warm ochre
      '#768776', // Eucalyptus sage
      '#C48B82'  // Dusty rose
    ];

    const leafParticles = [];
    const maxLeaves = 28;

    for (let i = 0; i < maxLeaves; i++) {
      leafParticles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 9 + 7,
        speedY: Math.random() * 0.9 + 0.6,
        speedX: Math.random() * 1.2 - 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.8,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        opacity: Math.random() * 0.5 + 0.35
      });
    }

    function renderLeaves() {
      ctx.clearRect(0, 0, width, height);

      leafParticles.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.x += Math.sin(leaf.y * 0.015) * 0.8 + leaf.speedX * 0.4;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = leaf.color;

        // Dibujar forma de hoja otoñal
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size, leaf.size * 0.48, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tallo sutil
        ctx.strokeStyle = '#5E381A';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(-leaf.size * 0.9, 0);
        ctx.lineTo(leaf.size * 0.9, 0);
        ctx.stroke();

        ctx.restore();
      });

      requestAnimationFrame(renderLeaves);
    }

    renderLeaves();
  }

  // ==========================================================================
  // 5. TOAST NOTIFICATION & COPIADO AL PORTAPAPELES
  // ==========================================================================
  const toastEl = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  window.copyToClipboard = function (text, btnElement, successMsg = '¡Copiado al portapapeles!') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        triggerCopyFeedback(btnElement, successMsg);
      }).catch(() => fallbackCopy(text, btnElement, successMsg));
    } else {
      fallbackCopy(text, btnElement, successMsg);
    }
  };

  function fallbackCopy(text, btnElement, successMsg) {
    const temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      triggerCopyFeedback(btnElement, successMsg);
    } catch (e) {
      showToast('Por favor copia manualmente: ' + text);
    }
    document.body.removeChild(temp);
  }

  function triggerCopyFeedback(btnElement, successMsg) {
    showToast(successMsg);
    if (btnElement) {
      const originalText = btnElement.innerHTML;
      btnElement.classList.add('copied');
      btnElement.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> ¡Copiado!`;
      setTimeout(() => {
        btnElement.classList.remove('copied');
        btnElement.innerHTML = originalText;
      }, 2500);
    }
  }

  // ==========================================================================
  // 6. GENERADOR DE CALENDARIOS (GOOGLE & APPLE/OUTLOOK .ICS)
  // ==========================================================================
  const btnGoogleCal = document.getElementById('btnGoogleCal');
  const btnIcsCal = document.getElementById('btnIcsCal');

  const eventTitle = encodeURIComponent('Boda Camila & Cristóbal');
  const eventDetails = encodeURIComponent('Celebración de la Boda de Camila Castillo & Cristóbal Cabrera en Hacienda Los Encinos. ¡Te esperamos!');
  const eventLocation = encodeURIComponent('Hacienda Los Encinos, Carretera al Valle Km 14.5, Jardín del Castaño');
  const eventDates = '20251018T170000/20251019T040000';

  if (btnGoogleCal) {
    btnGoogleCal.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDates}&details=${eventDetails}&location=${eventLocation}`;
  }

  if (btnIcsCal) {
    btnIcsCal.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//AreOne Weddings//Boda Camila y Cristobal//ES',
        'BEGIN:VEVENT',
        'UID:' + new Date().getTime() + '@areoneweddings.com',
        'DTSTAMP:20251018T170000Z',
        'DTSTART:20251018T170000',
        'DTEND:20251019T040000',
        'SUMMARY:Boda Camila & Cristóbal',
        'DESCRIPTION:Celebración de la Boda de Camila & Cristóbal en Hacienda Los Encinos.',
        'LOCATION:Hacienda Los Encinos, Carretera al Valle Km 14.5',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Boda_Camila_y_Cristobal.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📅 Archivo de calendario (.ics) descargado');
    });
  }

  // ==========================================================================
  // 7. FORMULARIO INTELIGENTE DE CONFIRMACIÓN RSVP
  // ==========================================================================
  const rsvpForm = document.getElementById('rsvpForm');
  const btnWhatsAppBride = document.getElementById('btnWhatsAppBride');
  const btnWhatsAppGroom = document.getElementById('btnWhatsAppGroom');

  function getRsvpMessage() {
    const name = document.getElementById('rsvpName')?.value.trim() || 'Invitado(a)';
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'confirm';
    const passes = document.getElementById('rsvpPasses')?.value || '1 persona';
    const diet = document.getElementById('rsvpDiet')?.value.trim() || 'Sin restricciones';
    const message = document.getElementById('rsvpMessage')?.value.trim() || '';

    const statusText = attendance === 'confirm'
      ? '¡Sí, confirmo con muchísima alegría mi asistencia! 💍✨'
      : 'Lamentablemente no podré acompañarles físicamente, pero les deseo lo mejor con todo el corazón. 🤍';

    let text = `🍂 *CONFIRMACIÓN DE ASISTENCIA — BODA CAMILA & CRISTÓBAL* 🍂\n` +
      `📅 *Fecha:* Sábado, 18 de Octubre, 2025\n\n` +
      `👤 *Nombre:* ${name}\n` +
      `💌 *Asistencia:* ${statusText}\n` +
      `👥 *Pases:* ${passes}\n` +
      `🥗 *Menú/Alergias:* ${diet}\n`;

    if (message) {
      text += `💬 *Mensaje:* "${message}"\n`;
    }

    return encodeURIComponent(text);
  }

  if (btnWhatsAppBride) {
    btnWhatsAppBride.addEventListener('click', (e) => {
      e.preventDefault();
      const text = getRsvpMessage();
      window.open(`https://wa.me/?text=${text}`, '_blank');
      showToast('Abriendo WhatsApp para confirmar con la Novia...');
    });
  }

  if (btnWhatsAppGroom) {
    btnWhatsAppGroom.addEventListener('click', (e) => {
      e.preventDefault();
      const text = getRsvpMessage();
      window.open(`https://wa.me/?text=${text}`, '_blank');
      showToast('Abriendo WhatsApp para confirmar con el Novio...');
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = getRsvpMessage();
      window.open(`https://wa.me/?text=${text}`, '_blank');
      showToast('¡Muchas gracias por confirmar tu asistencia!');
    });
  }

  // ==========================================================================
  // 8. INTERACCIÓN DE PALETA DE VESTIMENTA (SWATCHES)
  // ==========================================================================
  const swatchChips = document.querySelectorAll('.swatch-chip');
  swatchChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const colorName = chip.getAttribute('data-name') || chip.title;
      showToast(`Tono sugerido: ${colorName}`);
    });
  });
});
