/* =========================================
   GLOBAL SITE INTERACTIONS
   ========================================= */

/* =========================================================
   GLOBAL SITE INTERACTIONS
   Shared behaviors for the public Kean site.
   Safe page scoping keeps this script from breaking pages
   that do not contain the targeted markup.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* ---------------------------------------------------------
       ABOUT PAGE — CAMPUS MAP
       Updates the selected campus card when a map pin is clicked.
       HTML: .map-pin, #preview-count, #preview-name, etc.
    --------------------------------------------------------- */
    const campusData = {
        union: {
            number: "01",
            name: "Kean Union",
            location: "Union, New Jersey",
            description: "Kean’s flagship campus offers a full university experience with academic buildings, residence halls, athletics, research facilities and student life opportunities.",
            target: "union"
        },
        "jersey-city": {
            number: "02",
            name: "Kean Jersey City",
            location: "Jersey City, New Jersey",
            description: "Kean Jersey City expands the university’s presence in Hudson County and brings a metropolitan, New York-area experience to a growing student community.",
            target: "jersey-city"
        },
        ocean: {
            number: "03",
            name: "Kean Ocean",
            location: "Toms River & Manahawkin, New Jersey",
            description: "Kean Ocean supports degree-completion opportunities through strong ties to Ocean County and an accessible, community-centered campus model.",
            target: "ocean"
        },
        skylands: {
            number: "04",
            name: "Kean Skylands",
            location: "Oak Ridge / Jefferson Township, New Jersey",
            description: "Kean Skylands offers a distinctive natural setting for field-based learning, environmental study, events and research in a protected landscape.",
            target: "skylands"
        }
    };

    const pins = document.querySelectorAll(".map-pin");
    const previewCount = document.getElementById("preview-count");
    const previewName = document.getElementById("preview-name");
    const previewLocation = document.getElementById("preview-location");
    const previewDescription = document.getElementById("preview-description");
    const previewButton = document.querySelector(".preview-button");

    if (pins.length > 0 && previewCount && previewName && previewLocation && previewDescription) {
        const setActiveCampus = (campusKey) => {
            const campus = campusData[campusKey];
            if (!campus) return;

            pins.forEach((pin) => {
                pin.classList.toggle("is-active", pin.dataset.campus === campusKey);
            });

            previewCount.textContent = campus.number;
            previewName.textContent = campus.name;
            previewLocation.textContent = campus.location;
            previewDescription.textContent = campus.description;

            if (previewButton) {
                previewButton.dataset.target = campus.target;
            }
        };

        pins.forEach((pin) => {
            pin.addEventListener("click", () => {
                setActiveCampus(pin.dataset.campus);
            });
        });

        if (previewButton) {
            previewButton.addEventListener("click", () => {
                const targetId = previewButton.dataset.target;
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }
    }

    document.querySelectorAll(".map-back").forEach((button) => {
        button.addEventListener("click", () => {
            const targetSelector = button.dataset.target;
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* ---------------------------------------------------------
       STUDENT LIFE — PROGRAM AREA TOGGLES
       Opens and closes the academic-area accordion cards.
       HTML: .student-life-academic-areas article button
    --------------------------------------------------------- */
    document.querySelectorAll(".student-life-academic-areas article button").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest("article");
            if (!card) return;

            const isOpen = card.classList.toggle("is-open");
            button.setAttribute("aria-expanded", String(isOpen));
            const sign = button.querySelector("b");
            if (sign) sign.textContent = isOpen ? "−" : "+";
        });
    });

    /* ---------------------------------------------------------
       REVEAL ANIMATIONS
       Adds reveal states for sections that use the .reveal class.
       Trigger: IntersectionObserver when supported; graceful fallback
       on browsers without it.
    --------------------------------------------------------- */
    const revealItems = document.querySelectorAll(".reveal");
    if (revealItems.length > 0 && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
});
