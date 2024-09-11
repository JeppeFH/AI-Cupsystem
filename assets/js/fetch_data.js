export async function fetchContestant() {
  try {
    const response = await fetch("./data/contestants.json");
    const contestants = await response.json();

    return contestants;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}
