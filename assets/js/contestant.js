import { fetchContestant } from "./fetch_data.js";
import { contestantTmpl } from "./template.js";

let contestants = [];
let bowlContestants = [];

// Fetch contestants when the page loads
const loadContestants = async () => {
  contestants = await fetchContestant();
  bowlContestants = [...contestants]; // Copy the original contestants into the bowl
  displayBowl(); // Display names in the bowl
};

// Function to shuffle the contestants array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display contestants in the "bowl"
function displayBowl() {
  let bowlContainer = document.querySelector(".bowl");
  bowlContainer.innerHTML = ""; // Clear the bowl

  // Populate the bowl with contestant names
  bowlContestants.forEach((contestant, index) => {
    let contestantDiv = document.createElement("div");
    contestantDiv.className = "bowl-item";
    contestantDiv.innerText = contestant.name;
    contestantDiv.dataset.index = index; // Save index for reference

    // Random starting positions within the bowl
    const randomX = Math.floor(Math.random() * 100) - 50 + "%"; // -50% to 50%
    const randomY = Math.floor(Math.random() * 100) - 50 + "%"; // -50% to 50%
    contestantDiv.style.transform = `translate(${randomX}, ${randomY})`;

    // Append to bowl
    bowlContainer.appendChild(contestantDiv);
  });
}

// Function to apply random flying directions
function applyFlyingEffect() {
  const bowlItems = document.querySelectorAll(".bowl-item");

  bowlItems.forEach((item) => {
    // Generate random values for each contestant's movement
    const randomX = Math.floor(Math.random() * 200) - 100 + "px"; // -100px to 100px
    const randomY = Math.floor(Math.random() * 200) - 100 + "px"; // -100px to 100px

    // Apply the CSS variables for unique movement
    item.style.setProperty("--random-x", randomX);
    item.style.setProperty("--random-y", randomY);

    // Add the flying animation
    item.style.animation = "fly 2s ease-in-out infinite";
  });
}

// Generate random pairs of contestants with flying animation
export function generateRandomPairs() {
  let cupContainer = document.querySelector(".cup-container");
  cupContainer.innerHTML = ""; // Clear existing content

  // Apply the flying effect to all items in the bowl
  applyFlyingEffect();

  // After a couple of seconds (e.g., 2 seconds), stop the animation and draw the pairs
  setTimeout(() => {
    // Stop flying effect
    const bowlItems = document.querySelectorAll(".bowl-item");
    bowlItems.forEach((item) => {
      item.style.animation = ""; // Remove animation
    });

    // Shuffle the contestants in the bowl
    shuffleArray(bowlContestants);

    // Create pairs of contestants
    while (bowlContestants.length > 1) {
      const contestant1 = bowlContestants.pop();
      const contestant2 = bowlContestants.pop();

      // Insert the match into the DOM
      cupContainer.insertAdjacentHTML(
        "beforeend",
        contestantTmpl(contestant1, contestant2)
      );
    }

    // If an odd number of contestants, handle the last one
    if (bowlContestants.length === 1) {
      const loneContestant = bowlContestants.pop();
      cupContainer.insertAdjacentHTML(
        "beforeend",
        contestantTmpl(loneContestant)
      );
    }

    // Refresh the bowl display after drawing
    displayBowl();
  }, 2000); // Adjust this duration for how long you want the flying effect
}

// Reset the tournament to allow for a new generation
export function resetTournament() {
  bowlContestants = [...contestants]; // Reset the bowl
  let cupContainer = document.querySelector(".cup-container");
  cupContainer.innerHTML = ""; // Clear the current pairings
  displayBowl(); // Refill the bowl with contestants
}

// Load contestants when the script runs
loadContestants();
