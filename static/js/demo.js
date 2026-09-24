/* Only one audio/video element plays at a time. */
document.addEventListener('play', function (e) {
  var t = e.target.tagName;
  if (t !== 'AUDIO' && t !== 'VIDEO') return;
  var all = document.querySelectorAll('audio,video');
  for (var i = 0; i < all.length; i++) { if (all[i] !== e.target) all[i].pause(); }
}, true);

/* Robot answer clips: when a card's AV clip ends, nudge focus to the RGI clip so
   keyboard users can step through "backbone -> backbone + RGI" without hunting. */
document.querySelectorAll('.robotgrid').forEach(function (g) {
  var vids = g.querySelectorAll('video.rv');
  if (vids.length < 2) return;
  vids[0].addEventListener('ended', function () { vids[1].focus({ preventScroll: true }); });
});

/* Full-face reference loops (muted) play only while on screen. */
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.play().catch(function () {}); } else { e.target.pause(); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('video.ff').forEach(function (v) { io.observe(v); });
}
