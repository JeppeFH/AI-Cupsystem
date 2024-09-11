export const contestantTmpl = (contestant1, contestant2 = null) => {
  // If there are two contestants, display the match between them
  if (contestant2) {
    return `
      <div class="match">
        <div class="contestant">
          <p class="title">${contestant1.name}</p>
        </div>
        <div class="line">vs</div>
        <div class="contestant">
          <p class="title">${contestant2.name}</p>
        </div>
      </div>
    `;
  }

  return "";
};
