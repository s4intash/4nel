(function() {
  const backgroundMusic = document.getElementById("backgroundMusic");
  const musicStatus = document.getElementById("musicStatus");
  
  function updateStatus(message) {
    if (musicStatus) {
      musicStatus.textContent = message;
    }
    console.log(message);
  }

  function startMusic() {
    if (backgroundMusic) {
      updateStatus("🎵 Starting music...");
      backgroundMusic.muted = true;
      backgroundMusic.volume = 0.7;
      backgroundMusic.play().then(() => {
        updateStatus("🎵 Music playing!");
        setTimeout(() => {
          backgroundMusic.muted = false;
        }, 300);
        setTimeout(() => {
          if (musicStatus) {
            musicStatus.style.display = "none";
          }
        }, 3000);
      }).catch(e => {
        updateStatus("❌ Music blocked: " + e.message);
        console.log("Music play failed:", e);
      });
    }
  }

  updateStatus("🎵 Attempting autoplay...");
  startMusic();

  setTimeout(startMusic, 100);
  setTimeout(startMusic, 500);
  setTimeout(startMusic, 1000);
  setTimeout(startMusic, 2000);
  setTimeout(startMusic, 3000);
  setTimeout(startMusic, 5000);

  window.addEventListener("load", startMusic);
  
  window.addEventListener("pageshow", startMusic);
  
  window.addEventListener("focus", startMusic);
  
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      startMusic();
    }
  });

  const musicInterval = setInterval(() => {
    if (backgroundMusic && backgroundMusic.paused) {
      startMusic();
    }
  }, 2000);
})();

document.addEventListener("DOMContentLoaded", () => {
  const revealBtn = document.getElementById("revealBtn");
  
  if (!revealBtn) return;

  // Keep button raised immediately on load to avoid hover flicker
  revealBtn.classList.add('raised');

  // If previously revealed, skip landing and show next page immediately
  if (sessionStorage.getItem('revealed') === '1') {
    proceedToNext();
    return;
  }

  // Click reveals and persists state
  revealBtn.addEventListener("click", function () {
    sessionStorage.setItem('revealed', '1');
    proceedToNext();
  }, { once: true });

  function proceedToNext() {
    document.body.classList.remove('front');
    try { if (revealBtn) revealBtn.remove(); } catch (_) {}
    const title = document.getElementById("title");
    const note = document.getElementById("note");
    const letter = document.getElementById("letter");
    const bottom = document.getElementById("bottom");
    const photos = document.getElementById("photos");

    if (title) {
      title.style.display = "none";
    }
    if (note) {
      note.style.display = "none";
    }
    if (letter) {
      letter.classList.add("show");
      letter.style.display = "block";
      letter.style.opacity = "1";
      letter.style.transform = "translateY(0) scale(1)";
    }
    if (bottom) {
      bottom.classList.add("show");
      bottom.style.opacity = "1";
      bottom.style.transform = "translateY(0)";
    }
    if (photos) {
      photos.classList.add("show");
      photos.style.opacity = "1";
      photos.style.transform = "translateY(0)";
    }
  }


  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach((card, index) => {
    card.style.setProperty('--no-heart', '1');
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-20px) scale(1.1) rotate(0deg)';
      this.style.boxShadow = '0 35px 80px rgba(139, 92, 246, 0.5)';
    });

    card.addEventListener('mouseleave', function() {
      const isLeft = this.classList.contains('tilt-l');
      this.style.transform = isLeft 
        ? 'translateY(0) scale(1) rotate(-4deg)' 
        : 'translateY(0) scale(1) rotate(4deg)';
      this.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.25)';
    });

    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-25px) scale(1.15) rotate(0deg)';
      
      setTimeout(() => {
        this.style.transform = 'translateY(-20px) scale(1.1) rotate(0deg)';
      }, 200);
    });
  });


  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.letter, .photo-page, .bottom-note');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (revealBtn.style.display !== 'none') {
        revealBtn.click();
      }
    }
  });

  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && revealBtn.style.display !== 'none') {
        revealBtn.click();
      }
    }
  }

  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  setTimeout(() => {
    const title = document.getElementById("title");
    if (title) {
      const originalText = title.textContent;
      typeWriter(title, originalText, 150);
    }
  }, 500);
});
