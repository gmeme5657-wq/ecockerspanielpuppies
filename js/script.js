// ============================================================================
// eCOCKERSPANIELPUPPIES - MAIN JAVASCRIPT FILE
// ============================================================================

// ============================================================================
// LAZY LOADING IMAGES FOR PERFORMANCE
// ============================================================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================================================
// IMAGE GALLERY & LIGHTBOX
// ============================================================================

class ImageGallery {
  constructor(cardElement) {
    this.card = cardElement;
    this.images = cardElement.dataset.images ? cardElement.dataset.images.split(',') : [];
    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (this.images.length === 0) return;

    // Create image dots
    const dotsContainer = this.card.querySelector('.image-nav');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      this.images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `image-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => this.showImage(idx));
        dotsContainer.appendChild(dot);
      });
    }

    // Gallery navigation
    const prevBtn = this.card.querySelector('.gallery-prev');
    const nextBtn = this.card.querySelector('.gallery-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevImage();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextImage();
      });
    }

    // Lightbox
    const image = this.card.querySelector('.puppy-image');
    if (image) {
      image.addEventListener('click', () => this.openLightbox());
    }
  }

  showImage(index) {
    this.currentIndex = index;
    const image = this.card.querySelector('.puppy-image');
    if (image) {
      image.src = this.images[index];
    }

    // Update dots
    const dots = this.card.querySelectorAll('.image-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage(this.currentIndex);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(this.currentIndex);
  }

  openLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightbox && lightboxImage) {
      lightboxImage.src = this.images[this.currentIndex];
      lightbox.classList.add('active');
      window.currentGallery = this;
    }
  }
}

// Initialize all image galleries
function initializeGalleries() {
  document.querySelectorAll('[data-images]').forEach(card => {
    new ImageGallery(card);
  });
}

// ============================================================================
// LOAD PUPPIES FROM JSON
// ============================================================================

/**
 * Fetches puppies data from /data/puppies.json
 * @returns {Promise<Array>} Array of puppy objects
 */
async function loadPuppies() {
  try {
    const response = await fetch('/data/puppies.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.puppies || [];
  } catch (error) {
    console.error('Error loading puppies:', error);
    return [];
  }
}

/**
 * Renders puppy cards dynamically from JSON data
 * @param {Array} puppies - Array of puppy objects
 */
function renderPuppyCards(puppies) {
  const container = document.getElementById('puppies-grid');
  if (!container) return;

  container.innerHTML = '';

  puppies.forEach(puppy => {
    const galleryImages = (puppy.gallery || [puppy.image]).join(',');
    const tagsHTML = (puppy.tags || [])
      .map(tag => `<span class="tag ${tag === 'Vet Checked' ? 'premium' : ''}">${tag}</span>`)
      .join('');

    const puppyCard = document.createElement('div');
    puppyCard.className = 'puppy-card slide-in';
    puppyCard.dataset.images = galleryImages;
    puppyCard.innerHTML = `
      <div class="puppy-image-container">
        <img src="${puppy.image}" alt="${puppy.name} - ${puppy.gender} Cocker Spaniel" class="puppy-image">
        <div class="gallery-nav">
          <button class="gallery-btn gallery-prev">❮</button>
          <button class="gallery-btn gallery-next">❯</button>
        </div>
        <div class="image-nav"></div>
      </div>
      <div class="puppy-info">
        <div class="puppy-header">
          <div class="puppy-name">${puppy.name}</div>
          <div class="puppy-price">${puppy.price}</div>
        </div>
        <div class="puppy-details">
          <div class="puppy-detail"><strong>Age:</strong> ${puppy.age}</div>
          <div class="puppy-detail"><strong>Gender:</strong> ${puppy.gender}</div>
        </div>
        <div class="puppy-tags">
          ${tagsHTML}
        </div>
        <a href="contact.html" class="btn btn-primary" style="width: 100%; text-align: center;">available</a>
      </div>
    `;

    container.appendChild(puppyCard);

    // Initialize gallery for this card
    new ImageGallery(puppyCard);
  });
}

// Lightbox Controls
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    if (window.currentGallery) {
      window.currentGallery.prevImage();
      document.getElementById('lightbox-image').src = 
        window.currentGallery.images[window.currentGallery.currentIndex];
    }
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    if (window.currentGallery) {
      window.currentGallery.nextImage();
      document.getElementById('lightbox-image').src = 
        window.currentGallery.images[window.currentGallery.currentIndex];
    }
  });
}

// Close lightbox when clicking outside image
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

// Keyboard navigation in lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft' && lightboxPrev) {
    lightboxPrev.click();
  } else if (e.key === 'ArrowRight' && lightboxNext) {
    lightboxNext.click();
  } else if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});

// ============================================================================
// ACCORDION
// ============================================================================

function initializeAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.parentElement;
      const body = accordion.querySelector('.accordion-body');
      const isActive = header.classList.contains('active');

      // Close all accordions
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.parentElement.querySelector('.accordion-body').classList.remove('active');
      });

      // Open clicked accordion
      if (!isActive) {
        header.classList.add('active');
        body.classList.add('active');
      }
    });
  });
}

// ============================================================================
// EMAILJS INTEGRATION - CONTACT FORM HANDLER
// ============================================================================

/**
 * IMPORTANT: Before using this form, you must:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Set up an Email Service and get your SERVICE_ID
 * 3. Create an Email Template and get your TEMPLATE_ID
 * 4. Get your PUBLIC_KEY from Account Settings
 * 5. Replace the placeholder values below with your actual credentials
 */

// ============================================================================
// EMAIL CONFIGURATION - ENTER YOUR CREDENTIALS HERE
// ============================================================================

// YOUR PUBLIC KEY from EmailJS Account Settings
// Navigate to Account > API Keys and copy your Public Key
const EMAILJS_PUBLIC_KEY = 'KLLoEQcxMeM26SdYr';

// YOUR SERVICE ID from EmailJS Email Services
// Create an email service (Gmail, Outlook, etc.) and copy the Service ID
const EMAILJS_SERVICE_ID = 'service_pheqsip';

// YOUR TEMPLATE ID from EmailJS Email Templates
// Create an email template and copy the Template ID
const EMAILJS_TEMPLATE_ID = 'template_hn0017o';

// The email address where inquiries should be sent (from contact.html)
const RECIPIENT_EMAIL = 'martinvictor61rag@gmail.com';

// ============================================================================
// INITIALIZE EMAILJS
// ============================================================================

// Initialize EmailJS with your Public Key - with retry mechanism
function initializeEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('⚠️  EmailJS library not loaded yet, retrying...');
    // Retry after a short delay
    setTimeout(initializeEmailJS, 500);
    return;
  }
  
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
    console.warn('⚠️  EmailJS not configured. Please enter your credentials in script.js');
    return;
  }
  
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✓ EmailJS initialized successfully');
  } catch (error) {
    console.error('✗ Error initializing EmailJS:', error);
    // Retry initialization
    setTimeout(initializeEmailJS, 1000);
  }
}

// Start initialization process
initializeEmailJS();

// ============================================================================
// FORM VALIDATION HELPER FUNCTIONS
// ============================================================================

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format
 * Allows: digits, spaces, dashes, parentheses, plus sign
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format (or empty)
 */
function isValidPhone(phone) {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Shows validation error for a form field
 * @param {HTMLElement} element - Form field element
 * @param {string} message - Error message to display
 */
function showFieldError(element, message) {
  element.classList.add('error');
  element.classList.remove('success');
  
  let errorDiv = element.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains('form-error')) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
  }
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
}

/**
 * Clears validation errors for a form field
 * @param {HTMLElement} element - Form field element
 */
function clearFieldError(element) {
  element.classList.remove('error');
  element.classList.add('success');
  
  let errorDiv = element.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains('form-error')) {
    errorDiv.classList.remove('show');
  }
}

/**
 * Validates the entire form
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} True if all validations pass
 */
function validateForm(form) {
  let isValid = true;
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const phone = form.querySelector('#phone');
  const subject = form.querySelector('#subject');
  const message = form.querySelector('#message');

  // Validate Name
  if (!name.value.trim()) {
    showFieldError(name, 'Please enter your name');
    isValid = false;
  } else if (name.value.trim().length < 2) {
    showFieldError(name, 'Name must be at least 2 characters long');
    isValid = false;
  } else {
    clearFieldError(name);
  }

  // Validate Email
  if (!email.value.trim()) {
    showFieldError(email, 'Please enter your email address');
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showFieldError(email, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError(email);
  }

  // Validate Phone (optional but if provided, must be valid)
  if (phone.value.trim() && !isValidPhone(phone.value.trim())) {
    showFieldError(phone, 'Please enter a valid phone number');
    isValid = false;
  } else {
    clearFieldError(phone);
  }

  // Validate Subject
  if (!subject.value.trim()) {
    showFieldError(subject, 'Please select a subject');
    isValid = false;
  } else {
    clearFieldError(subject);
  }

  // Validate Message
  if (!message.value.trim()) {
    showFieldError(message, 'Please enter a message');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showFieldError(message, 'Message must be at least 10 characters long');
    isValid = false;
  } else {
    clearFieldError(message);
  }

  return isValid;
}

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

/**
 * Shows a notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification: 'success', 'error', or 'info'
 * @param {number} duration - How long to show (ms), 0 for permanent
 */
function showNotification(message, type = 'info', duration = 5000) {
  const container = document.getElementById('notification');
  if (!container) return;

  container.textContent = message;
  container.className = `notification ${type}`;
  container.style.display = 'flex';

  if (duration > 0) {
    setTimeout(() => {
      container.style.display = 'none';
    }, duration);
  }
}

/**
 * Clears all notifications
 */
function clearNotification() {
  const container = document.getElementById('notification');
  if (container) {
    container.style.display = 'none';
  }
}

// ============================================================================
// FORM SUBMISSION HANDLER
// ============================================================================

function initializeForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Check if EmailJS is configured
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
    showNotification(
      'Contact form is not yet configured. Please add your EmailJS credentials.',
      'error',
      0
    );
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  const originalBtnText = submitBtn.textContent;
  let isSubmitting = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ensure EmailJS is loaded and initialized
    if (typeof emailjs === 'undefined' || !emailjs.init) {
      showNotification(
        'EmailJS service is initializing. Please wait a moment and try again.',
        'error',
        5000
      );
      console.warn('EmailJS not available yet');
      return;
    }

    // Prevent duplicate submissions
    if (isSubmitting) {
      console.warn('Form submission already in progress');
      return;
    }

    // Clear previous notifications
    clearNotification();

    // Validate form
    if (!validateForm(form)) {
      showNotification(
        'Please fix the errors above before submitting.',
        'error',
        5000
      );
      console.warn('Form validation failed');
      return;
    }

    // Set loading state
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = {
        to_email: RECIPIENT_EMAIL,
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone_number: formData.get('phone') || 'Not provided',
        subject_type: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'America/Chicago'
        })
      };

      console.log('Sending email with data:', data);

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        data
      );

      console.log('✓ Email sent successfully!', response);

      // Show success notification
      showNotification(
        `Thank you, ${data.from_name}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
        'success',
        6000
      );

