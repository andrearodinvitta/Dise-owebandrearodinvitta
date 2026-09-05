/**
 * MARTA & JERÓNIMO — WEDDING INVITATION INTERACTIVE LOGIC
 */

let globalAudioPlayer = null;

document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayer();
  initEnvelopeOpening();
  initNavbarScroll();
  initCountdown();
  initCalendarAction();
  initModals();
  initRsvpForm();
  initAdminDashboard();
  initCopyButtons();
});

/* ==========================================================================
   0. ENVELOPE OPENING EXPERIENCE ("OPEN THIS")
   ========================================================================== */
function initEnvelopeOpening() {
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelopeBox = document.getElementById('envelopeBox');
  const envelopeSealBtn = document.getElementById('envelopeSealBtn');

  if (!envelopeScreen || !envelopeBox || !envelopeSealBtn) return;

  // Prevent background scrolling while envelope is closed
  document.body.style.overflow = 'hidden';

  let hasOpened = false;

  const handleOpen = (e) => {
    if (hasOpened) return;
    hasOpened = true;

    // Optional tactile audio effect: wax seal break sound
    playSealBreakSound();

    // Trigger visual envelope opening sequence
    envelopeBox.classList.add('opening');

    // Automatically start romantic background music upon this user gesture
    if (globalAudioPlayer && !globalAudioPlayer.isPlaying) {
      globalAudioPlayer.startMusic();
    }

    // After animation completes, smoothly dissolve the overlay screen
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      document.body.style.overflow = '';
      showToast('¡Bienvenidos a la boda de Marta & Jerónimo!');
    }, 1100);
  };

  // Click on seal button or anywhere on screen
  envelopeSealBtn.addEventListener('click', handleOpen);
  envelopeBox.addEventListener('click', handleOpen);
  envelopeScreen.addEventListener('click', handleOpen);

  // Auto-reveal if inside portfolio iframe
  try {
    const isInsideIframe = (window.self !== window.top);
    if (isInsideIframe) {
      setTimeout(() => {
        if (!hasOpened) handleOpen();
      }, 2000);
    }
  } catch (err) {}

  // Keyboard accessibility (Enter or Space)
  envelopeSealBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });
}

/**
 * Realistic gentle wax snap / paper unfolding sound effect via Web Audio API
 */
function playSealBreakSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Low gentle thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);

    // Subtle paper rustle (filtered white noise)
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(1.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.04);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now + 0.02);
    noise.stop(now + 0.2);
  } catch (err) {
    // Ignore audio context autoplay quirks safely
  }
}

