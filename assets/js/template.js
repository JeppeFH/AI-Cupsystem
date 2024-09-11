export const contestantTmpl = (contestant1, contestant2 = null) => {
  // If there are two contestants in the match, display both
  if (contestant2) {
    return `
      <div class="match">
        <div class="contestant">
          <p class="title">${contestant1.name}</p>
        </div>
        <div class="line"></div>
        <div class="contestant">
          <p class="title">${contestant2.name}</p>
        </div>
      </div>
    `;
  }

  // If there's only one contestant, show them as advancing to the next round
  return `
    <div class="match">
      <div class="contestant">
        <p class="title">${contestant1.name} advances</p>
      </div>
    </div>
  `;
};
