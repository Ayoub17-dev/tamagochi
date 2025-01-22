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
    feedCount++;
    checkAchievements(); // Check achievements after each action
    updateStats();
  }
}

function sleep() {
  if (hunger > 0) { // Only check if hunger is greater than 0
    energy += 10;
    if (energy > 100) energy = 100; // Ensure energy does not exceed 100
    sleepCount++;
    checkAchievements(); // Check achievements after each action
    updateStats();
  }
}

function train() {
  if (hunger > 0 && energy > 0) {
    hunger -= 7;
    energy -= 10;
    if (hunger < 0) hunger = 0;
    if (energy < 0) energy = 0;
    trainCount++;
    checkAchievements(); // Check achievements after each action
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
  if (hunger > 0) hunger -= 7; // Hunger neemt alleen af als het groter dan 0 is.
  if (energy > 0) energy -= 10; // Energie neemt alleen af als het groter dan 0 is.

  // Reduce health if hunger or energy drops below 20
  if (hunger < 20 || energy < 20) {
    health -= 10; // Health depletes sneller als hunger of energy kritiek laag is.
  }

  // Zorg dat waarden niet onder 0 gaan
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

let feedCount = 0;
let sleepCount = 0;
let trainCount = 0;

function checkAchievements() {
  // Feed achievement
  if (feedCount >= 5 && !document.getElementById("achievement-feed").classList.contains("unlocked")) {
    document.getElementById("achievement-feed").classList.remove("locked");
    document.getElementById("achievement-feed").classList.add("unlocked");
  }

  // Sleep achievement
  if (sleepCount >= 5 && !document.getElementById("achievement-sleep").classList.contains("unlocked")) {
    document.getElementById("achievement-sleep").classList.remove("locked");
    document.getElementById("achievement-sleep").classList.add("unlocked");
  }

  // Train achievement
  if (trainCount >= 5 && !document.getElementById("achievement-train").classList.contains("unlocked")) {
    document.getElementById("achievement-train").classList.remove("locked");
    document.getElementById("achievement-train").classList.add("unlocked");
  }
}
