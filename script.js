document.addEventListener("DOMContentLoaded", () => {
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
        previewButton.dataset.target = campus.target;
    };

    pins.forEach((pin) => {
        pin.addEventListener("click", () => {
            setActiveCampus(pin.dataset.campus);
        });
    });

    previewButton.addEventListener("click", () => {
        const targetId = previewButton.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });

    document.querySelectorAll(".map-back").forEach((button) => {
        button.addEventListener("click", () => {
            const targetSelector = button.dataset.target;
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    const heroPhoto = document.querySelector(".hero-photo");
    if (heroPhoto) {
        heroPhoto.addEventListener("pointermove", (event) => {
            const rect = heroPhoto.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            heroPhoto.style.transform = `translate(${(x - 0.5) * 8}px, ${(y - 0.5) * 8}px)`;
        });

        heroPhoto.addEventListener("pointerleave", () => {
            heroPhoto.style.transform = "translate(0, 0)";
        });
    }

    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    const mapGraphic = document.querySelector(".map-graphic");
    if (mapGraphic) {
        mapGraphic.addEventListener("pointermove", (event) => {
            const rect = mapGraphic.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
            mapGraphic.style.transform = `translate(${offsetX * 4}px, ${offsetY * 4}px)`;
        });

        mapGraphic.addEventListener("pointerleave", () => {
            mapGraphic.style.transform = "translate(0, 0)";
        });
    }
});
