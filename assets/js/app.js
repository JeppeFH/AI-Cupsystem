import { generateRandomPairs, resetTournament } from "./contestant.js";

const app = {};

// Initialize the app and add event listeners for the buttons
app.init = () => {
  // Load the bowl with all contestants initially
  resetTournament();

  // Add event listener for "Generate" button
  document.getElementById("generate-btn").addEventListener("click", () => {
    generateRandomPairs();
  });

  // Add event listener for "Reset" button
  document.getElementById("reset-btn").addEventListener("click", () => {
    resetTournament();
  });
};

app.init();
