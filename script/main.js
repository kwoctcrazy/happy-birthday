const fetchData = () => {
  fetch("customize.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          if (key === "imagePath") {
            document.querySelector(`[data-node-name*="${key}"]`).setAttribute("src", data[key]);
          } else if (key === "musicPath") {
            document.getElementById("bg-music").src = data[key]; // Set music file
          } else {
            document.querySelector(`[data-node-name*="${key}"]`).innerText = data[key];
          }
        }
      });

      // ✅ Ensure animations start first!
      animationTimeline();

      // ✅ Start background music in parallel!
      setTimeout(playBackgroundMusic, 500); // Small delay to avoid blocking animations
    });
};

// 🔥 Function to play background music
const playBackgroundMusic = () => {
  const audio = document.getElementById("bg-music");

  // Try to play immediately
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => console.log("🎶 Music started playing"))
      .catch(() => {
        console.log("🚫 Autoplay blocked. Waiting for user interaction...");
        
        // Play music on first user interaction (but animations are already running)
        document.addEventListener("click", () => {
          audio.play();
          console.log("🎵 Music started after user interaction.");
        }, { once: true });
      });
  }
};

// ✅ Run everything when the page loads
document.addEventListener("DOMContentLoaded", fetchData);
