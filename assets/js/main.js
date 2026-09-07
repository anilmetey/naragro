/* Created by Anıl Mete */
/**
* Template Name: UpConstruction - v1.3.0
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader / Splash Screen
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const minDisplayTime = 800;
    const startTime = performance.now();

    const hideSplash = () => {
      const elapsed = performance.now() - startTime;
      const delay = Math.max(0, minDisplayTime - elapsed);
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 650);
      }, delay);
    };

    if (document.readyState === 'complete') {
      hideSplash();
    } else {
      window.addEventListener('load', hideSplash);
      setTimeout(hideSplash, 2500);
    }
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = (typeof GLightbox !== 'undefined') ? GLightbox({
    selector: '.glightbox'
  }) : null;

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope && typeof Isotope !== 'undefined') {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    /**
     * Init swiper slider with 2 slides at once in desktop view
     */
    new Swiper('.slides-2', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });
  }

  /* extra */
  window.addEventListener("resize", function(event) {
    let headerEl = document.getElementById("header");
    if (headerEl && headerEl.children[0] && headerEl.children[0].children[0] && headerEl.children[0].children[0].children[0]) {
      let logo = headerEl.children[0].children[0].children[0];
      if (logo && logo.width) {
        logo.style.left = ((window.innerWidth - logo.width) / 2) + "px";
      }
    }
  });

  function switchFixed() {
    let demo = document.getElementById("demo");
    if (demo) demo.innerHTML = "You scrolled in div.";
  }

  /**
   * Initiate pURE cOUNTER
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'slide',
        once: true,
        mirror: false
      });
    }
  }

  // Initialize AOS immediately on DOM ready
  aos_init();

  // Also refresh AOS on window load and shortly after to ensure elements are visible
  window.addEventListener('load', () => {
    aos_init();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 350);
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 1000);
  /**
   * What We Do Interactive
   */
  const nodeCards = document.querySelectorAll('.node-card');
  const flowGroups = document.querySelectorAll('.flow-group');
  const bannerText = document.getElementById('bannerText');
  const hubCenter = document.getElementById('hub-naragro');

  const nodeInfoMap = {
    'farmers': {
      title: 'Farmers',
      icon: '🌾',
      desc: 'Sourcing and contracting sustainable raw oilseeds, grains and agricultural commodities directly from grower networks & cooperatives.'
    },
    'crushers': {
      title: 'Crushers',
      icon: '⚙️',
      desc: 'Supplying oilseed feedstock and brokering crude vegetable oils and protein meals with optimal processing economics.'
    },
    'traders': {
      title: 'Traders',
      icon: '🌐',
      desc: 'Providing cross-border market arbitrage, liquidity, freight risk management, and competitive commodity transactions.'
    },
    'refineries': {
      title: 'Refineries',
      icon: '🏭',
      desc: 'Supplying crude vegetable oils and marketing refined, bleached & deodorized (RBD) oils and specialized vegetable fats.'
    },
    'consumers': {
      title: 'Consumers',
      icon: '👥',
      desc: 'Connecting verified, reliable commodity supplies to food manufacturers, oleochemicals, feed producers, and retail markets.'
    },
    'hub': {
      title: 'Naragro',
      icon: '🔴',
      desc: 'Agricultural commodities brokerage and consultancy firm specialized in vegetable oils and fats, bringing trust and risk management across global markets.'
    }
  };

  const defaultBannerHTML = 'Hover or tap on any market participant to explore Naragro\'s integrated agricultural supply network.';

  function activateNode(nodeId) {
    flowGroups.forEach(flow => {
      if (flow.id === `flow-${nodeId}`) {
        flow.classList.add('is-active');
        flow.classList.remove('is-dimmed');
      } else {
        flow.classList.remove('is-active');
        flow.classList.add('is-dimmed');
      }
    });

    const info = nodeInfoMap[nodeId];
    if (info && bannerText) {
      bannerText.innerHTML = `<strong>${info.icon} ${info.title}:</strong> ${info.desc}`;
    }
  }

  function resetNodes() {
    flowGroups.forEach(flow => {
      flow.classList.remove('is-active');
      flow.classList.remove('is-dimmed');
    });
    if (bannerText) {
      bannerText.innerHTML = defaultBannerHTML;
    }
  }

  nodeCards.forEach(card => {
    const nodeKey = card.getAttribute('data-node');
    card.addEventListener('mouseenter', () => activateNode(nodeKey));
    card.addEventListener('mouseleave', resetNodes);
    card.addEventListener('click', () => activateNode(nodeKey));
  });

  if (hubCenter) {
    hubCenter.addEventListener('mouseenter', () => {
      flowGroups.forEach(f => {
        f.classList.add('is-active');
        f.classList.remove('is-dimmed');
      });
      if (bannerText) {
        bannerText.innerHTML = `<strong>${nodeInfoMap.hub.icon} ${nodeInfoMap.hub.title}:</strong> ${nodeInfoMap.hub.desc}`;
      }
    });
    hubCenter.addEventListener('mouseleave', resetNodes);
  }

  /**
   * 3D Naragro Pomegranate Globe
   */
  function initNaragroGlobe() {
    const canvas = document.getElementById('naragroGlobeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0, cx = 0, cy = 0, radius = 0;
    let rotX = 0.25;
    let rotY = 0;
    let velX = 0;
    let velY = 0.0035;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    function resize() {
      const parent = canvas.parentElement;
      const rect = canvas.getBoundingClientRect();
      const parentRect = parent ? parent.getBoundingClientRect() : null;
      
      const w = Math.round(rect.width || (parentRect ? parentRect.width : 0) || 540);
      const h = Math.round(rect.height || (parentRect ? parentRect.height : 0) || 520);
      
      if (w <= 10 || h <= 10) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = Math.round(height * 0.38 + 6);
      radius = Math.max(78, Math.min(width * 0.38, height * 0.31));
      return true;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('load', () => {
      setTimeout(resize, 100);
      setTimeout(resize, 500);
      setTimeout(resize, 1200);
    });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => resize());
      if (canvas.parentElement) ro.observe(canvas.parentElement);
      ro.observe(canvas);
    }

    // Mouse drag
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      velX = 0;
      velY = 0;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.007;
      rotX += dy * 0.007;
      rotX = Math.max(-0.9, Math.min(0.9, rotX));
      velX = dy * 0.0025;
      velY = dx * 0.0025;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mouseleave', () => { isDragging = false; });
    window.addEventListener('blur', () => { isDragging = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
        velX = 0;
        velY = 0;
      }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.007;
      rotX += dy * 0.007;
      rotX = Math.max(-0.9, Math.min(0.9, rotX));
      velX = dy * 0.0025;
      velY = dx * 0.0025;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchcancel', () => { isDragging = false; });

    // 3D Math Projection
    function project(x, y, z) {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 440;
      const p = fov / (fov + z2);
      return {
        x: cx + x1 * p,
        y: cy + y2 * p,
        z: z2,
        scale: p
      };
    }

    function latLonTo3D(latDeg, lonDeg, r) {
      const phi = (90 - latDeg) * (Math.PI / 180);
      const theta = (lonDeg + 180) * (Math.PI / 180);
      return {
        x: -(r * Math.sin(phi) * Math.cos(theta)),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta)
      };
    }

    // Trade Hubs
    const hubs = [
      { name: "Mersin / HQ", lat: 36.8, lon: 34.6, isHQ: true },
      { name: "Geneva", lat: 46.2, lon: 6.1 },
      { name: "Rotterdam", lat: 51.9, lon: 4.5 },
      { name: "Singapore", lat: 1.35, lon: 103.8 },
      { name: "Dubai", lat: 25.2, lon: 55.3 },
      { name: "Chicago", lat: 41.8, lon: -87.6 },
      { name: "Santos", lat: -23.9, lon: -46.3 },
      { name: "Mumbai", lat: 19.0, lon: 72.8 },
      { name: "Jakarta", lat: -6.2, lon: 106.8 },
      { name: "New Orleans", lat: 29.9, lon: -90.0 }
    ];

    const routes = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 },
      { from: 0, to: 7 },
      { from: 3, to: 8 },
      { from: 5, to: 9 }
    ];

    const emblemImg = new Image();
    emblemImg.src = 'assets/img/naragro-emblem.png';

    // Continental Landmass Grid (Europe, Middle East, Asia, Africa, Americas, Oceania)
    const landRegions = [
      // Europe & Mediterranean
      { lat: [50, 58], lon: [-8, 2], count: 14 },
      { lat: [36, 54], lon: [-9, 16], count: 32 },
      { lat: [56, 68], lon: [6, 26], count: 18 },
      { lat: [45, 60], lon: [16, 38], count: 28 },
      { lat: [36, 42], lon: [26, 44], count: 22 }, // Turkey & Mediterranean
      // Middle East & Central Asia
      { lat: [20, 36], lon: [38, 58], count: 24 },
      { lat: [40, 52], lon: [50, 80], count: 22 },
      // Asia
      { lat: [8, 30], lon: [70, 88], count: 30 },
      { lat: [22, 42], lon: [100, 122], count: 38 },
      { lat: [32, 42], lon: [132, 142], count: 12 },
      { lat: [-6, 18], lon: [98, 120], count: 26 },
      { lat: [54, 66], lon: [60, 135], count: 35 },
      // Africa
      { lat: [18, 35], lon: [-10, 34], count: 30 },
      { lat: [4, 16], lon: [-15, 8], count: 20 },
      { lat: [-10, 14], lon: [28, 44], count: 22 },
      { lat: [-34, -12], lon: [16, 34], count: 22 },
      // North America
      { lat: [28, 48], lon: [-92, -68], count: 34 },
      { lat: [32, 50], lon: [-122, -95], count: 30 },
      { lat: [50, 64], lon: [-120, -65], count: 30 },
      { lat: [16, 28], lon: [-106, -88], count: 18 },
      // South America
      { lat: [0, 11], lon: [-76, -58], count: 16 },
      { lat: [-24, -2], lon: [-62, -36], count: 34 },
      { lat: [-50, -25], lon: [-70, -58], count: 20 },
      // Australia
      { lat: [-36, -14], lon: [116, 150], count: 26 }
    ];

    const continentPoints = [];
    landRegions.forEach(reg => {
      for (let i = 0; i < reg.count; i++) {
        continentPoints.push({
          lat: reg.lat[0] + Math.random() * (reg.lat[1] - reg.lat[0]),
          lon: reg.lon[0] + Math.random() * (reg.lon[1] - reg.lon[0]),
          size: 1.3 + Math.random() * 2.0,
          isGold: Math.random() > 0.4,
          phase: Math.random() * Math.PI * 2
        });
      }
    });

    let time = 0;
    function render() {
      requestAnimationFrame(render);

      if (width <= 10 || height <= 10 || radius <= 10) {
        if (!resize()) return;
      }

      time += 0.02;

      if (!isDragging) {
        velY = velY * 0.95 + 0.0038 * 0.05;
        velX *= 0.92;
        rotY += velY;
        rotX += velX;
        // Softly re-center vertical tilt toward natural viewing angle
        rotX += (0.22 - rotX) * 0.015;
      }

      ctx.clearRect(0, 0, width, height);

      // Multi-layer Atmosphere glow in brand gold (#feb900) & wine (#762638)
      const radGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5);
      radGlow.addColorStop(0, 'rgba(118, 38, 56, 0.22)');
      radGlow.addColorStop(0.45, 'rgba(254, 185, 0, 0.15)');
      radGlow.addColorStop(0.75, 'rgba(189, 106, 75, 0.06)');
      radGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 3D Floor Shadow & Ground Glow under the globe
      ctx.save();
      const floorY = cy + radius + 15;
      const floorGrad = ctx.createRadialGradient(cx, floorY, 0, cx, floorY, radius * 0.88);
      floorGrad.addColorStop(0, 'rgba(118, 38, 56, 0.32)');
      floorGrad.addColorStop(0.35, 'rgba(254, 185, 0, 0.20)');
      floorGrad.addColorStop(0.7, 'rgba(189, 106, 75, 0.06)');
      floorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.ellipse(cx, floorY, radius * 0.82, radius * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sphere base: Deep enterprise twilight globe with 3D spherical lighting
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#1c2838');    // sleek ocean highlight
      sphereGrad.addColorStop(0.4, '#111b28');   // deep executive midnight
      sphereGrad.addColorStop(0.75, '#0c1420');  // deep obsidian
      sphereGrad.addColorStop(1, '#1a0e14');     // subtle corporate burgundy rim tone

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(118, 38, 56, 0.3)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 14;
      ctx.fill();
      ctx.restore();

      // Inner glass / sheen reflection at upper-left
      ctx.save();
      const sheenGrad = ctx.createRadialGradient(
        cx - radius * 0.38,
        cy - radius * 0.38,
        0,
        cx - radius * 0.38,
        cy - radius * 0.38,
        radius * 0.7
      );
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      sheenGrad.addColorStop(0.4, 'rgba(254, 185, 0, 0.12)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.arc(cx - radius * 0.38, cy - radius * 0.38, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Outer rim in warm gold
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(254, 185, 0, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Meridians in Gold (#feb900) and Copper (#bd6a4b)
      ctx.save();
      const latitudes = [-60, -30, 0, 30, 60];
      latitudes.forEach(lat => {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt3D = latLonTo3D(lat, lon, radius);
          const pt2D = project(pt3D.x, pt3D.y, pt3D.z);
          if (pt2D.z > 0) {
            if (!started) {
              ctx.moveTo(pt2D.x, pt2D.y);
              started = true;
            } else {
              ctx.lineTo(pt2D.x, pt2D.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(254, 185, 0, 0.55)' : 'rgba(254, 215, 120, 0.18)';
        ctx.lineWidth = lat === 0 ? 1.4 : 0.8;
        ctx.stroke();
      });

      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const pt3D = latLonTo3D(lat, lon, radius);
          const pt2D = project(pt3D.x, pt3D.y, pt3D.z);
          if (pt2D.z > 0) {
            if (!started) {
              ctx.moveTo(pt2D.x, pt2D.y);
              started = true;
            } else {
              ctx.lineTo(pt2D.x, pt2D.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = (lon % 90 === 0) ? 'rgba(254, 185, 0, 0.4)' : 'rgba(189, 106, 75, 0.2)';
        ctx.lineWidth = (lon % 90 === 0) ? 1.1 : 0.7;
        ctx.stroke();
      }
      ctx.restore();

      // ============================================
      // Central Naragro Logo Core (Heart of the Globe)
      // ============================================
      if (emblemImg.complete && emblemImg.naturalWidth > 0) {
        ctx.save();
        const breathe = 1 + Math.sin(time * 2.2) * 0.025;
        const emblemSize = radius * 0.54 * breathe;
        const offX = Math.sin(rotY) * 5;
        const offY = rotX * 5;
        const lx = cx + offX;
        const ly = cy + offY;

        // Luminous soft white-gold circular backing
        const aura = ctx.createRadialGradient(lx, ly, emblemSize * 0.15, lx, ly, emblemSize * 0.7);
        aura.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
        aura.addColorStop(0.55, 'rgba(254, 248, 238, 0.92)');
        aura.addColorStop(0.82, 'rgba(254, 185, 0, 0.32)');
        aura.addColorStop(1, 'rgba(118, 38, 56, 0)');

        ctx.beginPath();
        ctx.arc(lx, ly, emblemSize * 0.62, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.shadowColor = 'rgba(254, 185, 0, 0.45)';
        ctx.shadowBlur = 22;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Delicate golden halo boundary ring
        ctx.beginPath();
        ctx.arc(lx, ly, emblemSize * 0.52, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(254, 185, 0, 0.6)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Draw the crisp logo emblem
        ctx.drawImage(
          emblemImg,
          lx - emblemSize * 0.48,
          ly - emblemSize * 0.48,
          emblemSize * 0.96,
          emblemSize * 0.96
        );
        ctx.restore();
      }

      // Continents Dots
      continentPoints.forEach(sp => {
        const p3d = latLonTo3D(sp.lat, sp.lon, radius);
        const p2d = project(p3d.x, p3d.y, p3d.z);
        if (p2d.z > -20) {
          const depthAlpha = Math.max(0.12, (p2d.z + radius) / (radius * 2));
          const pulse = 0.8 + 0.3 * Math.sin(time * 2 + sp.phase);
          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, sp.size * p2d.scale * pulse, 0, Math.PI * 2);
          if (sp.isGold) {
            ctx.fillStyle = `rgba(254, 185, 0, ${depthAlpha * 0.95})`;  // Logo gold #feb900
          } else {
            ctx.fillStyle = `rgba(245, 247, 250, ${depthAlpha * 0.88})`; // Pearl white
          }
          ctx.fill();
        }
      });

      // Great-Circle Trade Arcs in Luminous Gold
      routes.forEach((route, idx) => {
        const hA = hubs[route.from];
        const hB = hubs[route.to];
        const pA3 = latLonTo3D(hA.lat, hA.lon, radius);
        const pB3 = latLonTo3D(hB.lat, hB.lon, radius);

        const steps = 28;
        const arc2D = [];
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const mx = pA3.x * (1 - t) + pB3.x * t;
          const my = pA3.y * (1 - t) + pB3.y * t;
          const mz = pA3.z * (1 - t) + pB3.z * t;
          const len = Math.sqrt(mx * mx + my * my + mz * mz);
          const alt = 1 + Math.sin(t * Math.PI) * 0.18;
          const curR = radius * alt;
          const curX = (mx / len) * curR;
          const curY = (my / len) * curR;
          const curZ = (mz / len) * curR;
          arc2D.push({ ...project(curX, curY, curZ), t });
        }

        const frontSteps = arc2D.filter(p => p.z > -10).length;
        if (frontSteps > steps * 0.35) {
          ctx.beginPath();
          arc2D.forEach((pt, i) => {
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          const avgZ = arc2D.reduce((s, p) => s + p.z, 0) / arc2D.length;
          const arcAlpha = Math.max(0.15, (avgZ + radius) / (radius * 2.2));
          ctx.strokeStyle = idx % 2 === 0 ? `rgba(254, 185, 0, ${arcAlpha * 0.85})` : `rgba(255, 235, 170, ${arcAlpha * 0.7})`;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Staggered dual photons per route for living global flow
          [0, 0.5].forEach((offset) => {
            const photonT = (time * 0.55 + idx * 0.19 + offset) % 1;
            const photonIdx = Math.floor(photonT * steps);
            const photonPt = arc2D[photonIdx];
            if (photonPt && photonPt.z > -10) {
              ctx.beginPath();
              ctx.arc(photonPt.x, photonPt.y, (offset === 0 ? 3.6 : 2.5) * photonPt.scale, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#feb900';
              ctx.shadowBlur = offset === 0 ? 12 : 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        }
      });

      // Trade Hubs Pins (Clean & prestigious, no text labels)
      hubs.forEach((hub) => {
        const p3d = latLonTo3D(hub.lat, hub.lon, radius);
        const p2d = project(p3d.x, p3d.y, p3d.z);

        if (p2d.z > 0) {
          const isHQ = hub.isHQ;

          if (isHQ) {
            [0, 0.5].forEach(wOff => {
              const pulseT = (time * 2.0 + wOff) % 1;
              const pulseR = 5 + pulseT * 22;
              ctx.beginPath();
              ctx.arc(p2d.x, p2d.y, pulseR * p2d.scale, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(254, 185, 0, ${0.85 * (1 - pulseT)})`;
              ctx.lineWidth = 1.6;
              ctx.stroke();
            });
          }

          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, (isHQ ? 5.5 : 3.8) * p2d.scale, 0, Math.PI * 2);
          ctx.fillStyle = isHQ ? '#feb900' : '#ffffff';
          ctx.shadowColor = isHQ ? '#feb900' : 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, 1.8 * p2d.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#762638';
          ctx.fill();
        }
      });

      // Tilted Golden Equator Ring
      ctx.save();
      const ringTilt = 0.32;
      const ringRadius = radius * 1.28;
      ctx.beginPath();
      for (let a = 0; a <= 360; a += 4) {
        const rad = (a * Math.PI) / 180;
        const rx = ringRadius * Math.cos(rad);
        const ry = ringRadius * Math.sin(rad) * Math.sin(ringTilt);
        const rz = ringRadius * Math.sin(rad) * Math.cos(ringTilt);
        const rp = project(rx, ry, rz);
        if (a === 0) ctx.moveTo(rp.x, rp.y);
        else ctx.lineTo(rp.x, rp.y);
      }
      ctx.strokeStyle = 'rgba(254, 185, 0, 0.5)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Secondary Armillary Ring in subtle copper
      const ringTilt2 = -0.28;
      const ringRadius2 = radius * 1.34;
      ctx.beginPath();
      for (let a = 0; a <= 360; a += 4) {
        const rad = (a * Math.PI) / 180;
        const rx = ringRadius2 * Math.cos(rad);
        const ry = ringRadius2 * Math.sin(rad) * Math.sin(ringTilt2);
        const rz = ringRadius2 * Math.sin(rad) * Math.cos(ringTilt2);
        const rp = project(rx, ry, rz);
        if (a === 0) ctx.moveTo(rp.x, rp.y);
        else ctx.lineTo(rp.x, rp.y);
      }
      ctx.strokeStyle = 'rgba(189, 106, 75, 0.3)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    render();
  }

  try {
    initNaragroGlobe();
  } catch (err) {
    console.error('Naragro Globe init error:', err);
  }

  // Final AOS safety initialization
  if (typeof aos_init === 'function') {
    aos_init();
  }

});