const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
});

nav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const certificateDialog = document.querySelector('.certificate-dialog');
const certificateImage = certificateDialog.querySelector('.certificate-stage img');
const certificateTitle = certificateDialog.querySelector('#certificate-title');
const closeDialog = certificateDialog.querySelector('.dialog-close');

document.querySelectorAll('.certificate-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    certificateImage.src = trigger.dataset.certificate;
    certificateImage.alt = `${trigger.dataset.title} certificate`;
    certificateTitle.textContent = trigger.dataset.title;
    certificateDialog.showModal();
  });
});

closeDialog.addEventListener('click', () => certificateDialog.close());
certificateDialog.addEventListener('click', (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});