/* ==========================================================================
   1. ROMANTIC AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
function initAudioPlayer() {
  const toggleBtn = document.getElementById('musicToggleBtn');
  const iconPlay = document.getElementById('musicIconPlay');
  const iconPause = document.getElementById('musicIconPause');

  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;
  let masterGain = null;

  // Romantic harmonic progression (Canon in C / romantic nocturne arpeggios):
  // C major, G major, A minor, E minor, F major, C major, F major, G sus4
  const chordProgression = [
    // [Bass, Chord tones, High melody hint]
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25], melody: 659.25 }, // C
    { bass: 98.00,  notes: [246.94, 293.66, 392.00, 493.88], melody: 587.33 }, // G
    { bass: 110.00, notes: [220.00, 261.63, 329.63, 440.00], melody: 523.25 }, // Am
    { bass: 82.41,  notes: [196.00, 246.94, 329.63, 392.00], melody: 493.88 }, // Em
    { bass: 87.31,  notes: [220.00, 261.63, 349.23, 440.00], melody: 523.25 }, // F
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25], melody: 659.25 }, // C
    { bass: 87.31,  notes: [220.00, 261.63, 349.23, 523.25], melody: 587.33 }, // F
    { bass: 98.00,  notes: [246.94, 293.66, 392.00, 493.88], melody: 493.88 }  // G
  ];

  let chordIndex = 0;
  let step = 0;

  function playTone(freq, time, duration, velocity = 0.08, type = 'sine') {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm, soft romantic timbre with harmonic roll-off
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, time);
    filter.frequency.exponentialRampToValueAtTime(320, time + duration);

    // Piano-like envelope: immediate soft attack, singing sustain, gentle decay
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(velocity, time + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  function scheduleStep() {
    if (!isPlaying || !audioCtx) return;

    const now = audioCtx.currentTime;
    const current = chordProgression[chordIndex];

    // Play bass note on step 0
    if (step === 0) {
      playTone(current.bass, now, 3.2, 0.11, 'sine');
    }

    // Play arpeggio note
    const noteFreq = current.notes[step % current.notes.length];
    playTone(noteFreq, now, 2.4, 0.07, 'triangle');

    // On alternate steps, add delicate higher octave harmonic
    if (step === 2 || step === 3) {
      playTone(current.melody, now + 0.08, 2.6, 0.05, 'sine');
    }

    step++;
    if (step >= 4) {
      step = 0;
      chordIndex = (chordIndex + 1) % chordProgression.length;
    }

    // Peaceful, relaxing tempo (~680ms between notes)
    timerId = setTimeout(scheduleStep, 680);
  }

  function startMusic() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      // Smooth fade-in
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.38, audioCtx.currentTime + 1.2);
      masterGain.connect(audioCtx.destination);
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    if (toggleBtn) {
      toggleBtn.classList.add('playing');
      if (iconPlay) iconPlay.classList.add('hidden');
      if (iconPause) iconPause.classList.remove('hidden');
    }

    scheduleStep();
    showToast('♫ Música romántica de fondo sonando');
  }

  function stopMusic() {
    isPlaying = false;
    if (timerId) clearTimeout(timerId);

    if (masterGain && audioCtx) {
      // Fade out
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    }

    if (toggleBtn) {
      toggleBtn.classList.remove('playing');
      if (iconPlay) iconPlay.classList.remove('hidden');
      if (iconPause) iconPause.classList.add('hidden');
    }

    showToast('Música pausada');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startMusic();
      } else {
        stopMusic();
      }
    });
  }

  // Expose to global so envelope can trigger it seamlessly
  globalAudioPlayer = {
    get isPlaying() { return isPlaying; },
    startMusic,
    stopMusic
  };
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  // Wedding Date: April 12, 2027 at 12:00:00 Madrid time
  const weddingDate = new Date('2027-04-12T12:00:00+02:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const timerContainer = document.getElementById('countdownTimer');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      if (timerContainer) {
        timerContainer.innerHTML = '<div class="card-script-title" style="color: var(--color-gold-accent);">¡Hoy es nuestro gran día!</div>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   4. SAVE THE DATE (ICAL / GOOGLE CALENDAR)
   ========================================================================== */
