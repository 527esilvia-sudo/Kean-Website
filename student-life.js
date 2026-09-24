document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".student-life-academic-areas article button").forEach((button) => {
		button.addEventListener("click", () => {
			const card = button.closest("article");
			const isOpen = card.classList.toggle("is-open");
			button.setAttribute("aria-expanded", String(isOpen));
			button.querySelector("b").textContent = isOpen ? "−" : "+";
		});
	});
});
