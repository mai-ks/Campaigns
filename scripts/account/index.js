// Tabs switching (vanilla)
document.addEventListener('DOMContentLoaded', () => {
    const tabs = Array.from(document.querySelectorAll('.tab-btn'));
    const panels = Array.from(document.querySelectorAll('.panel'));
  
    const showPanel = (id) => {
      panels.forEach(p => {
        const isTarget = p.id === id;
        p.classList.toggle('is-active', isTarget);
        p.hidden = !isTarget;
      });
      tabs.forEach(b => {
        const isActive = b.dataset.target === id;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      // אופציונלי – לזכור בחירה
      localStorage.setItem('olivetto_active_panel', id);
    };
  
    // שחזור בחירה אחרונה
    const saved = localStorage.getItem('olivetto_active_panel');
    if (saved && document.getElementById(saved)) {
      showPanel(saved);
    }
  
    tabs.forEach(btn => {
      btn.addEventListener('click', () => showPanel(btn.dataset.target));
      btn.addEventListener('keydown', (e) => {
        // ניווט עם חצים בתפריט אנכי (נגישות)
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const dir = e.key === 'ArrowDown' ? 1 : -1;
          const i = tabs.indexOf(btn);
          const next = tabs[(i + dir + tabs.length) % tabs.length];
          next.focus();
        }
      });
    });
  });


