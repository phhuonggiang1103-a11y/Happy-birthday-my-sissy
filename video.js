(() => {
  const video = document.getElementById("birthday-video");
  const placeholder = document.getElementById("video-placeholder");
  const toTarot = document.getElementById("to-tarot");
  let hasVideo = false;

  window.refreshVideoState = function() {
    // A failed media load means the user has not added the file yet.
    if (!hasVideo) {
      video.load();
    }
  };

  video.addEventListener("loadedmetadata", () => {
    hasVideo = true;
    placeholder.classList.add("hidden");
    video.classList.remove("hidden");
  });
  video.addEventListener("error", () => {
    hasVideo = false;
    placeholder.classList.remove("hidden");
  });
  video.classList.add("hidden");
  toTarot.addEventListener("click", () => window.showScene("scene-tarot"));
})();
