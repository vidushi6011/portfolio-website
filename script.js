document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && sidebar) {
    // Toggle sidebar
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      
      // Update hamburger icon
      const icon = mobileNavToggle.querySelector('i');
      if (sidebar.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close sidebar when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== mobileNavToggle) {
        sidebar.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // ==========================================
  // TYPEWRITER ANIMATION
  // ==========================================
  const typewriterElement = document.getElementById('typewriter');
  const words = ["Fast Learner.", "Passionate Programmer.", "Systems Engineer.", "Software Developer."];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deleting
    } else {
      // Add character
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // standard typing speed
    }

    // Check if word completed typing
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typewriter
  if (typewriterElement) {
    setTimeout(type, 1000);
  }

  // ==========================================
  // SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  function scrollSpy() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const navLink = document.getElementById(`nav-${sectionId}`);

      if (navLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);
  // Run scrollspy on initial load
  scrollSpy();

  // ==========================================
  // CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission animation
      const submitBtn = contactForm.querySelector('.btn-submit');
      const btnText = submitBtn.querySelector('span');
      const btnIcon = submitBtn.querySelector('i');
      
      btnText.textContent = 'Sending...';
      btnIcon.className = 'fa-solid fa-spinner fa-spin';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Fade out form
        contactForm.classList.add('hidden');
        
        // Show success message
        formSuccess.classList.add('active');
      }, 1500);
    });
  }

});
