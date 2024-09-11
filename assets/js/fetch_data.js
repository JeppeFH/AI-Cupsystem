// Function der henter vores data
export async function fetchContestant() {
  try {
    const response = await fetch("./data/contestant.json");
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}