      // Clear form fields
      form.reset();

      // Clear all validation states
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.classList.remove('error', 'success');
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('form-error')) {
          errorDiv.classList.remove('show');
        }
      });

      // Scroll to notification
      document.getElementById('notification').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    } catch (error) {
      console.error('✗ Email sending failed:', error);

      let errorMessage = 'An error occurred while sending your message. Please try again.';

      // Provide specific error messages based on error type
      if (error.text === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.status === 0 || !navigator.onLine) {
        errorMessage = 'No internet connection. Please check your connection and try again.';
      } else if (error.status === 400) {
        errorMessage = 'Configuration error: Invalid service or template ID. Please contact support.';
      } else if (error.status === 403) {
        errorMessage = 'Authentication failed. Please contact site administrator.';
      } else if (error.status === 404) {
        errorMessage = 'Service not found. Please contact support.';
      } else if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.text && error.text.includes('Invalid public key')) {
        errorMessage = 'EmailJS configuration error. Please contact support.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      showNotification(errorMessage, 'error', 8000);
    } finally {
      // Reset button state
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.textContent = originalBtnText;
    }
  });

  // Real-time validation on blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.value.trim()) {
        // Only validate populated fields on blur
        const fieldName = field.name;
        switch (fieldName) {
          case 'name':
            if (field.value.trim().length >= 2) {
              clearFieldError(field);
            }
            break;
          case 'email':
            if (isValidEmail(field.value.trim())) {
              clearFieldError(field);
            }
            break;
          case 'phone':
            if (!field.value.trim() || isValidPhone(field.value.trim())) {
              clearFieldError(field);
            }
            break;
          case 'subject':
            if (field.value.trim()) {
              clearFieldError(field);
            }
            break;
          case 'message':
            if (field.value.trim().length >= 10) {
              clearFieldError(field);
            }
            break;
        }
      }
    });
  });

  console.log('✓ Contact form initialized successfully');
}


