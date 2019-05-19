import { Component } from "preact";

import { getVaporBoyLogo } from "../../../vaporboyLogo";

const packageJson = require("../../../../package.json");

export default class Legacy extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (window !== undefined && window.gtag) {
      gtag("event", "legacy_opened");
    }
  }

  goToLegacyVersion(version) {
    // Find the version of the saveState in the legacy versions
    const legacyVersion = packageJson.legacyVersions[packageJson.legacyVersions.indexOf(version)];
    // Redirect to the legacy vaporby version
    window.location.pathname = `/legacy/vaporboy-${legacyVersion}/`;
  }

  render() {

    const legacyVersions = [];
    packageJson.legacyVersions.forEach((version) => {
      legacyVersions.unshift((
        <li>
          <button onClick={() => this.goToLegacyVersion(version)}>
            <h3>Version: {version}</h3>
          </button>
        </li>
      ));
    });

    return (
      <div class="legacy">
        <h1>Legacy VaporBoy Versions</h1>
        <p>Older version of VaporBoy. Should only be used to continue / finish progress made on ROMS that were started on a previous version of VaporBoy. These versions are no longer supported / maintained. <b>Click a version to get redirected to the legacy version.</b></p>
        <ul>
          {legacyVersions}
        </ul>
      </div>
    );
  }
}
