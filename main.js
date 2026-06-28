(function () {
  var DABAFOOD_WHATSAPP = "2250719076206";

  // Mettre à jour l'année dans le footer
  document.getElementById("year").textContent = new Date().getFullYear();

  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("opacity-0");
      setTimeout(function () {
        loader.remove();
      }, 750);
    }
  });

  function createEmbers() {
    var container = document.getElementById("embers-container");
    if (!container) return;

    var count = 25;
    for (var i = 0; i < count; i++) {
      var ember = document.createElement("div");
      ember.className =
        "absolute bg-gradient-to-t from-kedjenou to-cacao rounded-full pointer-events-none";

      var size = Math.random() * 3.5 + 1.5;
      ember.style.width = size + "px";
      ember.style.height = size + "px";

      ember.style.left = Math.random() * 100 + "%";
      ember.style.bottom = "-" + Math.random() * 20 + "px";

      var duration = Math.random() * 12 + 10;
      var delay = Math.random() * -22;

      ember.style.animation = "floatUp " + duration + "s linear infinite";
      ember.style.animationDelay = delay + "s";

      var drift = Math.random() * 80 - 40 + "px";
      ember.style.setProperty("--drift", drift);

      container.appendChild(ember);
    }
  }
  createEmbers();

  window.addEventListener("scroll", function () {
    var scrollProgress = document.getElementById("scroll-progress");
    if (!scrollProgress) return;
    var winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });

  var header = document.querySelector("header");
  var heroBg = document.getElementById("hero-bg");

  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.remove("bg-transparent", "py-5");
      header.classList.add(
        "bg-ebene/85",
        "backdrop-blur-md",
        "border-b",
        "border-cacao/10",
        "py-4",
        "shadow-xl",
      );
    } else {
      header.classList.remove(
        "bg-ebene/85",
        "backdrop-blur-md",
        "border-b",
        "border-cacao/10",
        "py-4",
        "shadow-xl",
      );
      header.classList.add("bg-transparent", "py-5");
    }

    if (heroBg && scrollY < window.innerHeight) {
      var offset = scrollY * 0.25;
      heroBg.style.transform = "translateY(" + offset + "px) scale(1.05)";
    }
  });

  var menuBtn = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var mobileLinks = document.querySelectorAll(".mobile-link");
  var openIcon = menuBtn.querySelector(".menu-icon-open");
  var closeIcon = menuBtn.querySelector(".menu-icon-close");
  var isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuBtn.setAttribute("aria-expanded", isMenuOpen);

    if (isMenuOpen) {
      mobileMenu.classList.remove("opacity-0", "pointer-events-none");
      mobileMenu.classList.add("opacity-100");
      openIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      mobileMenu.classList.remove("opacity-100");
      mobileMenu.classList.add("opacity-0", "pointer-events-none");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  menuBtn.addEventListener("click", toggleMenu);
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (isMenuOpen) toggleMenu();
    });
  });

  var reveals = document.querySelectorAll("[data-reveal]");
  var observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.08,
  };

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(function (element) {
    revealObserver.observe(element);
  });

  // Soumission du Formulaire de Réservation vers WhatsApp
  var contactForm = document.getElementById("contact-form");
  var formFeedback = document.getElementById("form-feedback");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var nom = document.getElementById("nom").value.trim();
    var tel = document.getElementById("telephone").value.trim();
    var msg = document.getElementById("message").value.trim();

    var textMessage =
      "*Réservation — Table DabaFood*\n\n" +
      "*Nom complet :* " +
      nom +
      "\n" +
      "*Téléphone :* " +
      tel +
      "\n\n" +
      "*Message / Souhaits :*\n" +
      msg;

    var whatsappUrl =
      "https://wa.me/" +
      DABAFOOD_WHATSAPP +
      "?text=" +
      encodeURIComponent(textMessage);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (formFeedback) {
      formFeedback.textContent =
        "WhatsApp s'ouvre dans un nouvel onglet avec votre message. Si rien ne se produit, veuillez vérifier vos permissions ou autoriser les fenêtres pop-up.";
      formFeedback.classList.remove("hidden");
    }

    contactForm.reset();
  });
})();
