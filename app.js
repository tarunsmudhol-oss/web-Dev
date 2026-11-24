// =====================================
// REUSABLE TOAST NOTIFICATION
// =====================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}


// =====================================
// DOM CONTENT LOADED
// =====================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // ACTIVITY 5 - BOOK BUTTON INTERACTION
    // =====================================

    const bookButtons = document.querySelectorAll(".book-btn");

    const bookingSection = document.getElementById("booking");

    const matchSelect = document.getElementById("match");

    const matchValues = {
        "CSK vs MI": "01",
        "RCB vs MI": "02",
        "DC vs CSK": "03",
        "RR vs RCB": "04"
    };

    bookButtons.forEach(button => {

        button.addEventListener("click", function () {

            const matchName = this.dataset.match;

            if (matchSelect && matchValues[matchName]) {
                matchSelect.value = matchValues[matchName];
                updateBookingSummary();
            }

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            showToast("You are booking tickets for " + matchName + "!");

        });

    });


    // =====================================
    // ACTIVITY 7 - LIVE BOOKING SUMMARY
    // =====================================

    const standSelect = document.getElementById("stand");

    const ticketInput = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summary-match");

    const summaryStand = document.getElementById("summary-stand");

    const summaryPrice = document.getElementById("summary-price");

    const summaryQuantity = document.getElementById("summary-quantity");

    const summaryTotal = document.getElementById("summary-total");


    const ticketPrices = {

        "01": {
            General: 1200,
            Premium: 2500,
            VIP: 5000
        },

        "02": {
            General: 1500,
            Premium: 3000,
            VIP: 6000
        },

        "03": {
            General: 1400,
            Premium: 3200,
            VIP: 6500
        },

        "04": {
            General: 1800,
            Premium: 3500,
            VIP: 7000
        }

    };


    const matchNames = {
        "01": "CSK vs MI",
        "02": "RCB vs MI",
        "03": "DC vs CSK",
        "04": "RR vs RCB"
    };


    function updateBookingSummary() {

        if (!matchSelect || !standSelect || !ticketInput) return;

        const selectedMatch = matchSelect.value;

        const selectedStand = standSelect.value;

        const quantity = Number(ticketInput.value);

        if (!selectedMatch) {

            summaryMatch.textContent = "Not Selected";
            summaryStand.textContent = selectedStand;
            summaryPrice.textContent = "0";
            summaryQuantity.textContent = "0";
            summaryTotal.textContent = "0";

            return;
        }

        if (!Number.isInteger(quantity) || quantity < 1) {

            summaryMatch.textContent = matchNames[selectedMatch];
            summaryStand.textContent = selectedStand;
            summaryPrice.textContent = "0";
            summaryQuantity.textContent = "0";
            summaryTotal.textContent = "0";

            return;
        }

        const price = ticketPrices[selectedMatch]?.[selectedStand];

        if (price === undefined) return;

        const total = price * quantity;

        summaryMatch.textContent = matchNames[selectedMatch];

        summaryStand.textContent = selectedStand;

        summaryPrice.textContent = price.toLocaleString("en-IN");

        summaryQuantity.textContent = quantity;

        summaryTotal.textContent = total.toLocaleString("en-IN");

        showToast("Booking Summary Updated Successfully!");

    }


    if (matchSelect) {
        matchSelect.addEventListener("change", updateBookingSummary);
    }

    if (standSelect) {
        standSelect.addEventListener("change", updateBookingSummary);
    }

    if (ticketInput) {
        ticketInput.addEventListener("input", updateBookingSummary);
    }


    // =====================================
    // ACTIVITY 8 - TEAM FILTER
    // =====================================

    const teamFilter = document.getElementById("team");

    const matchCards = document.querySelectorAll(".match-card");


    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = this.value;

            matchCards.forEach(card => {

                const teams = (card.dataset.team || "").split(" ");

                if (
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam)
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

            showToast("Match filter updated!");

        });

    }


    // =====================================
    // ACTIVITY 8 - GRID AND LIST VIEW
    // =====================================

    const matchGrid = document.getElementById("match-grid");

    const gridButton = document.getElementById("grid-view");

    const listButton = document.getElementById("list-view");


    // Grid View

    if (matchGrid && gridButton && listButton) {

        gridButton.addEventListener("click", function () {

            matchGrid.classList.remove("list-view");

            gridButton.classList.add("active");

            listButton.classList.remove("active");

            showToast("Grid View Activated!");

        });


        // List View

        listButton.addEventListener("click", function () {

            matchGrid.classList.add("list-view");

            listButton.classList.add("active");

            gridButton.classList.remove("active");

            showToast("List View Activated!");

        });

    }


    // =====================================
    // ACTIVITY 8 - HAMBURGER MENU
    // =====================================

    const menuToggle = document.getElementById("menu-toggle");

    const navbar = document.getElementById("navbar");


    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("active");

            const isOpen = navbar.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Close menu after clicking a navigation link

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.textContent = "☰";

            });

        });

    }

});