const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const sectionIcons = { canciones: 'musica', regalos: 'regalos' };
Object.entries(sectionIcons).forEach(([sectionId, iconName]) => {
  const title = document.querySelector(`#${sectionId} .section__title`);
  if (!title) return;
  const icon = document.createElement('lord-icon');
  icon.className = 'section__icon';
  icon.src = `./assets/icons/${iconName}.json`;
  icon.dataset.src = icon.src;
  icon.setAttribute('trigger', 'loop');
  icon.setAttribute('colors', 'primary:#ff00ff,secondary:#ff00ff');
  icon.setAttribute('aria-label', iconName);
  title.prepend(icon);
});

const intro = $('#intro');
$$('[data-open-invitation]').forEach((button) => button.addEventListener('click', () => {
  document.body.classList.remove('page--locked');
  intro.classList.add('is-hidden');
  const musicToggle = $('[data-music-toggle]');
  if (button.dataset.music === 'true') musicToggle.hidden = false;
}));

const countdown = $('[data-countdown]');
const updateCountdown = () => {
  const distance = new Date(countdown.dataset.date).getTime() - Date.now();
  const values = distance > 0 ? {
    days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24,
    minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60,
  } : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  Object.entries(values).forEach(([unit, value]) => { $(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0'); });
};
updateCountdown(); setInterval(updateCountdown, 1000);

const calendarGrid = $('[data-calendar-grid]');
const firstDay = new Date(2026, 9, 1).getDay();
const offset = firstDay === 0 ? 6 : firstDay - 1;
for (let i = 0; i < offset; i += 1) calendarGrid.insertAdjacentHTML('beforeend', '<span class="calendar__day calendar__day--empty"></span>');
for (let day = 1; day <= 31; day += 1) calendarGrid.insertAdjacentHTML('beforeend', `<span class="calendar__day${day === 10 ? ' calendar__day--selected' : ''}">${day}</span>`);

$$('[data-scroll-to]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.scrollTo)?.scrollIntoView()));
$$('[data-map]').forEach((button) => button.addEventListener('click', () => window.open(button.dataset.map, '_blank', 'noopener')));
$$('[data-calendar]').forEach((button) => button.addEventListener('click', () => {
  const fiesta = button.dataset.calendar === 'fiesta';
  const start = fiesta ? '20261010T213000' : '20261007T200000';
  const end = fiesta ? '20261011T030000' : '20261007T210000';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${fiesta ? 'Fiesta — More' : 'Misa — More'}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); link.download = 'invitacion-more.ics'; link.click(); URL.revokeObjectURL(link.href);
}));

$('[data-song-form]').addEventListener('submit', (event) => { event.preventDefault(); $('[data-song-message]').textContent = '¡Gracias por la sugerencia!'; event.currentTarget.reset(); });
$$('[data-copy]').forEach((button) => button.addEventListener('click', async (event) => {
    const btn = event.currentTarget;
    await navigator.clipboard?.writeText(btn.dataset.copy);
    const small = btn.querySelector('small');
    const originalSmall = small?.textContent;
    if (small) small.textContent = '¡Copiado!';
    setTimeout(() => { if (small) small.textContent = originalSmall; }, 1500);
}));



// --------------------------MUSICA----------------------------------

const audio = document.querySelector('.musica audio');
const playPauseButton = document.querySelector('.musica__button');

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.add('musica__button--playing');
        playPauseButton.classList.remove('musica__button--paused');
    } else {
        audio.pause();
        playPauseButton.classList.remove('musica__button--playing');
        playPauseButton.classList.add('musica__button--paused');
    }
});




// ------------------- fotos ----------------------

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 4,
    depth: 3,
    modifier: 50,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2000, // Time between slides in milliseconds (e.g., 3 seconds)
    disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
  },
  loop: true, // Enable infinite loop
});