function initCalendarAction() {
  const btn = document.getElementById('addToCalendarBtn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = encodeURIComponent('Boda de Marta & Jerónimo');
    const details = encodeURIComponent('Celebración del enlace matrimonial de Marta & Jerónimo en Parroquia de San Miguel y Finca Los Rosales.');
    const location = encodeURIComponent('Parroquia de San Miguel Arcángel, Plaza de la Iglesia s/n, 28005 Madrid');
    
    // Start: 20270412T100000Z, End: 20270413T020000Z
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270412T100000Z/20270413T020000Z&details=${details}&location=${location}`;

    // Generate .ics download
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Marta y Jeronimo//Boda//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Boda de Marta & Jerónimo',
      'DESCRIPTION:Celebración del enlace matrimonial de Marta & Jerónimo.',
      'LOCATION:Parroquia de San Miguel Arcángel, Plaza de la Iglesia s/n, 28005 Madrid',
      'DTSTART:20270412T100000Z',
      'DTEND:20270413T020000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Boda_Marta_y_Jeronimo_2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('¡Evento guardado para tu calendario!');
    
    // Open Google Calendar after brief pause if on desktop
    setTimeout(() => {
      window.open(googleCalUrl, '_blank');
    }, 400);
  });
}

/* ==========================================================================
   5. MODALS MANAGEMENT
   ========================================================================== */
function initModals() {
  // Gift Modal
  const giftsModal = document.getElementById('giftsModal');
  const openGiftsBtn = document.getElementById('openGiftsModalBtn');
  const closeGiftsBtn = document.getElementById('closeGiftsModal');

  if (openGiftsBtn && giftsModal) {
    openGiftsBtn.addEventListener('click', () => openModal(giftsModal));
  }
  if (closeGiftsBtn && giftsModal) {
    closeGiftsBtn.addEventListener('click', () => closeModal(giftsModal));
  }

  // Location Map Modal
  const mapModal = document.getElementById('mapModal');
  const closeMapBtn = document.getElementById('closeMapModal');
  const mapButtons = document.querySelectorAll('.open-map-btn');
  const mapTitle = document.getElementById('mapModalTitle');
  const mapSubtitle = document.getElementById('mapModalSubtitle');
  const mapAddressText = document.getElementById('mapAddressText');
  const mapIframe = document.getElementById('mapIframe');
  const openExternalGmapsBtn = document.getElementById('openExternalGmapsBtn');

  const locationData = {
    ceremonia: {
      title: 'Parroquia de San Miguel Arcángel',
      subtitle: 'Ceremonia Religiosa — 12:00 H',
      address: 'Plaza de San Miguel, 4, 28005 Madrid, España',
      gmapsUrl: 'https://maps.google.com/?q=Plaza+de+San+Miguel+4+Madrid+Spain',
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-3.712%2C40.413%2C-3.704%2C40.418&layer=mapnik&marker=40.4154%2C-3.7081'
    },
    celebracion: {
      title: 'Finca Los Rosales',
      subtitle: 'Banquete & Fiesta — A continuación',
      address: 'Camino del Cortijo, km 4, 28220 Majadahonda, Madrid, España',
      gmapsUrl: 'https://maps.google.com/?q=Majadahonda+Madrid+Spain',
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-3.895%2C40.465%2C-3.845%2C40.495&layer=mapnik&marker=40.473%2C-3.871'
    }
  };

  mapButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const locKey = btn.getAttribute('data-location') || 'ceremonia';
      const loc = locationData[locKey];

      if (loc) {
        mapTitle.textContent = loc.title;
        mapSubtitle.textContent = loc.subtitle;
        mapAddressText.textContent = loc.address;
        mapIframe.src = loc.embedUrl;
        openExternalGmapsBtn.href = loc.gmapsUrl;
      }
      openModal(mapModal);
    });
  });

  if (closeMapBtn && mapModal) {
    closeMapBtn.addEventListener('click', () => {
      mapIframe.src = 'about:blank';
      closeModal(mapModal);
    });
  }

  // RSVP Success Modal
  const successModal = document.getElementById('rsvpSuccessModal');
  const closeSuccessBtn = document.getElementById('closeRsvpSuccessBtn');
  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => closeModal(successModal));
  }

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
    }
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   6. RSVP FORM LOGIC
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById('rsvpForm');
  if (!form) return;

  const attendingRadios = form.querySelectorAll('input[name="attending"]');
  const attendingDetails = document.getElementById('attendingDetails');
  const companionsSelect = document.getElementById('companionsCount');
  const companionsNamesGroup = document.getElementById('companionsNamesGroup');
  const dietarySelect = document.getElementById('dietaryPreferences');
  const allergiesDetailGroup = document.getElementById('allergiesDetailGroup');

  // Toggle attending fields
  attendingRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.value === 'no') {
        attendingDetails.style.display = 'none';
      } else {
        attendingDetails.style.display = 'block';
      }
    });
  });

  // Toggle companions names input
  if (companionsSelect && companionsNamesGroup) {
    companionsSelect.addEventListener('change', () => {
      if (parseInt(companionsSelect.value, 10) > 0) {
        companionsNamesGroup.style.display = 'block';
      } else {
        companionsNamesGroup.style.display = 'none';
      }
    });
  }

  // Toggle other allergies input
  if (dietarySelect && allergiesDetailGroup) {
    dietarySelect.addEventListener('change', () => {
      if (dietarySelect.value === 'otro') {
        allergiesDetailGroup.style.display = 'block';
      } else {
        allergiesDetailGroup.style.display = 'none';
      }
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName) {
      showToast('Por favor, indica tu nombre y apellidos.');
      document.getElementById('fullName').focus();
      return;
    }

    const attendingVal = form.querySelector('input[name="attending"]:checked')?.value || 'si';
    const isAttending = attendingVal === 'si';
    const companionsCount = isAttending ? document.getElementById('companionsCount')?.value || '0' : '0';
    const companionsNames = isAttending ? document.getElementById('companionsNames')?.value.trim() : '';
    const diet = isAttending ? document.getElementById('dietaryPreferences')?.value || 'estandar' : 'N/A';
    const allergiesDetail = isAttending ? document.getElementById('allergiesDetail')?.value.trim() : '';
    const bus = isAttending ? (form.querySelector('input[name="busService"]:checked')?.value || 'no') : 'no';
    const song = isAttending ? document.getElementById('songRequest')?.value.trim() : '';
    const specialMessage = document.getElementById('specialMessage')?.value.trim();

    const record = {
      id: 'rsvp_' + Date.now(),
      dateSubmitted: new Date().toLocaleString('es-ES'),
      fullName,
      attending: isAttending ? 'Sí' : 'No',
      companionsCount,
      companionsNames,
      diet,
      allergiesDetail,
      bus: bus === 'si' ? 'Sí' : 'No',
      song,
      specialMessage
    };

    // Save to LocalStorage
    saveRsvpRecord(record);

    // Format WhatsApp message for bride & groom
    let waText = `¡Hola Marta y Jerónimo! Soy ${fullName}.\n`;
    if (isAttending) {
      waText += `✨ ¡Confirmo que ASISTIRÉ a vuestra boda el 12 de abril de 2027!`;
      if (parseInt(companionsCount, 10) > 0) {
        waText += `\n👥 Acompañantes: ${companionsCount} (${companionsNames || 'sin especificar'})`;
      }
      waText += `\n🍽 Menú/Dieta: ${diet} ${allergiesDetail ? '(' + allergiesDetail + ')' : ''}`;
      waText += `\n🚌 Autobús: ${bus === 'si' ? 'Sí, necesitaré plaza' : 'Iré por mi cuenta'}`;
      if (song) waText += `\n🎵 Canción: "${song}"`;
    } else {
      waText += `Lamentablemente no podré asistir a vuestra boda, pero os deseo toda la felicidad del mundo de corazón ❤️.`;
    }
    if (specialMessage) {
      waText += `\n\n💌 Mensaje: "${specialMessage}"`;
    }

    const waEncoded = encodeURIComponent(waText);
    const waBtn = document.getElementById('whatsappSendBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/34600123456?text=${waEncoded}`;
    }

    // Update success modal text
    const successTitle = document.getElementById('rsvpSuccessTitle');
    const successMsg = document.getElementById('rsvpSuccessMessage');
    if (isAttending) {
      successTitle.textContent = '¡Qué alegría! ¡Nos vemos en la boda!';
      successMsg.textContent = `Muchas gracias, ${fullName}. Tu asistencia ha quedado registrada. Si lo deseas, puedes avisarnos con un toque por WhatsApp a continuación.`;
    } else {
      successTitle.textContent = 'Gracias por avisarnos con cariño';
      successMsg.textContent = `Agradecemos mucho tu respuesta, ${fullName}. Te echaremos mucho de menos en este día tan especial.`;
    }

    // Open Success Modal & Reset Form
    openModal(document.getElementById('rsvpSuccessModal'));
    form.reset();
    if (companionsNamesGroup) companionsNamesGroup.style.display = 'none';
    if (allergiesDetailGroup) allergiesDetailGroup.style.display = 'none';
    if (attendingDetails) attendingDetails.style.display = 'block';
  });
}

