const moduleFactory = typeof createWellModule !== 'undefined' ? createWellModule : null;

let mod, calc;

(async () => {
  mod = await moduleFactory();
  calc = mod.cwrap('well_recovery_rate', 'number',
                   ['number','number','number','number']);
})();

const $ = (id) => document.getElementById(id);

document.getElementById('calc').addEventListener('submit', (e) => {
  e.preventDefault();
  const r = calc(
    parseFloat($('static').value),
    parseFloat($('drawdown').value),
    parseFloat($('pump').value),
    parseFloat($('t').value)
  );
  $('out').textContent = `Recovery rate: ${r.toFixed(6)} (your units)`;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}
