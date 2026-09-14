(() => {
  const KEY = 'huttonnavy_access';
  const PASS = 'UTH';
  const root = document.documentElement;
  const SITE = 'blanemckie.github.io';
  const PATH = '/huttonnavy/';
  const trackVisit = () => {
    fetch(`https://page-views-api.ratneshc.com/api/v1/track?site=${encodeURIComponent(SITE)}&path=${encodeURIComponent(PATH)}`, {keepalive: true}).catch(() => {});
  };
  const unlock = () => {
    root.classList.remove('auth-locked');
    document.getElementById('auth-gate')?.classList.add('auth-hidden');
    sessionStorage.setItem(KEY, '1');
    trackVisit();
  };
  if (sessionStorage.getItem(KEY) === '1') {
    unlock();
    return;
  }
  root.classList.add('auth-locked');
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const input = document.getElementById('auth-password');
    const error = document.getElementById('auth-error');
    const gate = document.getElementById('auth-gate');
    const prompt = gate?.querySelector('.auth-card p');
    if (prompt) prompt.textContent = 'Enter parents password to get in';
    if (input) input.placeholder = 'Parents password';
    input?.focus();
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if ((input?.value || '').trim().toUpperCase() === PASS) {
        unlock();
      } else {
        if (error) error.textContent = 'Incorrect password';
        if (input) { input.value = ''; input.focus(); }
      }
    });
  });
})();