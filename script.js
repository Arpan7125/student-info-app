/* ============================================================
   Student Information System - Behaviour
   1. Expand / collapse the additional details panel.
   2. Move the holographic sheen with the pointer.
   3. Expand / collapse project team cards.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Details toggle ---------- */

  var button = document.getElementById("showDetailsBtn");
  var details = document.getElementById("facultyDetails");
  var buttonLabel = button.querySelector(".btn__label");

  button.addEventListener("click", function () {
    var isOpen = details.classList.toggle("is-open");

    button.setAttribute("aria-expanded", String(isOpen));
    buttonLabel.textContent = isOpen ? "Hide Details" : "Show Details";
  });

  /* ---------- 2. Pointer-tracked sheen ---------- */

  var sheenCards = document.querySelectorAll(".idcard, .teamcard");
  var prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    sheenCards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var bounds = card.getBoundingClientRect();
        var x = ((event.clientX - bounds.left) / bounds.width) * 100;
        var y = ((event.clientY - bounds.top) / bounds.height) * 100;

        card.style.setProperty("--mx", x.toFixed(1) + "%");
        card.style.setProperty("--my", y.toFixed(1) + "%");
      });
    });
  }

  /* ---------- 3. Team card expand / collapse ---------- */

  var teamcards = Array.prototype.slice.call(
    document.querySelectorAll(".teamcard")
  );
  var backdrop = document.querySelector(".team-backdrop");
  var openCard = null;
  var lastFocused = null;
  var savedStartRect = null;
  var savedPlaceholder = null;

  function focusClose(card) {
    var closeBtn = card.querySelector(".teamcard__close");
    if (closeBtn) closeBtn.focus();
  }

  function restoreFocus() {
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  function expandCard(card) {
    if (openCard) return;

    openCard = card;
    lastFocused = document.activeElement;

    teamcards.forEach(function (other) {
      if (other !== card) other.classList.add("is-inert");
    });
    backdrop.classList.add("is-visible");
    card.setAttribute("aria-expanded", "true");

    var startRect = card.getBoundingClientRect();
    savedStartRect = startRect;

    // Move the card to be the last child of <body> (after the backdrop)
    // while it's expanded. Fixed-position elements are supposed to be
    // compared by z-index alone regardless of ancestry, but nesting the
    // card inside .team__grid/.team/.app put it behind the backdrop in
    // practice — reparenting removes any dependency on that ancestor
    // chain resolving stacking order correctly. Locking it to the exact
    // rect it just measured means this causes no visual jump.
    //
    // Swap in an empty placeholder rather than just removing the card:
    // .team__grid has 3 columns, and dropping straight to 2 grid items
    // makes the auto-fit column widths recompute instantly, snapping
    // the other two cards sideways before the smooth animation even
    // starts. Keeping a same-sized slot filled avoids that jump.
    savedPlaceholder = document.createElement("div");
    savedPlaceholder.className = "teamcard-placeholder";
    savedPlaceholder.setAttribute("aria-hidden", "true");
    card.parentNode.replaceChild(savedPlaceholder, card);
    document.body.appendChild(card);

    card.classList.add("is-flipping");
    card.style.top = startRect.top + "px";
    card.style.left = startRect.left + "px";
    card.style.width = startRect.width + "px";
    card.style.height = startRect.height + "px";

    // Force layout so the browser commits this locked-in-place
    // position before the target position is applied below —
    // otherwise the transition has no "from" value to animate.
    void card.offsetHeight;

    card.classList.add("is-expanded");

    // Measure the card's natural size at the target width.
    var targetWidth = Math.min(520, window.innerWidth * 0.92);
    card.style.width = targetWidth + "px";
    card.style.height = "auto";
    var naturalHeight = card.getBoundingClientRect().height;

    // Lock back to the start rect so the transition has a clean,
    // committed starting point, then force layout again.
    card.style.width = startRect.width + "px";
    card.style.height = startRect.height + "px";
    void card.offsetHeight;

    var margin = 24;
    var maxHeight = window.innerHeight - margin * 2;
    var targetHeight = Math.min(naturalHeight, maxHeight);
    var targetLeft = (window.innerWidth - targetWidth) / 2;
    var targetTop = Math.max(margin, (window.innerHeight - targetHeight) / 2);

    card.style.overflowY = targetHeight < naturalHeight ? "auto" : "visible";
    card.style.top = targetTop + "px";
    card.style.left = targetLeft + "px";
    card.style.width = targetWidth + "px";
    card.style.height = targetHeight + "px";

    // Reduced motion: the global stylesheet forces every transition
    // and animation to a 1ms duration, so this still "snaps" instantly
    // to the same target rect without a separate code path.

    focusClose(card);
  }

  function collapseCard(card) {
    if (!card) return;

    openCard = null;
    card.setAttribute("aria-expanded", "false");

    teamcards.forEach(function (other) {
      other.classList.remove("is-inert");
    });
    backdrop.classList.remove("is-visible");

    if (!savedStartRect) {
      card.classList.remove("is-expanded");
      card.classList.remove("is-flipping");
      clearFlipStyles(card);
      restoreParent(card);
      restoreFocus();
      return;
    }

    var rect = savedStartRect;
    var closeHandled = false;

    function finishClose(event) {
      if (event && event.target !== card) return;
      if (closeHandled) return;
      closeHandled = true;
      card.removeEventListener("transitionend", finishClose);
      card.classList.remove("is-expanded");
      card.classList.remove("is-flipping");
      clearFlipStyles(card);
      savedStartRect = null;
      restoreParent(card);
      restoreFocus();
    }

    card.addEventListener("transitionend", finishClose);
    // Fallback in case transitionend doesn't fire (e.g. a backgrounded
    // tab that pauses compositing) — --dur-flip is 240ms, so 350ms is
    // safe. Reduced motion forces 1ms transitions, so this still
    // resolves fast.
    setTimeout(finishClose, 350);

    card.classList.remove("is-expanded");
    card.style.overflowY = "hidden";
    card.style.top = rect.top + "px";
    card.style.left = rect.left + "px";
    card.style.width = rect.width + "px";
    card.style.height = rect.height + "px";
  }

  function clearFlipStyles(card) {
    // Remove only the inline properties this script added — never the
    // whole style attribute, which would also wipe the --accent/--i
    // custom properties authored in the HTML (that's what themes the
    // card's colour: top bar, monogram, role text, tag).
    card.style.removeProperty("top");
    card.style.removeProperty("left");
    card.style.removeProperty("width");
    card.style.removeProperty("height");
    card.style.removeProperty("overflow-y");
  }

  function restoreParent(card) {
    if (!savedPlaceholder) return;
    savedPlaceholder.parentNode.replaceChild(card, savedPlaceholder);
    savedPlaceholder = null;
  }

  teamcards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      if (event.target.closest(".teamcard__close")) return;
      if (card === openCard) return;
      expandCard(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      if (card === openCard) return;
      event.preventDefault();
      expandCard(card);
    });

    var closeBtn = card.querySelector(".teamcard__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        collapseCard(card);
      });
    }
  });

  backdrop.addEventListener("click", function () {
    collapseCard(openCard);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && openCard) {
      collapseCard(openCard);
    }
  });
});
