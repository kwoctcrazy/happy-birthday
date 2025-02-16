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

      // ✅ Ensure animations start immediately!
      animationTimeline();

      // ✅ Start music after a slight delay
      setTimeout(() => {
        document.getElementById("bg-music").play().catch(error => {
          console.log("🔇 Autoplay blocked. Check browser settings.");
        });
      }, 500); // Small delay to allow the page to render first
    });
};

// ✅ Run everything when the page loads
document.addEventListener("DOMContentLoaded", fetchData);
