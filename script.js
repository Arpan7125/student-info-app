/* ============================================================
   Student Information System - Behaviour
   Toggles the extra student details when the button is clicked.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("showDetailsBtn");
  var details = document.getElementById("studentDetails");

  button.addEventListener("click", function () {
    var isHidden = details.hasAttribute("hidden");

    if (isHidden) {
      details.removeAttribute("hidden");
      button.textContent = "Hide Details";
    } else {
      details.setAttribute("hidden", "");
      button.textContent = "Show Details";
    }
  });
});
