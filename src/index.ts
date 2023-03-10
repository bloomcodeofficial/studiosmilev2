const portfolioItems = document.querySelectorAll('[bw-portfolio-element="item"]');
const modal = document.querySelector('[bw-portfolio-element="modal"]');
const modalVideo = document.querySelector('[bw-portfolio-element="modal-video"]');

// Add a button to toggle autoplay
const toggleButton = document.querySelector('[bw-portfolio-element="allow-autoplay"]');

let autoplayEnabled = false;
toggleButton.addEventListener('click', function () {
  autoplayEnabled = !autoplayEnabled;

  portfolioItems.forEach(function (item) {
    const video = item.querySelector('[bw-portfolio-element="video"]');
    video.play();
    video.pause();
  });
});

portfolioItems.forEach(function (item) {
  const video = item.querySelector('[bw-portfolio-element="video"]');
  const thumbnail = item.querySelector('[bw-portfolio-element="thumbnail"]');
  const content = item.querySelector('[bw-portfolio-element="content"]');
  const playButton = item.querySelector('[bw-portfolio-element="play-button"]');

  const fadeInDelay = 100; // 0.1 seconds

  item.addEventListener('mouseenter', function () {
    // Fade out elements and play the video if autoplay is enabled
    if (autoplayEnabled) {
      // Fade out Thumbnail and Content
      thumbnail.style.opacity = 0;
      setTimeout(function () {
        content.style.opacity = 0;
      }, fadeInDelay);

      // Play video
      video.play();

      // Fade out elements and fade in play button if autoplay is disabled
    } else if (!autoplayEnabled) {
      thumbnail.style.opacity = 0;
      setTimeout(function () {
        content.style.opacity = 0;
      }, fadeInDelay);

      // Fade in play button
      playButton.style.opacity = 1;
    }
  });

  item.addEventListener('mouseleave', function () {
    video.pause();
    thumbnail.style.opacity = 1;
    setTimeout(function () {
      content.style.opacity = 1;
    }, fadeInDelay);

    // Fade out play button
    playButton.style.opacity = 0;
  });

  // Add click event listener to open modal
  item.addEventListener('click', function () {
    // Show modal
    modal.style.display = 'flex';
    // Set src of modal video based on src of portfolio item video
    modalVideo.setAttribute('src', video.getAttribute('src'));
    modalVideo.play();
  });
});

// Add click event listener to close modal
modal.addEventListener('click', function (event) {
  if (event.target === modal || event.target.classList.contains('modal-close')) {
    modalVideo.pause();
    modal.style.display = 'none';
  }
});
