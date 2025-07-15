document.addEventListener("DOMContentLoaded", () => {
  const navbarPromise = fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });

  const footerPromise = fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  // Wait for navbar & footer to load, then init everything
  Promise.all([navbarPromise, footerPromise]).then(() => {
    // ✅ AOS Init
    AOS.init({
      once: true,
      duration: 1000,
    });
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("close-sidebar");
    const overlay = document.getElementById("overlay");

    menuToggle.addEventListener("click", () => {
      sidebar.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
    });

    function closeMenu() {
      sidebar.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    }

    closeSidebar.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // ✅ HERO CAROUSEL FIX (Infinite Loop with Clone Slides)
    const track = document.getElementById("carousel-track");
    const titleEl = document.getElementById("hero-title");
    const subtitleEl = document.getElementById("hero-subtitle");
    const descEl = document.getElementById("hero-desc");

    // Clone first and last slides
    const slides = track.children;
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Append/Prepend Clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const updatedSlides = track.children;
    const totalSlides = updatedSlides.length;

    let currentIndex = 1; // Start from first real slide
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update Text Content
    function updateText() {
      const currentSlide = updatedSlides[currentIndex];
      titleEl.innerText = currentSlide.getAttribute("data-title") || "";
      subtitleEl.innerHTML = `
    ${currentSlide.getAttribute("data-subtitle") || ""} 
    <span class="text-[#EF3A6B]">
      ${currentSlide.getAttribute("data-highlight") || ""}
    </span> Gifts
  `;
      descEl.innerText = currentSlide.getAttribute("data-desc") || "";
    }

    // Slide Movement
    function updateSlidePosition(withTransition = true) {
      track.style.transition = withTransition
        ? "transform 0.7s ease-in-out"
        : "none";
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateText();
    }

    // Reset Position After Transition End
    track.addEventListener("transitionend", () => {
      if (currentIndex === totalSlides - 1) {
        currentIndex = 1;
        updateSlidePosition(false);
      } else if (currentIndex === 0) {
        currentIndex = totalSlides - 2;
        updateSlidePosition(false);
      }
    });

    // Button Controls
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (currentIndex >= totalSlides - 1) return;
      currentIndex++;
      updateSlidePosition();
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      updateSlidePosition();
    });

    // Auto Slide Every 5s
    setInterval(() => {
      currentIndex++;
      updateSlidePosition();
    }, 5000);

    // Initialize Text
    updateText();

    // ✅ YOUTUBE POPUP
    const openBtn = document.getElementById("openVideoBtn");
    const closeBtn = document.getElementById("closeVideoBtn");
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeIframe");
    const YOUTUBE_VIDEO_ID = "D0UnqGm_miA";

    openBtn?.addEventListener("click", () => {
      iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;
      modal.classList.remove("hidden");
    });

    closeBtn?.addEventListener("click", () => {
      modal.classList.add("hidden");
      iframe.src = "";
    });

    // ✅ BLOG CAROUSEL FIX (Seamless Loop)
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
        carousel.style.transition = withTransition
          ? "transform 0.7s ease-in-out"
          : "none";
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
    }

    // ✅ Refresh AOS after everything is inserted
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  });
});
