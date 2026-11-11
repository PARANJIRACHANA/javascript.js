
// ShareBite - Food Wastage Management Website

// Sample food donations
let donations = [
    {
        id: 1,
        name: "Fresh Vegetable Rice",
        quantity: "5 meals",
        location: "Chennai",
        donor: "Green Restaurant",
        status: "Available"
    },
    {
        id: 2,
        name: "Chapati and Vegetable Curry",
        quantity: "10 meals",
        location: "Gummidipundi",
        donor: "Community Kitchen",
        status: "Available"
    },
    {
        id: 3,
        name: "Fresh Fruits",
        quantity: "3 kg",
        location: "Kavaraipettai",
        donor: "Fresh Mart",
        status: "Available"
    }
];

let totalRequests = 0;
let totalDonations = donations.length;

// Display notifications
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

// Display available food donations
function renderDonations() {
    const container = document.getElementById("donationList");

    if (!container) return;

    const search = document
        .getElementById("searchInput")?.value
        .toLowerCase() || "";

    container.innerHTML = "";

    const filteredDonations = donations.filter(food =>
        food.name.toLowerCase().includes(search) ||
        food.location.toLowerCase().includes(search)
    );

    filteredDonations.forEach(food => {
        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = food.name;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + food.quantity;

        const location = document.createElement("p");
        location.textContent = "Location: " + food.location;

        const donor = document.createElement("p");
        donor.textContent = "Donor: " + food.donor;

        const button = document.createElement("button");
        button.className = "btn small";
        button.textContent = "Request Food";
        button.addEventListener("click", () => requestFood(food.id));

        card.append(heading, quantity, location, donor, button);
        container.appendChild(card);
    });

    if (filteredDonations.length === 0) {
        container.textContent = "No food donations found.";
    }
}

// Search food donations
function searchFood() {
    renderDonations();
}

// Request food
function requestFood(id) {
    const food = donations.find(item => item.id === id);

    if (!food) return;

    if (food.status !== "Available") {
        showToast("This food is no longer available.");
        return;
    }

    food.status = "Requested";
    totalRequests++;

    updateCounters();
    updateActivity(food.name + " requested");

    showToast("Food request submitted successfully!");
    renderDonations();
}

// Update statistics
function updateCounters() {
    const donationsCount = document.getElementById("donationsCount");
    const requestsCount = document.getElementById("requestsCount");
    const availableCount = document.getElementById("availableCount");

    if (donationsCount) {
        donationsCount.textContent = totalDonations;
    }

    if (requestsCount) {
        requestsCount.textContent = totalRequests;
    }

    if (availableCount) {
        availableCount.textContent =
            donations.filter(item => item.status === "Available").length;
    }
}

// Update activity list
function updateActivity(message) {
    const activityList = document.getElementById("activityList");

    if (!activityList) return;

    const item = document.createElement("li");
    item.textContent = message;

    activityList.prepend(item);
}

// Submit food donation
const donationForm = document.getElementById("donationForm");

if (donationForm) {
    donationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("foodName")?.value.trim();
        const quantity = document.getElementById("quantity")?.value.trim();
        const location = document.getElementById("location")?.value.trim();
        const donor = document.getElementById("donorName")?.value.trim();

        if (!name || !quantity || !location || !donor) {
            showToast("Please fill in all fields.");
            return;
        }

        const newDonation = {
            id: Date.now(),
            name: name,
            quantity: quantity,
            location: location,
            donor: donor,
            status: "Available"
        };

        donations.push(newDonation);
        totalDonations++;

        updateCounters();
        updateActivity(name + " donated successfully");

        renderDonations();
        donationForm.reset();

        showToast("Your food donation was added!");
    });
}

// Open login/register popup
function openModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("show");
    }
}

// Close login/register popup
function closeModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

// Login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        showToast("Demo login submitted successfully!");
        closeModal();
        loginForm.reset();
    });
}

// Initialize website
document.addEventListener("DOMContentLoaded", function() {
    renderDonations();
    updateCounters();
});
