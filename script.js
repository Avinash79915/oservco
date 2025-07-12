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

    // ✅ HERO CAROUSEL
    const track = document.getElementById("carousel-track");
    const slides = track.children;
    const totalSlides = slides.length;
    let currentIndex = 0;

    const titleEl = document.getElementById("hero-title");
    const subtitleEl = document.getElementById("hero-subtitle");
    const descEl = document.getElementById("hero-desc");

    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      const currentSlide = slides[currentIndex];
      titleEl.innerText = currentSlide.getAttribute("data-title") || "";
      subtitleEl.innerHTML = `
        ${currentSlide.getAttribute("data-subtitle") || ""} 
        <span class="text-[#EF3A6B]">
          ${currentSlide.getAttribute("data-highlight") || ""}
        </span> Gifts
      `;
      descEl.innerText = currentSlide.getAttribute("data-desc") || "";
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlidePosition();
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    }, 5000);

    updateSlidePosition();

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

    // ✅ BLOG CAROUSEL
    const carousel = document.getElementById("blogCarousel");
    const slide = carousel?.children || [];
    let index = 0;

    document.getElementById("nextSlide")?.addEventListener("click", () => {
      index = (index + 1) % slide.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prevSlide")?.addEventListener("click", () => {
      index = (index - 1 + slide.length) % slide.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    // ✅ Refresh AOS after everything is inserted
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  });
});
