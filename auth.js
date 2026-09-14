(() => {
  const KEY = 'huttonnavy_access';
  const PASS = 'UTH';
  const root = document.documentElement;
  const unlock = () => {
    root.classList.remove('auth-locked');
    document.getElementById('auth-gate')?.classList.add('auth-hidden');
    sessionStorage.setItem(KEY, '1');
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