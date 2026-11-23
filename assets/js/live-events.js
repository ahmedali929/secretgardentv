'use strict';

const eventMenu = document.querySelector('.event-menu');
eventMenu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && eventMenu.open) {
    eventMenu.open = false;
    eventMenu.querySelector('summary').focus();
  }
});
eventMenu?.querySelector('nav').addEventListener('click', (event) => {
  if (event.target.closest('a')) eventMenu.open = false;
});

const booking = document.querySelector('#event-booking');
const bookingButton = booking.querySelector('button[type="submit"]');
const bookingLabel = bookingButton.querySelector('[data-submit-label]');
const bookingStatus = document.querySelector('#booking-status');
const bookingSuccess = document.querySelector('#booking-success');

// Future transport can consume these named fields. This demo never sends or stores them.
async function submitDemoBooking(fields) {
  await new Promise((resolve) => window.setTimeout(resolve, 450));
  if (!fields.get('organization') || !fields.get('email')) {
    throw new Error('Incomplete booking');
  }
}

for (const field of booking.querySelectorAll('input[required]')) {
  field.addEventListener('input', () => field.setCustomValidity(''));
}
booking.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (bookingButton.disabled) return;

  const fields = new FormData(booking);
  for (const field of booking.querySelectorAll('input[required]')) {
    const trimmed = field.value.trim();
    field.setCustomValidity(trimmed ? '' : 'Please complete this field.');
    fields.set(field.name, trimmed);
  }
  if (!booking.reportValidity()) return;

  const originalLabel = bookingLabel.textContent;
  bookingButton.disabled = true;
  bookingStatus.dataset.state = 'pending';
  bookingStatus.textContent = 'Submitting demo invitation…';
  bookingLabel.textContent = 'Submitting…';
  try {
    await submitDemoBooking(fields);
    booking.reset();
    booking.hidden = true;
    bookingSuccess.hidden = false;
    bookingSuccess.focus();
  } catch {
    bookingStatus.dataset.state = 'error';
    bookingStatus.textContent = 'The demo couldn’t complete. Try again or email Secret Garden TV directly.';
    bookingButton.disabled = false;
    bookingButton.focus();
  } finally {
    bookingLabel.textContent = originalLabel;
    bookingButton.disabled = false;
    if (bookingStatus.dataset.state === 'pending') bookingStatus.textContent = '';
  }
});
bookingButton.disabled = false;

const newsletter = document.querySelector('#event-newsletter');
const newsletterStatus = document.querySelector('#event-newsletter-status');
newsletter.addEventListener('click', () => {
  if (newsletter.disabled) return;
  newsletter.disabled = true;
  newsletterStatus.textContent = 'Opening the newsletter signup…';

  const open = () => {
    window.ml('show', 'Pcso7D', true);
    newsletterStatus.textContent = '';
    newsletter.disabled = false;
  };
  if (typeof window.ml === 'function') {
    open();
    return;
  }

  const queued = (...args) => queued.q.push(args);
  queued.q = [];
  window.ml = queued;
  queued('account', '1739117');

  const sdk = document.createElement('script');
  sdk.src = 'https://assets.mailerlite.com/js/universal.js';
  const failure = () => {
    window.clearTimeout(timeout);
    sdk.remove();
    delete window.ml;
    newsletterStatus.textContent = 'Signup is unavailable. Try again or email Secret Garden TV.';
    newsletter.disabled = false;
  };
  const timeout = window.setTimeout(failure, 8000);
  sdk.addEventListener('error', failure, { once: true });
  sdk.addEventListener('load', () => {
    window.clearTimeout(timeout);
    open();
  }, { once: true });
  document.head.append(sdk);
});
newsletter.disabled = false;
