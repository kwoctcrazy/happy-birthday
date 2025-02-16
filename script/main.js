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

      // Run animations after loading data
      animationTimeline();

      // Attempt to play music automatically
      playBackgroundMusic();
    });
};

// Function to handle background music
const playBackgroundMusic = () => {
  const audio = document.getElementById("bg-music");

  // Try to play immediately
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => console.log("Music is playing"))
      .catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
        
        // Play music on first user interaction
        document.body.addEventListener("click", () => {
          audio.play();
        }, { once: true });
      });
  }
};

// Load data and start the process
document.addEventListener("DOMContentLoaded", fetchData);
