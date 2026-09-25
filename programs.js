/* =========================================================
   PROGRAMS / COST PAGE
   Handles search and filtering for the academic program explorer,
   the program detail modal, and the cost-planning estimate tool.
   Scope: programs.html and admissions.html
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* ---------------------------------------------------------
       PROGRAM FILTER + SEARCH
       Keeps the program explorer usable without affecting pages
       that do not render the .program-card markup.
    --------------------------------------------------------- */
    const cards = [...document.querySelectorAll(".program-card")];
    const filters = document.querySelectorAll(".program-filter");
    const search = document.getElementById("program-search");
    const empty = document.getElementById("program-empty");
    let category = "all";

    const renderPrograms = () => {
        const query = search ? search.value.trim().toLowerCase() : "";
        let visible = 0;

        cards.forEach((card) => {
            const matchesCategory = category === "all" || card.dataset.category === category;
            const matchesSearch = !query || card.dataset.search.includes(query);
            const shouldShow = matchesCategory && matchesSearch;
            card.hidden = !shouldShow;
            if (shouldShow) visible += 1;
        });

        if (empty) empty.hidden = visible !== 0;
    };

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            category = filter.dataset.category;
            filters.forEach((item) => item.classList.toggle("is-active", item === filter));
            renderPrograms();
        });
    });

    if (search) {
        search.addEventListener("input", renderPrograms);
    }

    /* ---------------------------------------------------------
       PROGRAM DETAIL MODAL
       Opens a compact review panel with key program information.
       HTML: #program-modal and .program-card
    --------------------------------------------------------- */
    const modal = document.getElementById("program-modal");
    const modalTitle = document.getElementById("program-modal-title");
    const modalSummary = document.getElementById("program-modal-summary");
    const modalAudience = document.getElementById("program-modal-audience");
    const modalDoing = document.getElementById("program-modal-doing");
    const modalMatters = document.getElementById("program-modal-matters");

    const openModal = (card) => {
        if (!modal || !modalTitle || !modalSummary || !modalAudience || !modalDoing || !modalMatters) return;
        modalTitle.textContent = card.dataset.title || card.querySelector("h3").textContent;
        modalSummary.textContent = card.dataset.description || "";
        modalAudience.innerHTML = `<p>${card.dataset.category || "Kean students exploring a direction"}. ${card.dataset.semester || "Course sequencing varies by specialization and advising plan."}</p>`;
        modalDoing.innerHTML = `<p>${card.dataset.description || "Explore the questions and work at the center of this program."}</p>`;
        modalMatters.innerHTML = `<p>${card.dataset.opportunities || card.dataset.related || "Build useful knowledge and experience for what comes next."}</p>`;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    cards.forEach((card) => {
        card.addEventListener("click", () => openModal(card));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(card);
            }
        });
        card.setAttribute("tabindex", "0");
    });

    if (modal) {
        const closeButton = modal.querySelector(".program-modal-close");
        const backdrop = modal.querySelector(".program-modal-backdrop");

        if (closeButton) closeButton.addEventListener("click", closeModal);
        if (backdrop) backdrop.addEventListener("click", closeModal);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeModal();
        });
    }

    /* ---------------------------------------------------------
       COST PLANNER
       Keeps the living-arrangement estimate aligned with the
       selected residency and housing type.
    --------------------------------------------------------- */
    const livingData = {
        commuter: { housing: "$1,900", transport: "$1,800", total: "$13,100" },
        resident: { housing: "$14,600", transport: "$700", total: "$25,200" }
    };

    const updateLiving = (living) => {
        const values = livingData[living];
        const housingEl = document.getElementById("living-housing");
        const transportEl = document.getElementById("living-transport");
        const totalEl = document.getElementById("living-total");

        if (!values) return;
        if (housingEl) housingEl.textContent = values.housing;
        if (transportEl) transportEl.textContent = values.transport;
        if (totalEl) totalEl.textContent = values.total;

        document.querySelectorAll(".living-option").forEach((button) => {
            button.classList.toggle("is-active", button.dataset.living === living);
        });

        const housingSelect = document.getElementById("housing");
        if (housingSelect) housingSelect.value = living;
    };

    document.querySelectorAll(".living-option").forEach((button) => {
        button.addEventListener("click", () => updateLiving(button.dataset.living));
    });

    const residency = document.getElementById("residency");
    const housing = document.getElementById("housing");
    const output = document.getElementById("estimate-output");

    const updateEstimate = () => {
        if (!residency || !housing || !output) return;
        const tuition = residency.value === "out" ? 16000 : 8200;
        const living = housing.value === "resident" ? 14600 : 1900;
        const transport = housing.value === "resident" ? 700 : 1800;
        const total = tuition + living + transport + 2400;
        output.textContent = `Estimated annual cost: $${total.toLocaleString()}`;
        updateLiving(housing.value);
    };

    if (residency && housing) {
        residency.addEventListener("change", updateEstimate);
        housing.addEventListener("change", updateEstimate);
        updateEstimate();
    }
});
