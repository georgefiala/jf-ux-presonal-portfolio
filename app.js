(function() {
  // Prevent double execution if loaded by both bundler and HTML tag
  if (window.__FIALA_APP_INITIALIZED__) return;
  window.__FIALA_APP_INITIALIZED__ = true;

  const initApp = () => {
    /* ----------------------------------------------------------------
       1. PARALLAX EFFECT
    ---------------------------------------------------------------- */
    const logo = document.getElementById('hero-logo');
    const title = document.getElementById('hero-title');

    if (logo || title) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (logo) {
          logo.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        if (title) {
          title.style.transform = `translateY(${scrollY * -0.3}px)`;
        }
      }, { passive: true });
    }

    /* ----------------------------------------------------------------
       2. CUSTOM CURSOR LOGIC
    ---------------------------------------------------------------- */
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    // Initial positions off-screen to prevent flash/stuck at 0,0
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    // Force initial position immediately to avoid cursor stuck at 0,0
    if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    // Track mouse movement globally
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update dot immediately (no lag)
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    // Animation loop for the ring (smooth lerp effect)
    const animate = () => {
      // Lerp factor (lower = slower/smoother follow)
      const lerp = 0.15;

      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();
  };

  // Robust initialization check: run immediately if DOM is ready, otherwise wait.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();