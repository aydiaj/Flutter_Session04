/* Session 04: labeled, accessible conceptual simulators. No Dart code is executed by JS. */
(() => {
  'use strict';
  const explorer = document.getElementById('listIndexExplorer');
  const result = document.getElementById('indexResult');
  if (explorer && result) {
    const data = ['Mira', 'Omar', 'Lina'];
    explorer.querySelectorAll('[data-idx]').forEach(button => {
      button.addEventListener('click', () => {
        const idx = Number(button.dataset.idx);
        explorer.querySelectorAll('button').forEach(item => {
          const active = item === button;
          item.classList.toggle('is-selected', active);
          item.setAttribute('aria-pressed', String(active));
        });
        result.textContent = `students[${idx}] → '${data[idx]}' · length = ${data.length} · last index = ${data.length - 1}`;
      });
    });
  }

  const next = document.getElementById('cascadeStep');
  const reset = document.getElementById('cascadeReset');
  const history = document.getElementById('cascadeHistory');
  if (next && reset && history) {
    const frames = [
      'Start: [3, 1, 2]',
      '..insert(0, 8) → [8, 3, 1, 2]',
      '..sort() → [1, 2, 3, 8]',
      'Cascade result → same List object [1, 2, 3, 8]'
    ];
    let index = 0;
    const rerender = () => {
      history.replaceChildren();
      frames.slice(0, index + 1).forEach(description => {
        const li = document.createElement('li');
        li.textContent = description;
        history.append(li);
      });
      next.disabled = index === frames.length - 1;
      next.textContent = next.disabled ? 'Trace complete ✓' : 'Run next operation';
    };
    next.addEventListener('click', () => {index = Math.min(index + 1, frames.length - 1);rerender();});
    reset.addEventListener('click', () => {index = 0;rerender();});
    rerender();
  }

  const teacher = document.getElementById('argInstructor');
  const minutes = document.getElementById('argMinutes');
  const preview = document.getElementById('argumentPreview');
  if (teacher && minutes && preview) {
    const update = () => {
      const name = teacher.value.trim().replaceAll('\\', '\\\\').replaceAll("'", "\\'") || 'Instructor';
      preview.textContent = `showCourse('Dart', instructor: '${name}', duration: ${minutes.value});`;
    };
    teacher.addEventListener('input', update);
    minutes.addEventListener('change', update);
    update();
  }
})();
