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
  bowlContestants.forEach((contestant) => {
    let contestantDiv = document.createElement("div");
    contestantDiv.className = "bowl-item";
    contestantDiv.innerText = contestant.name;
    bowlContainer.appendChild(contestantDiv);
  });
}

// Generate random pairs of contestants
export function generateRandomPairs() {
  let cupContainer = document.querySelector(".cup-container");
  cupContainer.innerHTML = ""; // Clear existing content

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
