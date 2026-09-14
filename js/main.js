/**
 * PORTAFOLIO PROFESIONAL - CAMILA CAROLINA IANNI
 * Lógica interactiva: Cotizador dinámico para clientes, Modal de diploma Da Vinci,
 * audio clicks retro, menú móvil y envío a WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de contacto
  const WHATSAPP_NUMBER = '5491178189881'; // Formato internacional
  const EMAIL_CONTACT = 'Ianni.camila.c@gmail.com';

  // 1. Menú Móvil y Tablets (Drawer & Backdrop)
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileCloseBtn = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 2. Modal de Diploma Da Vinci
  const diplomaTrigger = document.getElementById('diplomaModalTrigger');
  const diplomaModal = document.getElementById('diplomaModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const openDiploma = () => {
    if (diplomaModal) {
      diplomaModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDiploma = () => {
    if (diplomaModal) {
      diplomaModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (diplomaTrigger) diplomaTrigger.addEventListener('click', openDiploma);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDiploma);
  if (diplomaModal) {
    diplomaModal.addEventListener('click', (e) => {
      if (e.target === diplomaModal) closeDiploma();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && diplomaModal && diplomaModal.classList.contains('active')) {
      closeDiploma();
    }
  });

  // 3. Sintetizador de sonido retro sutil para teclas de teclado
  const playRetroKeyClick = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (err) {
      // Silently ignore if audio context is blocked
    }
  };

  const interactiveKeys = document.querySelectorAll('.keyboard-key, .floating-key');
  interactiveKeys.forEach(key => {
    key.addEventListener('click', () => {
      playRetroKeyClick();
      key.style.transform = 'translateY(4px)';
      setTimeout(() => {
        key.style.transform = '';
      }, 150);
    });
  });

  // 4. Cotizador Interactivo de Sitios Web
  let selectedProjectType = 'Catálogo Mayorista / Productos';
  let selectedModules = [
    'Catálogo seccionado en categorías',
    'Pedidos directos por WhatsApp',
    'Optimización mobile-first'
  ];

  const typeOptions = document.querySelectorAll('.calc-type-option');
  const moduleOptions = document.querySelectorAll('.calc-module-option');
  const calcSummaryText = document.getElementById('calcSummaryText');
  const calcWhatsappBtn = document.getElementById('calcWhatsappBtn');

  const updateCalculatorSummary = () => {
    let summary = `Proyecto: ${selectedProjectType} con `;
    if (selectedModules.length > 0) {
      summary += `${selectedModules.join(', ')}.`;
    } else {
      summary += `configuración esencial.`;
    }

    if (calcSummaryText) {
      calcSummaryText.textContent = summary;
    }

    if (calcWhatsappBtn) {
      const rawText = `¡Hola Camila! Vi tu portafolio web y me gustaría cotizar una página para mi negocio:
- Tipo: ${selectedProjectType}
- Funcionalidades deseadas: ${selectedModules.join(', ')}
- Plazo estimado: En menos de 1 semana
¿Podríamos conversar para ver un diseño preliminar gratuito? Muchas gracias!`;
      
      const encodedMsg = encodeURIComponent(rawText);
      calcWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    }
  };

  typeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      typeOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedProjectType = opt.getAttribute('data-type') || 'Sitio Web Personalizado';
      playRetroKeyClick();
      updateCalculatorSummary();
    });
  });

  moduleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const modName = opt.getAttribute('data-module');
      if (opt.classList.contains('selected')) {
        if (!selectedModules.includes(modName)) selectedModules.push(modName);
      } else {
        selectedModules = selectedModules.filter(m => m !== modName);
      }
      playRetroKeyClick();
      updateCalculatorSummary();
    });
  });

  // Inicializar cotizador
  updateCalculatorSummary();

  // 5. Botones generales de WhatsApp con mensaje personalizado
  const directWhatsappButtons = document.querySelectorAll('.js-whatsapp-direct');
  directWhatsappButtons.forEach(btn => {
    const customMessage = btn.getAttribute('data-message') || 
      '¡Hola Camila! Vi tu portafolio y me gustaría consultar por el desarrollo de una web para mi negocio.';
    btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
  });

  console.log('Portafolio de Camila Carolina Ianni cargado exitosamente ');
});
