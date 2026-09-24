document.addEventListener("DOMContentLoaded", () => {
    const cards = [...document.querySelectorAll(".program-card")];
    const filters = document.querySelectorAll(".program-filter");
    const search = document.getElementById("program-search");
    const empty = document.getElementById("program-empty");
    let category = "all";

    const renderPrograms = () => {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach((card) => {
            const matchesCategory = category === "all" || card.dataset.category === category;
            const matchesSearch = !query || card.dataset.search.includes(query);
            const shouldShow = matchesCategory && matchesSearch;
            card.hidden = !shouldShow;
            if (shouldShow) visible += 1;
        });
        empty.hidden = visible !== 0;
    };

    if (search) {
        filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                category = filter.dataset.category;
                filters.forEach((item) => item.classList.toggle("is-active", item === filter));
                renderPrograms();
            });
        });
        search.addEventListener("input", renderPrograms);
    }

    const livingData = {
        commuter: { housing: "$1,900", transport: "$1,800", total: "$13,100" },
        resident: { housing: "$14,600", transport: "$700", total: "$25,200" }
    };
    const updateLiving = (living) => {
        const values = livingData[living];
        document.getElementById("living-housing").textContent = values.housing;
        document.getElementById("living-transport").textContent = values.transport;
        document.getElementById("living-total").textContent = values.total;
        document.querySelectorAll(".living-option").forEach((button) => button.classList.toggle("is-active", button.dataset.living === living));
        document.getElementById("housing").value = living;
    };
    document.querySelectorAll(".living-option").forEach((button) => button.addEventListener("click", () => updateLiving(button.dataset.living)));

    const residency = document.getElementById("residency");
    const housing = document.getElementById("housing");
    const output = document.getElementById("estimate-output");
    const updateEstimate = () => {
        const tuition = residency.value === "out" ? 16000 : 8200;
        const living = housing.value === "resident" ? 14600 : 1900;
        const transport = housing.value === "resident" ? 700 : 1800;
        const total = tuition + living + transport + 2400;
        output.textContent = `Estimated annual cost: $${total.toLocaleString()}`;
        updateLiving(housing.value);
    };
    residency.addEventListener("change", updateEstimate);
    housing.addEventListener("change", updateEstimate);
});
