(() => {
  const grid = document.getElementById("photo-grid");
  const lightbox = document.getElementById("photo-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const counter = document.getElementById("lightbox-counter");
  const closeButton = document.getElementById("lightbox-close");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");
  let rendered = false, currentIndex = 0;
  const photos = Array.from({ length: 12 }, (_, i) => ({
    src: `assets/photos/anh${i + 1}.jpg`,
    alt: `Kỷ niệm ${i + 1}`
  }));

  window.renderGallery = function() {
    if (rendered) return;
    rendered = true;
    photos.forEach((photo, index) => {
      const frame = document.createElement("button");
      frame.type = "button";
      frame.className = "polaroid";
      frame.style.setProperty("--tilt", `${[-2, 1.5, -1, 2, -.7, 1.2][index % 6]}deg`);
      frame.setAttribute("aria-label", `Mở ảnh ${index + 1}`);
      const tape = document.createElement("span");
      tape.className = "tape";
      tape.setAttribute("aria-hidden", "true");
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.onerror = () => {
        img.removeAttribute("src");
        img.alt = `Chưa thêm file ${photo.src}`;
        img.classList.add("missing-photo");
        img.style.objectFit = "contain";
        img.style.padding = "14px";
        const placeholder = document.createElement("div");
        placeholder.style.cssText = "height:220px;display:grid;place-items:center;text-align:center;color:#b28a93;font:1.1rem Caveat;background:#f4eeea;padding:10px";
        placeholder.textContent = `Add ${photo.src}`;
        frame.insertBefore(placeholder, frame.querySelector(".photo-number"));
      };
      const number = document.createElement("span");
      number.className = "photo-number";
      number.textContent = `memory no. ${String(index + 1).padStart(2, "0")}`;
      frame.append(tape, img, number);
      frame.addEventListener("click", () => openLightbox(index));
      grid.appendChild(frame);
    });
  };

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function updateLightbox() {
    lightboxImage.src = photos[currentIndex].src;
    lightboxImage.alt = photos[currentIndex].alt;
    counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }
  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  }
  function move(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    updateLightbox();
  }
  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });
})();
