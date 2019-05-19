import { Component } from "preact";

export default class Install extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (window !== undefined && window.gtag) {
      gtag("event", "install_opened");
    }
  }

  render() {
    return (
      <div class="install">
        <h1>Install</h1>
        <div class="install__logo">⬇️</div>
        <p>
          These are instructions for installing VaporBoy as a{" "}
          <a
            href="https://developers.google.com/web/progressive-web-apps/"
            target="_blank"
          >
            Progressive Web App (PWA)
          </a>{" "}
          on your device. Please note,{" "}
          <b>
            {" "}
            a native{" "}
            <a href="https://cordova.apache.org/" target="_blank">
              Cordova
            </a>{" "}
            and{" "}
            <a href="https://electronjs.org/" target="_blank">
              Electron
            </a>{" "}
            app are in consideration for development as well
          </b>. Installing the application as a PWA on your device will offer
          the following features:
          <ul>
            <li>Fullscreen/Standalone support</li>
            <li>Better scroll support</li>
            <li>Automatic Data Backups (depending on OS)</li>
            <li>Better Offline support</li>
            <li>And more!</li>
          </ul>
        </p>
        <h3>Android</h3>
        <p>
          Click the:{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          (View More) button in the top right corner of your web browser, and
          then, <b>"Add to homescreen"</b>. Alternatively on Firefox, there may
          be a "home" icon with a plus (+) icon inside it near the URL bar to
          install VaporBoy.
        </p>
        <h3>iOS</h3>
        <p>
          Click the
          <img src="/assets/iosShare.png" class="install__ios-icon" />
          button, and then the
          <img src="/assets/iosAddToHomescreen.png" class="install__ios-icon" />
          button.
        </p>
        <h3>Desktop (Chrome)</h3>
        <p>
          Click the three dots <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg> in the upper right hand corner to open your browser's menu.
          Then click the "Install VaporBoy..." list item to install the application.
        </p>
      </div>
    );
  }
}
