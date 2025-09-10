// js/app.js
const moduleFactory = typeof createWellModule !== 'undefined' ? createWellModule : null;

let mod, calc;

(async () => {
  mod = await moduleFactory();
  // 5 params now: D, S, Q, T, C  (all numbers)
  calc = mod.cwrap('well_recovery_rate', 'number',
                   ['number','number','number','number','number']);
})();

const $ = (id) => document.getElementById(id);

document.getElementById('calc').addEventListener('submit', (e) => {
  e.preventDefault();

  // Read the five inputs (IDs must match index.html)
  const D = parseFloat($('depthAfter').value);     // ft
  const S = parseFloat($('staticDepth').value);    // ft
  const Q = parseFloat($('pumpRate').value);       // gpm
  const T = parseFloat($('pumpDuration').value);   // min
  const C = parseFloat($('wellDiameter').value);   // inches

  const x = calc(D, S, Q, T, C); // call into C/WASM

  if (Number.isNaN(x)) {
    $('out').textContent = 'Check your inputs (numbers only).';
  } else {
    $('out').textContent = `x (recovery vs no-inflow): ${x.toFixed(6)} ft`;
  }
});

// Register the service worker (PWA/offline)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}
