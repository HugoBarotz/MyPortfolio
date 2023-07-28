const jobText2 = document.getElementById('jobText');
  setTimeout(function() {
    jobText.style.opacity = '0';
    setTimeout(function() {
      jobText.textContent = 'Java Developer';
      jobText.style.opacity = '1';
      jobText.classList.add("shimmer");
    }, 1750); // Wait before updating the content
  }, 1000); // Wait before fading out

function displayImage(event) {
    let container = document.getElementById("image-container");
    container.style.display = "block";
    container.style.left = (event.clientX + 20) + "px";
}

function hideImage() {
    document.getElementById("image-container").style.display = "none";
}