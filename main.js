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

  revealBtn.addEventListener("click", function() {
    document.body.classList.remove('front');
    console.log("Simple fallback triggered");
    const letter = document.getElementById("letter");
    const title = document.getElementById("title");
    const note = document.getElementById("note");
    const bottom = document.getElementById("bottom");
    const photos = document.getElementById("photos");
    
    if (letter) {
      if (title) title.style.display = "none";
      if (note) note.style.display = "none";
      
      letter.style.display = "block";
      letter.style.opacity = "1";
      letter.classList.add("show");
      
      if (bottom) {
        bottom.classList.add("show");
        bottom.style.display = "block";
        bottom.style.opacity = "1";
      }
      
      if (photos) {
        photos.classList.add("show");
        photos.style.display = "block";
        photos.style.opacity = "1";
      }
      
      console.log("Letter should be visible now!");
      setTimeout(() => { revealBtn.style.display = "none"; }, 0);
    } else {
      console.log("Letter element not found!");
    }
  }, { once: true });


  revealBtn.addEventListener("click", function () {
    document.body.classList.remove('front');
    console.log("Button clicked!"); 
    const title = document.getElementById("title");
    const note = document.getElementById("note");
    const letter = document.getElementById("letter");
    const bottom = document.getElementById("bottom");
    const photos = document.getElementById("photos");

    console.log("Elements found:", {title, note, letter, bottom, photos}); 


    if (title) {
      title.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      title.style.opacity = "0";
      title.style.transform = "translateY(-40px) scale(0.9)";
    }
    
    if (note) {
      note.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      note.style.opacity = "0";
      note.style.transform = "translateY(-30px) scale(0.9)";
    }

    setTimeout(() => {
      console.log("Starting letter reveal..."); 
      
      if (title) title.style.display = "none";
      if (note) note.style.display = "none";

      if (letter) {
        console.log("Showing letter..."); 
        letter.style.display = "block";
        letter.style.opacity = "0";
        letter.style.transform = "translateY(60px) scale(0.95)";
        
        setTimeout(() => {
          letter.classList.add("show");
          letter.style.opacity = "1";
          letter.style.transform = "translateY(0) scale(1)";
          console.log("Letter should be visible now"); 
          
          setTimeout(() => {
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
            
            revealBtn.style.display = "none";
          }, 800);
        }, 150);
      } else {
        console.log("Letter element not found!"); 
      }
    }, 1000);
  }, { once: true });


  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach((card, index) => {
    // Ensure no decorative heart pseudo-element is shown
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
