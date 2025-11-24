// Script for Niaz Business Consultancy site
(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Set current year in footer
  yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Basic form validation + mailto fallback
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let ok = true;
    if (!nameInput.value.trim()) { nameError.textContent = 'Please enter your full name.'; ok = false; }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { emailError.textContent = 'Please enter a valid email address.'; ok = false; }
    if (!messageInput.value.trim()) { messageError.textContent = 'Please tell us how we can help.'; ok = false; }

    if (!ok) return;

    // TODO: Replace with your backend endpoint. For now, open the user's mail client.
    const to = 'contact@niazconsultancy.com'; // <- update this
    const subject = encodeURIComponent('Website Contact — Niaz Business Consultancy');
    const body = encodeURIComponent(`Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    // Optionally reset the form
    form.reset();
  });
})();
