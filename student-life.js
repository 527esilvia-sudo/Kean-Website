javascript
/* =========================================================
   STUDENT LIFE PAGE JAVASCRIPT

   Page:
   studentLife.html

   Interactions:
   1. Academic-area expand/collapse buttons.
   2. Accessible ARIA state updates.

   The script is scoped entirely to the Student Life page
   so it does not interfere with the site's other pages.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ACADEMIC AREA TOGGLES
       HTML:
       .student-life-academic-areas article button

       Trigger:
       User clicks an academic-area button.
    ----------------------------------------------------- */

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

