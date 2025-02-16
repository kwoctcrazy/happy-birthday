const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          if (key === "imagePath") {
            document.querySelector(`[data-node-name*="${key}"]`).setAttribute("src", data[key]);
          } else if (key === "musicPath") {
            const audio = document.getElementById("bg-music");
            audio.src = data[key];
          } else {
            document.querySelector(`[data-node-name*="${key}"]`).innerText = data[key];
          }
        }
      });

      // Run animations after data is loaded
      animationTimeline();
    });
};

// Autoplay music handling
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");

  // Try to play immediately
  audio.play().catch(() => {
    console.log("Autoplay blocked. Waiting for user interaction.");

    // Play on first user interaction
    document.body.addEventListener("click", () => {
      audio.play();
    }, { once: true });
  });
});
