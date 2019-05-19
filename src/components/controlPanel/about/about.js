import { Component } from "preact";

import { getVaporBoyLogo } from "../../../vaporboyLogo";

const packageJson = require("../../../../package.json");

export default class About extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (window !== undefined && window.gtag) {
      gtag("event", "about_opened");
    }
  }

  render() {
    return (
      <div class="about">
        <h1>About</h1>
        <img src={getVaporBoyLogo()} />
        <p class="version">Vaporboy Version {packageJson.version}</p>
        <p class="version">
          <a href="https://github.com/torch2424/wasmBoy" target="_blank">
            WasmBoy
          </a>{" "}
          Version {packageJson.dependencies.wasmboy}
        </p>
        <p>
          <b>Vaporboy</b> is a Gameboy & Gameboy Color{" "}
          <a
            href="https://developers.google.com/web/progressive-web-apps/"
            target="_blank"
          >
            PWA
          </a>. Vaporboy emulates ROMs using{" "}
          <a href="https://github.com/torch2424/wasmBoy" target="_blank">
            WasmBoy
          </a>. Both VaporBoy and WasmBoy are open source under the{" "}
          <a
            href="https://choosealicense.com/licenses/apache-2.0/"
            target="_blank"
          >
            Apache License 2.0
          </a>. You can fork/contribute to VaporBoy, the Preact PWA shell, at
          the{" "}
          <a href="https://github.com/torch2424/vaporBoy" target="_blank">
            VaporBoy Github Repo
          </a>. You can fork/contribute to WasmBoy, the Core Library written for
          Web Assembly in AssemblyScript and Demo in Preact, at the{" "}
          <a href="https://github.com/torch2424/wasmBoy" target="_blank">
            WasmBoy Github Repo
          </a>. VaporBoy and WasmBoy were developed by{" "}
          <a href="https://aaronthedev.com" target="_blank">
            Aaron Turner
          </a>.
          <b>VaporBoy is still in beta</b>. Please expect bugs. And check the{" "}
          <b>F.A.Q</b> for where to report them.
        </p>
        <h1>F.A.Q</h1>
        <ul>
          <li>
            <h3>Where can I get ROMs of games?</h3>
            <p>
              ROMs can be obtained by many open source developers in the Gameboy
              open-source community. First, I would like to suggest{" "}
              <a href="https://gbhh.avivace.com/" target="_blank">
                Homebrew Hub by avivace
              </a>. This site attempts to "collect, archive and save every
              unofficial game, homebrew, patch, hackrom for Game Boy produced by
              the community through decades of passionate work". Another good
              resource is the{" "}
              <a
                href="https://github.com/avivace/awesome-gbdev"
                target="_blank"
              >
                awesome-gbdev
              </a>{" "}
              awesome list. This contains a bunch of resources of how to develop
              on the GB/GBC platform, as well as aleady developer projects. In
              terms of commercial ROMs and games, downloading commercial ROMs is
              illegal, and frowned upon by the VaporBoy and WasmBoy authors.
              Though, depending on your contry, Dumping ROMs of cartridges you
              own, is legal. This process can be found online, by searching on
              the internet. For more information on the legality of ROMs and
              emulation, I found
              <a
                href="https://gaming.stackexchange.com/questions/239821/game-emulation-legally"
                target="_blank"
              >
                this stack exchange answer to be a good resource
              </a>.
              <b>P.S I am not a lawyer, or a legal advisor.</b>
            </p>
          </li>

          <li>
            <h3>What file types are supported by VaporBoy?</h3>
            <p>
              VaporBoy uses WasmBoy as its emulation library, thus, it supports
              the same file types as WasmBoy. As of this time of writing,
              WasmBoy supports ".gb", ".gbc", and ".zip" files that contain the
              one of the other types.
            </p>
          </li>

          <li>
            <h3>Where can I report bugs/issues or suggest features?</h3>
            <p>
              Bugs and Sugesstions can be filed at the{" "}
              <a href="https://github.com/torch2424/vaporBoy" target="_blank">
                VaporBoy Github Repo
              </a>.
            </p>
          </li>

          <li>
            <h3>Who developed VaporBoy/WasmBoy?</h3>
            <p>
              VaporBoy and WasmBoy were developed by{" "}
              <a href="https://aaronthedev.com" target="_blank">
                Aaron Turner
              </a>, and the amazing contributors on each respective repo.
            </p>
          </li>

          <li>
            <h3>What is VaporBoy/WasmBoy's License?</h3>
            <p>
              Both projects are licensed under the{" "}
              <a
                href="https://choosealicense.com/licenses/apache-2.0/"
                target="_blank"
              >
                Apache License 2.0
              </a>.
            </p>
          </li>
        </ul>
        <h1>System Requirements & Performance</h1>
        <p>
          From manual testing, I've found that most laptops and desktops should
          be able to run the emulator at full speed easily. However, running
          emulators within a web browser is still a challenge for mobile
          browsers. I've found most flaship devices from 2016 and newer can tend
          to run the emulator at full speed. For instance, I've found that
          devices with a{" "}
          <a href="https://browser.geekbench.com/" target="_blank">
            Geekbench
          </a>{" "}
          single core score above 1400 have the best chance of running the
          emulator at a full 60 frames per second. For improving performance,
          check the <b>Control Panel > Configure Options > Performance</b>{" "}
          section. There you will see options for adjusting performance, with
          detailed explanations of what each option does.
        </p>
        <h1>Notable Open Source Packages & Shout Outs</h1>
        <ul>
          <li>
            <a href="https://github.com/torch2424/wasmBoy" target="_blank">
              WasmBoy
            </a>{" "}
            - the GB/GBC emulation core library.
          </li>

          <li>
            <a href="https://github.com/AssemblyScript" target="_blank">
              AssemblyScript
            </a>{" "}
            - Typescript to Web Assembly language.
          </li>

          <li>
            <a href="https://preactjs.com/" target="_blank">
              Preact
            </a>{" "}
            - lightweight frontend PWA JS framework.
          </li>

          <li>
            <a
              href="https://torch2424.github.io/aesthetic-css/"
              target="_blank"
            >
              A E S T H E T I C C S S
            </a>{" "}
            - Our Vaporwave inspired CSS framework.
          </li>

          <li>
            <a
              href="https://github.com/torch2424/responsive-gamepad"
              target="_blank"
            >
              responsive-gamepad
            </a>{" "}
            - Keyboard, Touch, and controller input library.
          </li>

          <li>
            <a href="https://leahrosegarza.com/" target="_blank">
              Leah Rose Garza
            </a>{" "}
            - For making the amazing Vaporboy logo.
          </li>

          <li>Anyone/Anything I am forgetting. 🤔</li>

          <li>You! Thanks for Playing! 🎮 😄 🎮</li>
        </ul>
        <h1>Analytics & Privacy</h1>
        <p>
          Analytics is used on this application simply for performance monitoring, and tracking popularity of the applications. The following events are sent, with nothing more than the event name. The analytics provider used is <a href="https://support.google.com/analytics/answer/6004245?ref_topic=2919631" target="_blank">Google Analytics</a>. We also have a <a target="_blank" href="/assets/privacypolicy.html">Privacy Policy</a>. Which simply expands on this a little bit more.
        </p>
        <p><b>The following events are sent to the analytics provider:</b></p>
        <ul>
          <li>Save State Created</li>
          <li>Homebrew ROM Loaded</li>
          <li>My Collection ROM Loaded</li>
          <li>Scraper opened</li>
          <li>Manual reload</li>
          <li>Settings Applied</li>
          <li>Install opened</li>
          <li>Scraper skipped</li>
          <li>Scraper Search</li>
          <li>About Opened</li>
          <li>Scaper Manual Input</li>
          <li>Settings reset</li>
          <li>Google Drive ROM Load</li>
        </ul>
      </div>
    );
  }
}
