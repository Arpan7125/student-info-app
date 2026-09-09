/* ============================================================
   Student Information System - Behaviour
   1. Expand / collapse the additional student details.
   2. Move the holographic sheen with the pointer.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Details toggle ---------- */

  var button = document.getElementById("showDetailsBtn");
  var details = document.getElementById("studentDetails");
  var buttonLabel = button.querySelector(".btn__label");

  button.addEventListener("click", function () {
    var isOpen = details.classList.toggle("is-open");

    button.setAttribute("aria-expanded", String(isOpen));
    buttonLabel.textContent = isOpen ? "Hide Details" : "Show Details";
  });

  /* ---------- 2. Pointer-tracked sheen ---------- */

  var cards = document.querySelectorAll(".idcard, .teamcard");
  var prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var bounds = card.getBoundingClientRect();
        var x = ((event.clientX - bounds.left) / bounds.width) * 100;
        var y = ((event.clientY - bounds.top) / bounds.height) * 100;

        card.style.setProperty("--mx", x.toFixed(1) + "%");
        card.style.setProperty("--my", y.toFixed(1) + "%");
      });
    });
  }
});
