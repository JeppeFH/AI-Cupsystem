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

  // If only one contestant (perhaps automatically moving to the next round)
  return `
      <div class="match">
        <div class="contestant">
          <p class="title">${contestant1.name}</p>
        </div>
      </div>
    `;
};

export const roundTmpl = (matchesHTML) => `
    <div class="round-column">
      ${matchesHTML}
    </div>
  `;
