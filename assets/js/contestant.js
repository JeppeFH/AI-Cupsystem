import { fetchContestant } from "./fetch_data.js";
import { contestantTmpl, roundTmpl } from "./template.js";

// Function to fetch contestants and start the tournament
export async function cupContestants() {
  try {
    // Fetch the contestants
    const contestants = await fetchContestant();

    // Log to check if data is correctly fetched
    console.log("Fetched contestants:", contestants);

    if (!contestants || contestants.length === 0) {
      console.error("No contestants available.");
      return;
    }

    // Render contestants
    renderContestants(contestants);

    // Simulate tournament
    const champion = await simulateTournament(contestants);
    console.log(`The champion is: ${champion.name}`);
  } catch (error) {
    console.error("Error in cupContestants:", error);
  }
}

// Function to render contestants into the DOM
function renderContestants(contestants) {
  const cupContainer = document.querySelector(".cup-container");

  if (!cupContainer) {
    console.error("Cup container not found.");
    return;
  }

  let matchesHTML = "";
  let remainingContestants = [...contestants]; // Clone the contestants array

  // Pair contestants for the first round
  while (remainingContestants.length > 1) {
    const contestant1 = remainingContestants.pop();
    const contestant2 = remainingContestants.pop();
    matchesHTML += contestantTmpl(contestant1, contestant2);
  }

  // If there's an odd contestant out, automatically advance to the next round
  if (remainingContestants.length === 1) {
    const contestant = remainingContestants.pop();
    matchesHTML += contestantTmpl(contestant);
  }

  // Insert the HTML for the first round into the container
  cupContainer.innerHTML = roundTmpl(matchesHTML);

  console.log("Contestants rendered to the DOM.");
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to simulate a match and randomly choose a winner
function simulateMatch(contestant1, contestant2) {
  console.log(`Match: ${contestant1.name} vs ${contestant2.name}`);
  const winner = Math.random() < 0.5 ? contestant1 : contestant2;
  console.log(`Winner: ${winner.name}`);
  return winner;
}

// Function to simulate a round of matches
function simulateRound(contestants) {
  let winners = [];

  for (let i = 0; i < contestants.length; i += 2) {
    if (i + 1 < contestants.length) {
      const winner = simulateMatch(contestants[i], contestants[i + 1]);
      winners.push(winner);
    } else {
      winners.push(contestants[i]); // Automatically move odd contestant to next round
    }
  }

  return winners;
}

// Function to simulate the entire tournament
async function simulateTournament(contestants) {
  if (!contestants || contestants.length === 0) {
    console.error("No contestants available for simulation.");
    return;
  }

  console.log("Starting tournament simulation...");

  shuffleArray(contestants); // Shuffle contestants for random pairings

  let round = 1;

  // Continue simulating rounds until we have one winner
  while (contestants.length > 1) {
    console.log(`Round ${round}:`);
    contestants = simulateRound(contestants); // Get winners of this round
    round++;
  }

  return contestants[0]; // Return the final champion
}
