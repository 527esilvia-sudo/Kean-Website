/* =========================================================
   STUDENT LIFE PAGE JAVASCRIPT
   Page: studentLife.html

   Interactions:
   1. Academic-area expand/collapse buttons.
   2. Accessible ARIA state updates.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ACADEMIC AREA TOGGLES
       ===================================================== */

    const areaButtons = document.querySelectorAll(
        ".student-life-page .student-life-academic-areas article button"
    );

    areaButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest("article");

            if (!card) {
                return;
            }

            const isOpen = card.classList.toggle("is-open");

            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const sign = button.querySelector("b");

            if (sign) {
                sign.textContent = isOpen ? "−" : "+";
            }

        });

    });

});