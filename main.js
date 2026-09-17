document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------------
  // 1. Mobile Menu Drawer & Navbar Scroll Compression / Expand
  // -----------------------------------------------------------
  const freehandNavbar = document.querySelector(".freehand-navbar");
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileSheet = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-close-btn");
  const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-signin, .mobile-sublink");

  const SCROLL_THRESHOLD = 60;
  let scrollPosAtExpand = 0;

  function openMobileMenu() {
    if (!burgerBtn || !mobileOverlay) return;
    burgerBtn.setAttribute("aria-expanded", "true");
    burgerBtn.classList.add("is-active");
    mobileOverlay.removeAttribute("hidden");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!burgerBtn || !mobileOverlay) return;
    burgerBtn.setAttribute("aria-expanded", "false");
    burgerBtn.classList.remove("is-active");
    mobileOverlay.setAttribute("hidden", "");
    document.body.classList.remove("menu-open");
  }

  function expandDesktopNavbar() {
    if (!freehandNavbar) return;
    freehandNavbar.classList.add("expanded");
    freehandNavbar.removeAttribute("title");
    if (burgerBtn) {
      burgerBtn.setAttribute("aria-expanded", "true");
      burgerBtn.classList.add("is-active");
    }
    scrollPosAtExpand = window.scrollY;
  }

  function collapseDesktopNavbar() {
    if (!freehandNavbar) return;
    freehandNavbar.classList.remove("expanded");
    if (freehandNavbar.classList.contains("compressed")) {
      freehandNavbar.setAttribute("title", "Click to open menu");
    } else {
      freehandNavbar.removeAttribute("title");
    }
    if (burgerBtn) {
      burgerBtn.setAttribute("aria-expanded", "false");
      burgerBtn.classList.remove("is-active");
    }
  }

  // Handle burger button click
  if (burgerBtn) {
    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 860) {
        const isExpanded = burgerBtn.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      } else {
        // Desktop
        if (freehandNavbar && freehandNavbar.classList.contains("compressed")) {
          if (freehandNavbar.classList.contains("expanded")) {
            collapseDesktopNavbar();
          } else {
            expandDesktopNavbar();
          }
        }
      }
    });
  }

  // If user clicks the compressed floating circular icon
  if (freehandNavbar) {
    freehandNavbar.addEventListener("click", (e) => {
      if (freehandNavbar.classList.contains("compressed") && !freehandNavbar.classList.contains("expanded")) {
        if (window.innerWidth <= 860) {
          openMobileMenu();
        } else {
          expandDesktopNavbar();
        }
      }
    });
  }

  // Click outside expanded desktop navbar to collapse
  document.addEventListener("click", (e) => {
    if (
      freehandNavbar &&
      freehandNavbar.classList.contains("expanded") &&
      !freehandNavbar.contains(e.target)
    ) {
      collapseDesktopNavbar();
    }
  });

  // Clicking links inside desktop navbar collapses it
  const desktopInteractiveLinks = document.querySelectorAll(
    ".freehand-nav-link, .dropdown-row, .btn-orange-demo, .freehand-brand"
  );
  desktopInteractiveLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (freehandNavbar && freehandNavbar.classList.contains("expanded")) {
        collapseDesktopNavbar();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (freehandNavbar && freehandNavbar.classList.contains("expanded")) {
        collapseDesktopNavbar();
      }
      if (burgerBtn?.getAttribute("aria-expanded") === "true") {
        closeMobileMenu();
      }
    }
  });

  // Mobile Accordions Toggle (Services, Process, Products)
  const accordionToggles = document.querySelectorAll(".mobile-accordion-toggle");
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentItem = toggle.closest(".mobile-accordion-item");
      if (!parentItem) return;
      
      const isOpen = parentItem.classList.contains("open");
      document.querySelectorAll(".mobile-accordion-item").forEach((it) => {
        if (it !== parentItem) it.classList.remove("open");
      });

      parentItem.classList.toggle("open", !isOpen);
    });
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMobileMenu();
    } else {
      collapseDesktopNavbar();
    }
  });

  // -----------------------------------------------------------
  // 2. Nav Active State & Scroll-Spy
  // -----------------------------------------------------------
  const desktopLinks = document.querySelectorAll(".freehand-nav-link, .nav-link");
  const mobNavLinks = document.querySelectorAll(".mobile-link");
  const allNavAnchors = [...desktopLinks, ...mobNavLinks];

  function setActiveAnchor(hash) {
    desktopLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });
    mobNavLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });
  }

  desktopLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      setActiveAnchor(hash);
    });
  });

  mobNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      setActiveAnchor(hash);
    });
  });

  // Scroll spy based on sections & navbar compression with requestAnimationFrame ticking
  let isScrollTicking = false;

  function handleScrollUpdate() {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;

    if (freehandNavbar) {
      freehandNavbar.classList.toggle("scrolled", window.scrollY > 20);

      if (isScrolled) {
        if (!freehandNavbar.classList.contains("compressed")) {
          freehandNavbar.classList.add("compressed");
          if (!freehandNavbar.classList.contains("expanded")) {
            freehandNavbar.setAttribute("title", "Click to open menu");
          }
        }
        // Auto-collapse expanded navbar if user scrolls more than 100px away from expand point
        if (
          freehandNavbar.classList.contains("expanded") &&
          Math.abs(window.scrollY - scrollPosAtExpand) > 100
        ) {
          collapseDesktopNavbar();
        }
      } else {
        // Back to top: restore full navbar
        freehandNavbar.classList.remove("compressed");
        freehandNavbar.removeAttribute("title");
        collapseDesktopNavbar();
      }
    }

    const spySections = document.querySelectorAll(
      "section[id], header[id], .hero-content[id], .stats-footer[id], footer[id]"
    );
    const scrollPos = window.scrollY + 220;
    let currentId = "home";

    spySections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.id;
      }
    });

    // Special check for bottom of page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      currentId = "contact";
    }

    if (currentId) {
      setActiveAnchor(`#${currentId}`);
    }
  }

  window.addEventListener("scroll", () => {
    if (!isScrollTicking) {
      window.requestAnimationFrame(() => {
        handleScrollUpdate();
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });


  // -----------------------------------------------------------
  // 3. Stats Count-Up Animation
  // -----------------------------------------------------------
  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  const statItems = document.querySelectorAll(".stat-item");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statItems.forEach((item, i) => {
      if (!item.dataset.target) return;
      const target = parseFloat(item.dataset.target || "0");
      const suffix = item.dataset.suffix || "";
      const decimals = parseInt(item.dataset.decimals || "0", 10);
      const valueEl = item.querySelector(".stat-value");
      if (!valueEl) return;

      const duration = 1500 + i * 80;
      const startOffset = 480 + i * 90;

      setTimeout(() => {
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          const currentVal = eased * target;

          valueEl.textContent = currentVal.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            valueEl.textContent = target.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(update);
      }, startOffset);
    });
  }

  const statsFooter = document.querySelector(".stats-footer");
  if (statsFooter && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsFooter);
  } else {
    // Fallback if IntersectionObserver is unsupported
    setTimeout(animateStats, 300);
  }


  // -----------------------------------------------------------
  // 5. Expandable Back-to-Top Button
  // -----------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // -----------------------------------------------------------
  // 6. Interactive Services & Process Section (Image 2 Replica)
  // -----------------------------------------------------------
  const stepCards = document.querySelectorAll(".interactive-step-card");
  const domainTabs = document.querySelectorAll(".domain-tab-item");

  function activateCard(stepNum) {
    stepCards.forEach((c) => {
      c.classList.toggle("active", c.dataset.step === String(stepNum));
    });

    domainTabs.forEach((tab) => {
      const targetCard = tab.dataset.card;
      if (targetCard === String(stepNum)) {
        domainTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      }
    });
  }

  let hoverTimeout = null;

  stepCards.forEach((card) => {
    card.addEventListener("click", () => {
      clearTimeout(hoverTimeout);
      const step = card.dataset.step;
      activateCard(step);
    });

    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 960) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          const step = card.dataset.step;
          activateCard(step);
        }, 50);
      }
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
    });
  });

  domainTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      domainTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const targetCard = tab.dataset.card;
      if (targetCard) {
        activateCard(targetCard);
      }
    });
  });

  // Connect dropdown items and mobile sublinks to activate corresponding card
  document.querySelectorAll(".dropdown-row[data-card], .mobile-sublink[data-card]").forEach((item) => {
    item.addEventListener("click", () => {
      const targetCard = item.dataset.card;
      if (targetCard) {
        activateCard(targetCard);
      }
    });
  });
});
