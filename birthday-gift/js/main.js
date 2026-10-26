(() => {
  const scenes = [...document.querySelectorAll(".scene")];
  const envelope = document.getElementById("open-envelope");

  window.showScene = (id) => {
    scenes.forEach(scene => scene.classList.toggle("active", scene.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "scene-gallery" && window.renderGallery) window.renderGallery();
    if (id === "scene-video" && window.refreshVideoState) window.refreshVideoState();
  };

  const openEnvelope = () => {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    window.setTimeout(() => window.showScene("scene-game"), 1050);
  };
  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
  });

  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => window.showScene(button.dataset.next));
  });
})();
