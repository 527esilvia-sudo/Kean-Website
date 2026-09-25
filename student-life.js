/* =========================================================
   STUDENT LIFE — ACADEMIC AREA TOGGLES
   Expands and collapses the program-selection cards on the
   Student Life page when the user activates the button.
   HTML: .student-life-academic-areas article button
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const areaButtons = document.querySelectorAll(".student-life-academic-areas article button");

    areaButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest("article");
            if (!card) return;

            const isOpen = card.classList.toggle("is-open");
            button.setAttribute("aria-expanded", String(isOpen));

            const sign = button.querySelector("b");
            if (sign) sign.textContent = isOpen ? "−" : "+";
        });
    });
});
