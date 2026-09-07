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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
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

  window.addEventListener('load', () => {
    aos_init();
  });

});