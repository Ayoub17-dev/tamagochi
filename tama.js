let hunger = 100;
let energy = 100;
let health = 100; // Initialize health at 100%

function updateStats() {
    // Update hunger bar and text
    document.getElementById("hunger-bar").value = hunger;
    document.getElementById("hunger-percent").textContent = hunger + "%";

    // Update energy bar and text
    document.getElementById("energy-bar").value = energy;
    document.getElementById("energy-percent").textContent = energy + "%";

    // Update health dynamically based on hunger and energy
    if (hunger < 20 || energy < 20) {
        health -= 2; // Decrease health faster when hunger or energy is critically low
    }
    health = Math.min(100, Math.max(0, health)); // Ensure health stays between 0 and 100
    document.getElementById("health-bar").value = health;
    document.getElementById("health-percent").textContent = health + "%";

    // Update message based on stats
    updateMessage();

    // Trigger Game Over screen if health reaches 0
    if (health <= 0) {
        showGameOverScreen();
    }
}

function updateMessage() {
    const messageElement = document.getElementById("tamagotchi-message");

    if (hunger < 50) {
        messageElement.textContent = "Hey! Feed me already!!";
    } else if (hunger > 70) {
        messageElement.textContent = "I'm stuffed!!";
    } else if (energy < 50) {
        messageElement.textContent = "I sure am tired...";
    } else if (health < 50) {
        messageElement.textContent = "I'm dying...";
    } else {
        messageElement.textContent = "I'm feeling great! Let's go!";
    }
}

function feed() {
    if (hunger > 0 && energy > 0) {
        hunger += 10;
        if (hunger > 100) hunger = 100;
        updateStats();
    }
}

function sleep() {
    if (hunger > 0 && energy > 0) {
        energy += 10;
        if (energy > 100) energy = 100;
        updateStats();
    }
}

function train() {
    if (hunger > 0 && energy > 0) {
        hunger -= 7;
        energy -= 10;
        if (hunger < 0) hunger = 0;
        if (energy < 0) energy = 0;
        updateStats();
    }
}

function showGameOverScreen() {
    document.getElementById("game").classList.add("hidden"); // Hide the game
    document.getElementById("game-over-screen").classList.remove("hidden"); // Show Game Over screen
}

function resetGame() {
    hunger = 100;
    energy = 100;
    health = 100; // Reset health
    updateStats();
    document.getElementById("game-over-screen").classList.add("hidden"); // Hide Game Over screen
    document.getElementById("game").classList.remove("hidden"); // Show the game
}

function passiveDepletion() {
    if (hunger > 0) hunger -= 7;
    if (energy > 0) energy -= 10;

    // Reduce health if hunger or energy drops below 20
    if (hunger < 20 || energy < 20) {
        health -= 10; // Health depletes faster when in critical condition
    }

    // Prevent negative values
    if (hunger < 0) hunger = 0;
    if (energy < 0) energy = 0;

    updateStats();
}

setInterval(passiveDepletion, 2000); // Decrease hunger and energy every 2 seconds

updateStats();

// Add music button functionality
document.querySelector("button").addEventListener("click", function () {
    document.getElementById("background-music").play();
});
