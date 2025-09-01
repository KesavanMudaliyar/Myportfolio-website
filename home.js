// home.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Vanta.js background effect
  VANTA.DOTS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x20ff93,
    color2: 0xdb2f77,
    backgroundColor: 0x2d2d36,
    size: 2.40,
    spacing: 54.00
  });
  
  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if(target) {
        e.preventDefault();
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        
        // Calculate the target position considering the fixed header
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
  
  // Typewriter effect for the introduction
  function typeWriter() {
    const textElement = document.getElementById('typewriter');
    const fullText = "Hello!!, I'm Kesavan Mudaliyar.";
    const parts = [
      { text: "Hello!!,", delay: 100 },
      { text: " I'm", delay: 2000 },
      { text: " Kesavan Mudaliyar.", delay: 1000 }
    ];
    
    let partIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    
    function type() {
      if (partIndex >= parts.length) {
        // Add blinking cursor after finishing
        textElement.innerHTML = fullText + '<span class="typewriter-cursor"></span>';
        
        // After 5 minutes, restart the animation
        setTimeout(() => {
          partIndex = 0;
          charIndex = 0;
          currentText = "";
          isDeleting = false;
          type();
        }, 300000); // 5 minutes (300000ms)
        
        return;
      }
      
      const currentPart = parts[partIndex];
      
      if (!isDeleting && charIndex < currentPart.text.length) {
        // Typing
        currentText += currentPart.text.charAt(charIndex);
        charIndex++;
        textElement.innerHTML = currentText + '<span class="typewriter-cursor"></span>';
        setTimeout(type, typingDelay);
      } else if (!isDeleting && charIndex === currentPart.text.length) {
        // Pause at the end of typing a part
        if (partIndex < parts.length - 1) {
          setTimeout(() => {
            isDeleting = true;
            setTimeout(type, deletingDelay);
          }, currentPart.delay);
        } else {
          // Last part - don't delete, just finish
          partIndex++;
          setTimeout(type, currentPart.delay);
        }
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        currentText = currentText.substring(0, currentText.length - 1);
        charIndex--;
        textElement.innerHTML = currentText + '<span class="typewriter-cursor"></span>';
        setTimeout(type, deletingDelay);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next part
        isDeleting = false;
        partIndex++;
        setTimeout(type, typingDelay);
      }
    }
    
    // Start the typewriter effect
    type();
  }
  
  // Animate tagline with sliding effect
  function animateTagline() {
    const leftSlide = document.querySelector('.left-slide');
    const rightSlide = document.querySelector('.right-slide');
    
    // Animate left part
    setTimeout(() => {
      leftSlide.style.opacity = '1';
      leftSlide.style.transform = 'translateY(0)';
      leftSlide.style.transition = 'all 0.8s ease-out';
    }, 500);
    
    // Animate right part with delay
    setTimeout(() => {
      rightSlide.style.opacity = '1';
      rightSlide.style.transform = 'translateY(0)';
      rightSlide.style.transition = 'all 0.8s ease-out';
    }, 1500);
  }
  
  // Typewriter effect for mission statement
  function typeMissionStatement() {
    const missionElement = document.getElementById('mission-text');
    const missionText = "With a passion for technology and problem-solving, I create solutions that blend creativity and precision. Explore my work and see how dedication turns ideas into reality.";
    
    let charIndex = 0;
    let typingDelay = 30;
    
    function type() {
      if (charIndex < missionText.length) {
        missionElement.innerHTML += missionText.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      }
    }
    
    // Start typing after tagline animation completes
    setTimeout(type, 2500);
  }
  
  // Initialize all animations
  function initAnimations() {
    typeWriter();
    
    // Start tagline animation after typewriter completes first cycle
    setTimeout(animateTagline, 4500);
    
    // Start mission statement animation after tagline
    setTimeout(typeMissionStatement, 3000);
  }
  
  // Initialize animations
  initAnimations();
  
  // Image upload functionality (for profile picture)
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.addEventListener('click', function() {
      // Create a file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      
      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            profileImg.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
      
      fileInput.click();
    });
    
    // Add hover effect to profile image
    profileImg.style.cursor = 'pointer';
    profileImg.title = 'Click to upload profile picture';
  }
});