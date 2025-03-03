// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  const loginContainer = document.getElementById('login-container');
  const loginBox = document.querySelector('.login-box');
  const mainContent = document.getElementById('main-content');
  const loginForm = document.getElementById('login-form');
  const loginLink = document.getElementById('login-link');
  const logoutBtn = document.getElementById('logout-btn');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('.section');
  const skillBars = document.querySelectorAll('.skill-progress');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const copyPhoneBtn = document.getElementById('copy-phone');
  const copyEmailBtn = document.getElementById('copy-email');
  const messageForm = document.getElementById('message-form');
  const projectImgs = document.querySelectorAll('.project-img');

  // Check if user is logged in
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // User is logged in
      if (loginLink) loginLink.classList.add('hidden');
      if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
      // User is not logged in
      if (loginLink) loginLink.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.add('hidden');
    }
  }

  // Show login container
  function showLoginContainer() {
    loginContainer.classList.remove('hidden');
    mainContent.classList.add('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Show main content with animation
  function showMainContent() {
    loginContainer.classList.add('hidden');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('visible');
    document.body.style.overflow = 'auto';
    animateSections();
  }

  // Login Link Click
  if (loginLink) {
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      showLoginContainer();
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Simple validation (in a real app, this would be server-side)
      if (username.trim() !== '' && password.trim() !== '') {
        localStorage.setItem('isLoggedIn', 'true');
        
        // Animate login box before transitioning
        loginBox.classList.add('slide-up');
        
        setTimeout(() => {
          showMainContent();
          checkLoginStatus();
        }, 300);
      } else {
        alert('الرجاء إدخال اسم المستخدم وكلمة المرور');
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      checkLoginStatus();
    });
  }

  // Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Smooth Scrolling for Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        
        // Close mobile menu
        if (nav) {
          nav.classList.remove('active');
        }
        
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Scroll Spy
  window.addEventListener('scroll', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Update active nav link based on scroll position
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Animate elements on scroll
    animateOnScroll();
  });

  // Animate sections when they come into view
  function animateSections() {
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animated');
      }, 300 * index);
    });
  }

  // Animate elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
    
    // Animate skill bars
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        const percentage = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
        bar.style.width = percentage;
      }
    });
    
    // Animate sections
    sections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition && !section.classList.contains('animated')) {
        section.classList.add('animated');
      }
    });
  }

  // Project Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Image Hover Effect
  projectImgs.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.querySelector('.project-overlay').style.opacity = '1';
    });
    
    img.addEventListener('mouseleave', function() {
      this.querySelector('.project-overlay').style.opacity = '0';
    });
  });

  // Copy to Clipboard Functions
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', function() {
      const phoneNumber = document.getElementById('phone-number').textContent;
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          alert('تم نسخ رقم الهاتف بنجاح');
        })
        .catch(err => {
          console.error('فشل في نسخ النص: ', err);
        });
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function() {
      const emailAddress = document.getElementById('email-address').textContent;
      navigator.clipboard.writeText(emailAddress)
        .then(() => {
          alert('تم نسخ البريد الإلكتروني بنجاح');
        })
        .catch(err => {
          console.error('فشل في نسخ النص: ', err);
        });
    });
  }

  // Add animation classes
  const homeText = document.querySelector('.home-text');
  const homeImage = document.querySelector('.home-image');
  
  if (homeText) homeText.classList.add('animate-on-scroll');
  if (homeImage) homeImage.classList.add('animate-on-scroll');
  
  // Create stars for login background
  function createStars() {
    const stars = document.querySelector('.stars');
    if (!stars) return;
    
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = Math.random() * 3 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDuration = Math.random() * 2 + 3 + 's';
      star.style.animationDelay = Math.random() * 5 + 's';
      stars.appendChild(star);
    }
  }
  
  createStars();
  
  // Check login status on page load
  checkLoginStatus();
  
  // Initial animations
  setTimeout(() => {
    animateOnScroll();
  }, 500);
});