function saveRsvpRecord(record) {
  try {
    const list = JSON.parse(localStorage.getItem('marta_jeronimo_rsvps') || '[]');
    list.push(record);
    localStorage.setItem('marta_jeronimo_rsvps', JSON.stringify(list));
  } catch (err) {
    console.error('Error saving RSVP record:', err);
  }
}

/* ==========================================================================
   7. ADMIN DASHBOARD FOR SAVED RSVPs
   ========================================================================== */
function initAdminDashboard() {
  const adminBtn = document.getElementById('viewRsvpListBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdminBtn = document.getElementById('closeAdminModal');
  const exportBtn = document.getElementById('exportCsvBtn');
  const clearBtn = document.getElementById('clearRsvpsBtn');

  if (!adminBtn || !adminModal) return;

  adminBtn.addEventListener('click', () => {
    renderAdminTable();
    openModal(adminModal);
  });

  if (closeAdminBtn) {
    closeAdminBtn.addEventListener('click', () => closeModal(adminModal));
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', exportRsvpsCsv);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas borrar los registros guardados en este navegador?')) {
        localStorage.removeItem('marta_jeronimo_rsvps');
        renderAdminTable();
        showToast('Registros borrados correctamente.');
      }
    });
  }
}

function renderAdminTable() {
  const list = JSON.parse(localStorage.getItem('marta_jeronimo_rsvps') || '[]');
  const tbody = document.getElementById('adminTableBody');
  const statTotal = document.getElementById('statTotalResponses');
  const statAttending = document.getElementById('statTotalAttending');
  const statDeclined = document.getElementById('statTotalDeclined');
  const statBus = document.getElementById('statTotalBus');

  let attendingCount = 0;
  let declinedCount = 0;
  let busCount = 0;

  list.forEach((item) => {
    if (item.attending === 'Sí') {
      attendingCount += 1 + (parseInt(item.companionsCount, 10) || 0);
      if (item.bus === 'Sí') busCount += 1 + (parseInt(item.companionsCount, 10) || 0);
    } else {
      declinedCount += 1;
    }
  });

  if (statTotal) statTotal.textContent = list.length;
  if (statAttending) statAttending.textContent = attendingCount;
  if (statDeclined) statDeclined.textContent = declinedCount;
  if (statBus) statBus.textContent = busCount;

  if (!tbody) return;
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-on-cream-muted);">Aún no hay confirmaciones registradas en este dispositivo.</td></tr>';
    return;
  }

  list.forEach((item) => {
    const tr = document.createElement('tr');
    const compText = item.attending === 'Sí' && parseInt(item.companionsCount, 10) > 0
      ? `+${item.companionsCount} (${item.companionsNames || 'N/A'})`
      : '0';

    tr.innerHTML = `
      <td><small>${item.dateSubmitted}</small></td>
      <td><strong>${escapeHtml(item.fullName)}</strong></td>
      <td><span style="color: ${item.attending === 'Sí' ? '#2b8a3e' : '#c92a2a'}; font-weight:600;">${item.attending}</span></td>
      <td>${escapeHtml(compText)}</td>
      <td>${escapeHtml(item.diet)} ${item.allergiesDetail ? '<br><small>(' + escapeHtml(item.allergiesDetail) + ')</small>' : ''}</td>
      <td>${item.bus}</td>
      <td><small>${escapeHtml(item.specialMessage || '-')}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

function exportRsvpsCsv() {
  const list = JSON.parse(localStorage.getItem('marta_jeronimo_rsvps') || '[]');
  if (list.length === 0) {
    showToast('No hay registros para exportar.');
    return;
  }

  const headers = ['Fecha', 'Nombre', 'Asiste', 'Acompañantes_Num', 'Acompañantes_Nombres', 'Dieta', 'Alergias_Detalle', 'Bus', 'Cancion', 'Mensaje'];
  const rows = list.map((item) => [
    `"${item.dateSubmitted}"`,
    `"${item.fullName.replace(/"/g, '""')}"`,
    `"${item.attending}"`,
    `"${item.companionsCount}"`,
    `"${(item.companionsNames || '').replace(/"/g, '""')}"`,
    `"${item.diet}"`,
    `"${(item.allergiesDetail || '').replace(/"/g, '""')}"`,
    `"${item.bus}"`,
    `"${(item.song || '').replace(/"/g, '""')}"`,
    `"${(item.specialMessage || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'Confirmaciones_Boda_Marta_y_Jeronimo.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Archivo CSV descargado con éxito.');
}

/* ==========================================================================
   8. COPY TO CLIPBOARD BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        const textToCopy = targetEl.textContent.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`¡Copiado: ${textToCopy}!`);
          btn.style.transform = 'scale(1.08)';
          setTimeout(() => {
            btn.style.transform = '';
          }, 200);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`¡Copiado: ${textToCopy}!`);
        });
      }
    });
  });
}

/* ==========================================================================
   9. UTILITIES
   ========================================================================== */
let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
