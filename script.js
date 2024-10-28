function openMenu() {
    var menuOverlay = document.getElementById("menuOverlay");

    if (menuOverlay.classList.contains("hidden")) {
        // Show the overlay and add the slide-in animation
        menuOverlay.classList.remove("hidden");
        menuOverlay.classList.add("slide-in");
    } else {
        // Hide the overlay
        menuOverlay.classList.add("hidden");
        menuOverlay.classList.remove("slide-in"); // Optional: Remove animation class if desired
    }
}

//get current location
function getLocationPage() {
    return window.location.pathname;
}

console.log(getLocationPage());

const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", openMenu);
