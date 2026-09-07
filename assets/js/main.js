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
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

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

  /*
  let navbar = document.getElementById("header");
  window.onscroll = function() {
    let brcY = document.getElementsByClassName("breadcrumbs")[0].scrollHeight;
    if (window.scrollY >= brcY) {
      if (!navbar.classList.contains("active-fixed"))
        navbar.classList.add("active-fixed")
    } else {
      if (navbar.classList.contains("active-fixed"))
        navbar.classList.remove("active-fixed")
    }
  };*/

  /* extra */
  window.addEventListener("resize", function(event) {
    let logo = document.getElementById("header").children[0].children[0].children[0];
    logo.style.left = ((window.innerWidth - logo.width) / 2) + "px";
    console.log((window.innerWidth - logo.width) / 2);
  })

  function switchFixed() {
    document.getElementById("demo").innerHTML = "You scrolled in div.";
  }


  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
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
    let width = 0, height = 0, cx = 0, cy = 0, radius = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2 + 10;
      radius = Math.min(width, height) * 0.36;
    }

    resize();
    window.addEventListener('resize', resize);

    // Rotation & Physics
    let rotX = 0.22;
    let rotY = 0;
    let velX = 0;
    let velY = 0.0035;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isVisible = true;

    // Intersection Observer to save GPU/CPU when off-screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    // Mouse drag
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.006;
      rotX += dy * 0.006;
      rotX = Math.max(-0.8, Math.min(0.8, rotX));
      velX = dy * 0.002;
      velY = dx * 0.002;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.006;
      rotX += dy * 0.006;
      rotX = Math.max(-0.8, Math.min(0.8, rotX));
      velX = dy * 0.002;
      velY = dx * 0.002;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });

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

    // Surface seed particles (pomegranate seeds on landmass clusters)
    const seedPoints = [];
    const continents = [
      { latMin: 35, latMax: 60, lonMin: -10, lonMax: 45, density: 90 },
      { latMin: 15, latMax: 50, lonMin: 40, lonMax: 125, density: 140 },
      { latMin: -10, latMax: 20, lonMin: 95, lonMax: 140, density: 70 },
      { latMin: 25, latMax: 55, lonMin: -125, lonMax: -70, density: 110 },
      { latMin: -35, latMax: 10, lonMin: -75, lonMax: -35, density: 90 },
      { latMin: -30, latMax: 35, lonMin: -15, lonMax: 50, density: 80 }
    ];

    continents.forEach(c => {
      for (let i = 0; i < c.density; i++) {
        const lat = c.latMin + Math.random() * (c.latMax - c.latMin);
        const lon = c.lonMin + Math.random() * (c.lonMax - c.lonMin);
        seedPoints.push({
          lat,
          lon,
          size: 1.4 + Math.random() * 2.2,
          isRuby: Math.random() > 0.45,
          phase: Math.random() * Math.PI * 2
        });
      }
    });

    // Pomegranate Calyx Crown at top pole (lat 82° to 90°)
    const crownPoints = [];
    const crownPeaks = 5;
    for (let i = 0; i < crownPeaks; i++) {
      const angle = (i / crownPeaks) * 360;
      crownPoints.push({ lat: 88, lon: angle, peak: true });
      crownPoints.push({ lat: 83, lon: angle + 360 / (crownPeaks * 2), peak: false });
    }

    let time = 0;
    function render() {
      requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.02;

      if (!isDragging) {
        velY = velY * 0.96 + 0.0035 * 0.04;
        velX *= 0.94;
        rotY += velY;
        rotX += velX;
      }

      ctx.clearRect(0, 0, width, height);

      // Atmosphere glow in Logo Pomegranate Wine (#762638) + Amber (#feb900)
      const radGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.45);
      radGlow.addColorStop(0, 'rgba(118, 38, 56, 0.28)');
      radGlow.addColorStop(0.5, 'rgba(189, 106, 75, 0.12)');
      radGlow.addColorStop(0.8, 'rgba(254, 185, 0, 0.06)');
      radGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // Sphere base: Rich Royal Pomegranate (#762638) with 3D depth lighting
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#99354b');   // warm ruby crest
      sphereGrad.addColorStop(0.35, '#762638'); // core logo burgundy
      sphereGrad.addColorStop(0.75, '#561624'); // deep wine
      sphereGrad.addColorStop(1, '#3b0d18');    // dark rich shadow

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(118, 38, 56, 0.35)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 16;
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
      sheenGrad.addColorStop(0.4, 'rgba(254, 185, 0, 0.15)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.arc(cx - radius * 0.38, cy - radius * 0.38, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Outer rim in warm copper/gold
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
        ctx.strokeStyle = lat === 0 ? 'rgba(254, 185, 0, 0.65)' : 'rgba(254, 215, 120, 0.22)';
        ctx.lineWidth = lat === 0 ? 1.5 : 0.8;
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
        ctx.strokeStyle = (lon % 90 === 0) ? 'rgba(254, 185, 0, 0.45)' : 'rgba(189, 106, 75, 0.25)';
        ctx.lineWidth = (lon % 90 === 0) ? 1.2 : 0.7;
        ctx.stroke();
      }
      ctx.restore();

      // Pomegranate Calyx Crown at top pole (rich gold with ruby/copper fill)
      ctx.save();
      ctx.beginPath();
      let crownStarted = false;
      const sortedCrown = [...crownPoints, crownPoints[0]];
      sortedCrown.forEach(cp => {
        const p3d = latLonTo3D(cp.lat, cp.lon, radius * 1.05);
        const p2d = project(p3d.x, p3d.y, p3d.z);
        if (p2d.z > -radius * 0.5) {
          if (!crownStarted) {
            ctx.moveTo(p2d.x, p2d.y);
            crownStarted = true;
          } else {
            ctx.lineTo(p2d.x, p2d.y);
          }
        }
      });
      ctx.strokeStyle = '#feb900';
      ctx.lineWidth = 2.4;
      ctx.fillStyle = 'rgba(189, 106, 75, 0.6)';
      ctx.stroke();
      ctx.fill();
      ctx.restore();

      // Pomegranate Seed Particle Clusters on Continents
      seedPoints.forEach(sp => {
        const p3d = latLonTo3D(sp.lat, sp.lon, radius);
        const p2d = project(p3d.x, p3d.y, p3d.z);
        if (p2d.z > -20) {
          const depthAlpha = Math.max(0.12, (p2d.z + radius) / (radius * 2));
          const pulse = 0.8 + 0.3 * Math.sin(time * 2 + sp.phase);
          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, sp.size * p2d.scale * pulse, 0, Math.PI * 2);
          if (sp.isRuby) {
            ctx.fillStyle = `rgba(189, 106, 75, ${depthAlpha * 0.95})`; // Logo copper #bd6a4b
          } else {
            ctx.fillStyle = `rgba(254, 185, 0, ${depthAlpha * 0.95})`;  // Logo gold #feb900
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

          const photonT = (time * 0.6 + idx * 0.23) % 1;
          const photonIdx = Math.floor(photonT * steps);
          const photonPt = arc2D[photonIdx];
          if (photonPt && photonPt.z > 0) {
            ctx.beginPath();
            ctx.arc(photonPt.x, photonPt.y, 3.5 * photonPt.scale, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#feb900';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Trade Hubs Pins
      hubs.forEach((hub) => {
        const p3d = latLonTo3D(hub.lat, hub.lon, radius);
        const p2d = project(p3d.x, p3d.y, p3d.z);

        if (p2d.z > 0) {
          const isHQ = hub.isHQ;

          if (isHQ) {
            const pulseR = 8 + (Math.sin(time * 3) + 1) * 7;
            ctx.beginPath();
            ctx.arc(p2d.x, p2d.y, pulseR * p2d.scale, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(254, 185, 0, ${0.9 - pulseR / 24})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, (isHQ ? 6 : 3.8) * p2d.scale, 0, Math.PI * 2);
          ctx.fillStyle = isHQ ? '#feb900' : '#ffffff';
          ctx.shadowColor = isHQ ? '#feb900' : 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(p2d.x, p2d.y, 2 * p2d.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#762638';
          ctx.fill();

          if (isHQ || hub.name === "Singapore" || hub.name === "Rotterdam" || hub.name === "Santos") {
            ctx.font = `700 ${Math.round(11 * p2d.scale)}px sans-serif`;
            ctx.fillStyle = isHQ ? '#feb900' : '#ffffff';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            ctx.shadowBlur = 4;
            ctx.fillText(hub.name, p2d.x + 8, p2d.y + 4);
            ctx.shadowBlur = 0;
          }
        }
      });

      // Tilted Golden Equator Ring
      ctx.save();
      const ringTilt = 0.35;
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
      ctx.restore();
    }

    render();
  }

  initNaragroGlobe();

  window.addEventListener('load', () => {
    aos_init();
  });

});