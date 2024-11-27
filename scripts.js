// Countdown Timer
function startCountdown() {
    // Set your website launch date and time here
    const launchDate = new Date("2024-11-27T18:00:00"); // Adjust to your launch date and time

    // Ensure the launchDate is valid
    if (isNaN(launchDate.getTime())) {
        console.error("Invalid launch date. Please set a valid date in the 'launchDate' variable.");
        return;
    }

    // Calculate the countdown target time (2 hours prior to launch)
    const countdownStartTime = new Date(launchDate.getTime() - 2 * 60 * 60 * 1000); // Subtract 2 hours

    // Find the countdown element
    const timerElement = document.getElementById("countdown");
    if (!timerElement) {
        console.error("Countdown element not found. Please check your HTML structure.");
        return;
    }

    // Define the post-launch message
    const postLaunchMessage = "🎉 $CHED is LIVE! 🚀";

    function updateCountdown() {
        const now = new Date();
        const timeLeft = countdownStartTime - now;

        // If time is up, display the post-launch message
        if (timeLeft <= 0) {
            timerElement.textContent = postLaunchMessage;
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time components
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update countdown display
        timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call immediately to avoid delay
}

// Interactive Roadmap Hover Effect
function setupRoadmapHover() {
    const roadmapItems = document.querySelectorAll(".roadmap-item");

    // Ensure roadmap items exist
    if (!roadmapItems.length) {
        console.error("Roadmap items not found. Please check your HTML structure.");
        return;
    }

    roadmapItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            const description = item.getAttribute("data-description");
            if (!description) return;

            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = description;
            document.body.appendChild(tooltip);

            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY}px`;

            item.addEventListener("mouseout", () => {
                if (tooltip.parentNode) {
                    document.body.removeChild(tooltip);
                }
            }, { once: true });
        });
    });
}

// Initialize Features
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();
    setupRoadmapHover();
});
