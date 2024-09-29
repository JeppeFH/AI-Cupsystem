import { fetchContestant } from "./fetch_data.js";
import { contestantTmpl } from "./template.js";

let contestants = [];
let bowlContestants = [];
let round = 1; // Tracker runder
let nextRoundContestants = []; // Tracker contestant for næste runde

// Fetch contestants when the page loads
const loadContestants = async () => {
  contestants = await fetchContestant();
  bowlContestants = [...contestants];
  displayBowl();
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
    contestantDiv.dataset.index = index;
    bowlContainer.appendChild(contestantDiv);
  });
}

// Function to generate a new round container dynamically
function createRoundContainer(roundNumber) {
  let tournamentContainer = document.querySelector(".tournament-container");
  let roundDiv = document.createElement("div");
  roundDiv.className = `cup-container round-${roundNumber}`;
  roundDiv.innerHTML = `<h3>Runde ${roundNumber}</h3>`;
  tournamentContainer.appendChild(roundDiv);
  return roundDiv;
}

// Function to handle manual winner selection
function handleWinnerSelection(matchElement, contestant1, contestant2) {
  const contestants = matchElement.querySelectorAll(".contestant");

  contestants.forEach((contestant) => {
    contestant.addEventListener("click", () => {
      contestants.forEach((e) => e.classList.remove("selected"));

      // Mark the selected contestant
      contestant.classList.add("selected");

      // Determine the winner and add to the next round
      if (contestant.classList.contains("selected")) {
        nextRoundContestants.push(contestant1);
      } else {
        nextRoundContestants.push(contestant2);
      }

      // Check if all winners for the round have been selected
      const allMatches = matchElement.parentElement.querySelectorAll(".match");
      const winnersSelected = Array.from(allMatches).every((match) =>
        match.querySelector(".contestant.selected")
      );

      if (winnersSelected) {
        proceedToNextRound(); // Move to the next round once all winners are selected
      }
    });
  });
}

// Generate random pairs of contestants for each round
export function generateRandomPairs() {
  let currentRoundContainer = createRoundContainer(round);
  let remainingContestants = [...bowlContestants];
  nextRoundContestants = []; // Reset next round winners

  // Shuffle the contestants in the bowl
  shuffleArray(remainingContestants);

  // Create pairs of contestants
  while (remainingContestants.length > 1) {
    const contestant1 = remainingContestants.pop();
    const contestant2 = remainingContestants.pop();

    // Insert the match into the current round container
    currentRoundContainer.insertAdjacentHTML(
      "beforeend",
      contestantTmpl(contestant1, contestant2)
    );

    // Get the match element and add click listeners for manual selection
    const matchElement = currentRoundContainer.lastElementChild;
    handleWinnerSelection(matchElement, contestant1, contestant2);
  }

  // If there's an odd number of contestants, this part will be handled to ensure no automatic selection
  // Ensure to prompt to select a winner from remaining contestants
  if (remainingContestants.length === 1) {
    const loneContestant = remainingContestants.pop();
    currentRoundContainer.insertAdjacentHTML(
      "beforeend",
      contestantTmpl(loneContestant)
    );
    nextRoundContestants.push(loneContestant);
  }

  // Update the bowl for the next round
  bowlContestants = nextRoundContestants;
}

// Function to proceed to the next round
function proceedToNextRound() {
  let cupContainer = document.querySelector(".tournament-container");
  cupContainer.innerHTML = "";

  // Increment round and generate pairs for the next round
  round++;
  if (bowlContestants.length > 1) {
    generateRandomPairs();
  } else {
    declareWinner(); // If only one contestant remains, declare the winner
  }
}

// Function to declare the final winner
function declareWinner() {
  const winnerContainer = document.createElement("div");
  winnerContainer.className = "final-winner-container";
  winnerContainer.innerHTML = `<h2>Vinderen er ${bowlContestants[0].name}!</h2>`;
  document.querySelector(".tournament-container").appendChild(winnerContainer);
}

// Reset the tournament to allow for a new generation
export function resetTournament() {
  bowlContestants = [...contestants]; // Reset the bowl
  let cupContainer = document.querySelector(".tournament-container");
  cupContainer.innerHTML = "";
  round = 1;
  displayBowl();
}

// Load contestants when the script runs
loadContestants();
