const toggleNav = document.querySelector(".toggle-nav");
const closeNav = document.querySelector(".nav-close");
const mobileMenu = document.querySelector(".mobile-menu");
toggleNav.addEventListener("click", () => {
  mobileMenu.style.left = 0;
});
closeNav.addEventListener("click", () => {
  mobileMenu.style.left = "-100%";
});

const thumbnails = document.querySelectorAll(".thumbnail");
let currentIndex = 0;
const imagesToShow = 3; // Number of images to display at once

// Function to display the current set of images
function showImages(index) {
  // Hide all images initially
  thumbnails.forEach((img) => img.classList.add("hidden"));

  // Show the next set of images based on the index
  for (let i = index; i < index + imagesToShow; i++) {
    if (thumbnails[i]) {
      thumbnails[i].classList.remove("hidden");
    }
  }
}

// Show the first 3 images on load
showImages(currentIndex);

// Function to show the next set of images
function nextImages() {
  currentIndex += imagesToShow;
  if (currentIndex >= thumbnails.length) {
    currentIndex = 0; // Loop back to the start if we reach the end
  }
  showImages(currentIndex);
}

// Function to show the previous set of images
function prevImages() {
  currentIndex -= imagesToShow;
  if (currentIndex < 0) {
    currentIndex = thumbnails.length - imagesToShow; // Loop back to the end if we reach the start
    if (currentIndex < 0) currentIndex = 0; // Ensure index doesn't go negative
  }
  showImages(currentIndex);
}

// Function to display the selected image in the largeimage container
function showSelectedImage(index) {
  // Get the largeimage container
  const largeImage = document.querySelector(".largeimage img");

  // Update the large image src to the clicked thumbnail src
  largeImage.src = thumbnails[index].src;

  // Optionally, you can also update the alt text
  largeImage.alt = thumbnails[index].alt;

  // Calculate the starting index to ensure the clicked image is in the visible set
  currentIndex = Math.floor(index / imagesToShow) * imagesToShow;

  // Show the set of images around the selected image
  showImages(currentIndex);
}

// Attach click event listeners to each thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    showSelectedImage(index);
  });
});
