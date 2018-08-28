const basePath = "assets/homebrew";

export const AVAILABLE_GAMES = [
  {
    title: "Tobu Tobu Girl",
    link: "http://tangramgames.dk/tobutobugirl/",
    ROMPath: `${basePath}/tobutobugirl/tobutobugirl.gb`,
    imagePath: `${basePath}/tobutobugirl/tobutobugirl.png`,
    infoElement: (
      <div>
        <p>
          Tobu Tobu Girl is a fun and challenging arcade platformer developed by
          Tangram Games featuring an original soundtrack by potato-tan. Licensed
          under MIT/CC-BY.
        </p>
        <ul>
          <li>
            <a href="http://tangramgames.dk/tobutobugirl/" target="_blank">
              Homepage
            </a>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "uCity",
    link: "https://github.com/AntonioND/ucity",
    ROMPath: `${basePath}/ucity/ucity.gbc`,
    imagePath: `${basePath}/ucity/ucity.png`,
    infoElement: (
      <div>
        <p>
          This is µCity (also spelled 'uCity', pronounced 'micro-city'), the
          open-source city-building game for Game Boy Color by AntonioND.
          Licensed under GPLv3.
        </p>
        <ul>
          <li>
            <a href="https://github.com/AntonioND/ucity" target="_blank">
              Github Repo
            </a>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "Geometrix",
    link: "https://github.com/AntonioND/geometrix",
    ROMPath: `${basePath}/geometrix/geometrix.gbc`,
    imagePath: `${basePath}/geometrix/geometrix.png`,
    infoElement: (
      <div>
        <p>
          This is a very simple puzzle game in which the objective is to create
          rows or columns of 3 or more of the same geometric form by AntonioND.
          Licensed under GPLv3.
        </p>
        <ul>
          <li>
            <a href="https://github.com/AntonioND/geometrix" target="_blank">
              Github Repo
            </a>
          </li>
        </ul>
      </div>
    )
  }
];