// ============================================================================
// RESERVE BUTTON
// ============================================================================

function initializeReserveButtons() {
  document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const puppyName = btn.dataset.puppy || 'this puppy';
      const puppyPrice = btn.dataset.price || 'contact us for pricing';
      
      // Scroll to contact form
      const contactForm = document.querySelector('form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
          messageField.focus();
          messageField.value = `Hi! I'm interested in reserving ${puppyName}. `;
        }
      }
    });
  });
}

// ============================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('.card, .highlight-item, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Load puppies from JSON if container exists
  const puppiesGrid = document.getElementById('puppies-grid');
  if (puppiesGrid) {
    const puppies = await loadPuppies();
    renderPuppyCards(puppies);
  } else {
    // Fall back to existing galleries on pages without puppies-grid
    initializeGalleries();
  }

  initializeAccordions();
  initializeForm();
  initializeReserveButtons();
  initializeSmoothScroll();
  initializeScrollAnimations();

  console.log('eCockerSpanielPuppies website loaded successfully!');
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  });
}

// Open WhatsApp chat
function openWhatsApp(message = '') {
  const phoneNumber = '13106849767';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Open phone call
function makeCall(number) {
  window.location.href = `tel:${number}`;
}

// Send email
function sendEmail(email, subject = '') {
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
