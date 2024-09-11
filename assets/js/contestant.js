import { fetchContestant } from "./fetch_data.js";
import { contestantTmpl } from "./template.js";

let contestants = await fetchContestant();

export function cupContestants() {
  let cupContainer = document.querySelector(".cup-container");

  if (cupContainer) {
    contestants.forEach((cup) => {
      cupContainer.insertAdjacentHTML("beforeend", contestantTmpl(cup));
    });
  }
}
