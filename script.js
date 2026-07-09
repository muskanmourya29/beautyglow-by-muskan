/* ============================================================
   script.js — Vanilla JavaScript interactivity
   ============================================================ */

/* ---- Navbar: scroll effect + active link ---- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Mobile nav toggle ---- */
const navToggle    = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinksMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---- Scroll-reveal for feature items ---- */
const featureItems = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

featureItems.forEach(el => revealObserver.observe(el));

/* ---- Animated counters (stats section) ---- */
const statNums = document.querySelectorAll('.stat-num[data-target]');

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => counterObserver.observe(el));

/* ---- Contact form validation ---- */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validate(id, errorId, check, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(errorId);
  const valid = check(input.value.trim());
  input.classList.toggle('error', !valid);
  error.textContent = valid ? '' : message;
  return valid;
}

function isNotEmpty(val)  { return val.length > 0; }
function isEmail(val)     { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); }
function isLongEnough(val){ return val.length >= 10; }

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameOk    = validate('name',    'nameError',    isNotEmpty,   'Please enter your name.');
  const emailOk   = validate('email',   'emailError',   isEmail,      'Please enter a valid email address.');
  const messageOk = validate('message', 'messageError', isLongEnough, 'Message must be at least 10 characters.');

  if (!nameOk || !emailOk || !messageOk) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 4000);
  }, 900);
});

['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    document.getElementById(id + 'Error').textContent = '';
  });
});

/* ---- Footer: set current year ---- */
document.getElementById('year').textContent = new Date().getFullYear();
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
