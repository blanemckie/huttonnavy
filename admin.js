(() => {
  const ADMIN_HASH = '96e0cd8555f2179a6a74e3ed972bffd78a49d3be9a3fb1292bf0bef3d1c229de';
  const ADMIN_KEY = 'huttonnavy_admin';
  const SITE = 'blanemckie.github.io';
  const PATH = '/huttonnavy/';

  const hash = async (text) => {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const showDashboard = () => {
    document.getElementById('admin-gate')?.classList.add('hidden');
    document.getElementById('admin-dashboard')?.classList.remove('hidden');
    loadCount();
  };

  const loadCount = async () => {
    const count = document.getElementById('view-count');
    const status = document.getElementById('count-status');
    if (count) count.textContent = '—';
    if (status) status.textContent = 'Refreshing website views…';
    try {
      const res = await fetch(`https://page-views-api.ratneshc.com/api/v1/views?site=${encodeURIComponent(SITE)}&path=${encodeURIComponent(PATH)}`, {cache: 'no-store'});
      if (!res.ok) throw new Error(`Counter returned ${res.status}`);
      const data = await res.json();
      const views = Number(data.views || 0);
      if (count) count.textContent = views.toLocaleString('en-GB');
      if (status) status.textContent = `Current total: ${views.toLocaleString('en-GB')} parent-area visits.`;
    } catch (err) {
      if (count) count.textContent = '—';
      if (status) status.textContent = 'View counter is temporarily unavailable. Tap refresh to try again.';
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-form');
    const input = document.getElementById('admin-password');
    const error = document.getElementById('admin-error');
    const refresh = document.getElementById('refresh-count');

    refresh?.addEventListener('click', loadCount);

    if (sessionStorage.getItem(ADMIN_KEY) === '1') {
      showDashboard();
      return;
    }

    input?.focus();
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const candidate = (input?.value || '').trim();
      const digest = await hash(candidate);
      if (digest === ADMIN_HASH) {
        sessionStorage.setItem(ADMIN_KEY, '1');
        if (error) error.textContent = '';
        showDashboard();
      } else {
        if (error) error.textContent = 'Incorrect admin password';
        if (input) { input.value = ''; input.focus(); }
      }
    });
  });
})();