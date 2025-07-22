document.addEventListener("DOMContentLoaded", () => {
  const navbarPromise = fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      const navbar = document.getElementById("navbar");
      if (navbar) navbar.innerHTML = data;
    });

  const footerPromise = fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    });

  const blogPromise = fetch("blog.html")
    .then((res) => res.text())
    .then((data) => {
      const blogs = document.getElementById("blog");
      if (blogs) blogs.innerHTML = data;
    });

  const newsletterPromise = fetch("newsletter.html")
    .then((res) => res.text())
    .then((data) => {
      const newsletter = document.getElementById("newsletter");
      if (newsletter) newsletter.innerHTML = data;
    });

  Promise.all([navbarPromise, footerPromise, blogPromise, newsletterPromise]).then(() => {
    AOS.init({ once: true, duration: 2000 });

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("close-sidebar");
    const overlay = document.getElementById("overlay");

    if (menuToggle && sidebar && closeSidebar && overlay) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
      });

      const closeMenu = () => {
        sidebar.classList.add("translate-x-full");
        overlay.classList.add("hidden");
      };

      closeSidebar.addEventListener("click", closeMenu);
      overlay.addEventListener("click", closeMenu);
    }

    // ✅ HERO CAROUSEL (only if elements exist)
    const track = document.getElementById("carousel-track");
    const titleEl = document.getElementById("hero-title");
    const subtitleEl = document.getElementById("hero-subtitle");
    const descEl = document.getElementById("hero-desc");

    if (track && titleEl && subtitleEl && descEl) {
      const slides = track.children;
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slides.length - 1].cloneNode(true);
      track.appendChild(firstClone);
      track.insertBefore(lastClone, slides[0]);

      const updatedSlides = track.children;
      const totalSlides = updatedSlides.length;
      let currentIndex = 1;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      function updateText() {
        const currentSlide = updatedSlides[currentIndex];
        titleEl.innerText = currentSlide.getAttribute("data-title") || "";
        subtitleEl.innerHTML = `
          ${currentSlide.getAttribute("data-subtitle") || ""}
          <span class="text-[#EF3A6B]">${currentSlide.getAttribute("data-highlight") || ""}</span> Gifts
        `;
        descEl.innerText = currentSlide.getAttribute("data-desc") || "";
      }

      function updateSlidePosition(withTransition = true) {
        track.style.transition = withTransition ? "transform 0.7s ease-in-out" : "none";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateText();
      }

      track.addEventListener("transitionend", () => {
        if (currentIndex === totalSlides - 1) {
          currentIndex = 1;
          updateSlidePosition(false);
        } else if (currentIndex === 0) {
          currentIndex = totalSlides - 2;
          updateSlidePosition(false);
        }
      });

      document.getElementById("nextBtn")?.addEventListener("click", () => {
        if (currentIndex >= totalSlides - 1) return;
        currentIndex++;
        updateSlidePosition();
      });

      document.getElementById("prevBtn")?.addEventListener("click", () => {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateSlidePosition();
      });

      setInterval(() => {
        currentIndex = currentIndex >= totalSlides - 1 ? 1 : currentIndex + 1;
        updateSlidePosition();
      }, 5000);

      updateText();
    }

    // ✅ POPUP FIX
    const contactModal = document.getElementById("contact-modal");
    const getInTouchBtn = document.getElementById("get-in-touch-btn");
    const getInTouchBtnSidebar = document.getElementById("get-in-touch-btn-sidebar");
    const closeModal = document.getElementById("close-modal");

    getInTouchBtn?.addEventListener("click", () => contactModal?.classList.remove("hidden"));
    getInTouchBtnSidebar?.addEventListener("click", () => contactModal?.classList.remove("hidden"));
    closeModal?.addEventListener("click", () => contactModal?.classList.add("hidden"));
    contactModal?.addEventListener("click", (e) => {
      if (e.target === contactModal) contactModal.classList.add("hidden");
    });

    // ✅ YOUTUBE POPUP
    const openBtn = document.getElementById("openVideoBtn");
    const closeBtn = document.getElementById("closeVideoBtn");
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeIframe");
    const YOUTUBE_VIDEO_ID = "D0UnqGm_miA";

    openBtn?.addEventListener("click", () => {
      if (iframe && modal) {
        iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;
        modal.classList.remove("hidden");
      }
    });

    closeBtn?.addEventListener("click", () => {
      if (iframe && modal) {
        modal.classList.add("hidden");
        iframe.src = "";
      }
    });

    // ✅ BLOG CAROUSEL FIX
    const carousel = document.getElementById("blogCarousel");
    const slide = carousel?.children || [];

    if (carousel && slide.length > 0) {
      const firstClone = slide[0].cloneNode(true);
      const lastClone = slide[slide.length - 1].cloneNode(true);
      carousel.appendChild(firstClone);
      carousel.insertBefore(lastClone, slide[0]);

      const updatedSlides = carousel.children;
      const totalSlides = updatedSlides.length;
      let index = 1;
      carousel.style.transform = `translateX(-${index * 100}%)`;

      function moveSlide(withTransition = true) {
        carousel.style.transition = withTransition ? "transform 0.7s ease-in-out" : "none";
        carousel.style.transform = `translateX(-${index * 100}%)`;
      }

      carousel.addEventListener("transitionend", () => {
        if (index === totalSlides - 1) {
          index = 1;
          moveSlide(false);
        } else if (index === 0) {
          index = totalSlides - 2;
          moveSlide(false);
        }
      });

      document.getElementById("nextSlide")?.addEventListener("click", () => {
        if (index >= totalSlides - 1) return;
        index++;
        moveSlide();
      });

      document.getElementById("prevSlide")?.addEventListener("click", () => {
        if (index <= 0) return;
        index--;
        moveSlide();
      });

      setInterval(() => {
        index = index >= totalSlides - 1 ? 1 : index + 1;
        moveSlide();
      }, 5000);
    }

    setTimeout(() => AOS.refresh(), 100);
  });
});
