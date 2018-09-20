// Our root component
import "./index.scss";
import { Component } from "preact";

import { Pubx } from "./services/pubx";
import { PUBX_CONFIG } from "./pubx.config";
import { WasmBoy } from "wasmboy";

import { NOTIFICATION_MESSAGES } from "./notification.messages";

import VaporBoyDesktop from "./components/vaporboyDesktop/vaporboyDesktop";
import VaporBoyMobileLandscape from "./components/vaporboyMobileLandscape/vaporboyMobileLandscape";
import VaporBoyMobilePortrait from "./components/vaporboyMobilePortrait/vaporboyMobilePortrait";
import VaporBoyExpanded from "./components/vaporboyExpanded/vaporboyExpanded";
import ControlPanel from "./components/controlPanel/controlPanel";
import ConfirmationModal from "./components/confirmationModal/confirmationModal";
import Touchpad from "./components/touchpad/touchpad";
import Notification from "./components/notification/notification";
import LoadingModal from "./components/loadingModal/loadingModal";

export default class App extends Component {
  constructor() {
    super();

    // Add our 3p Scripts
    if (typeof window !== "undefined") {
      this.initialize3p();
    }

    // Initialize our Pubx
    PUBX_CONFIG.INITIALIZE();

    window.addEventListener("resize", () => {
      this.changeLayout();
    });

    window.addEventListener("orientationchange", () => {
      this.changeLayout();
    });

    this.changeLayout();

    this.setState({
      layout: {}
    });
  }

  componentDidMount() {
    document.addEventListener("deviceready", () => {
      console.log("Cordova Launched Device Ready!");
    });

    // Subscribe to changes
    const pubxLayoutSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.LAYOUT_KEY,
      newState => {
        // First check if expanded is not the current state
        const oldExpanded = this.state.layout.expanded;

        // You can spread and overwrite variables, while preserving ones,
        // as long is in cascading order.
        this.setState({
          ...this.state,
          layout: {
            ...this.state.layout,
            ...newState
          },
          touchpadKey: this.getNewTouchpadKey()
        });

        if (oldExpanded !== newState.expanded) {
          this.changeLayout();
        }
      }
    );

    const pubxSettingsSubscriberKey = Pubx.subscribe(
      PUBX_CONFIG.VAPORBOY_OPTIONS_KEY,
      newState => {
        this.setState({
          ...this.state,
          options: {
            ...this.state.options,
            ...newState
          }
        });

        this.updateOptionsClasses();
      }
    );

    this.setState({
      layout: {
        ...Pubx.get(PUBX_CONFIG.LAYOUT_KEY)
      },
      options: {
        ...Pubx.get(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY)
      },
      pubxLayoutSubscriberKey,
      pubxSettingsSubscriberKey,
      touchpadKey: this.getNewTouchpadKey()
    });

    // Updated the options clases
    this.updateOptionsClasses();

    // Print the beta disclaimer
    Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
      NOTIFICATION_MESSAGES.BETA_VERSION
    );
  }

  initialize3p() {
    const loadScript = require("load-script");

    // Setup Google Analytics
    loadScript(
      "https://www.googletagmanager.com/gtag/js?id=UA-125157178-1",
      function(err, script) {
        if (!err) {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "UA-125157178-1");

          // Add analytics to window
          window.gtag = gtag;
        }
      }
    );

    // TODO: Setup Cordova
    /*
    loadScript('cordova.js', function(err, script) {
      if (!err) {
        console.log('Loaded Cordova!');
      }
    })
    */
  }

  // Function to change out layout, called by resize events and things
  changeLayout() {
    const mobile = window.matchMedia("(max-width: 801px)").matches;
    const landscape = window.matchMedia("screen and (orientation: landscape)")
      .matches;
    const portrait = window.matchMedia("screen and (orientation: portrait)")
      .matches;

    // Get our document class list
    const documentClassList = document.documentElement.classList;

    // Add all Media query based on mobile vs desktop
    if (mobile) {
      documentClassList.add("mobile");
      documentClassList.remove("desktop");
    } else {
      documentClassList.remove("mobile");
      documentClassList.add("desktop");
    }
    if (landscape) {
      documentClassList.add("landscape");
    } else {
      documentClassList.remove("landscape");
    }
    if (portrait) {
      documentClassList.add("portrait");
    } else {
      documentClassList.remove("portrait");
    }

    // Add our expanded class
    if (this.state.layout && this.state.layout.expanded) {
      documentClassList.add("expanded");
    } else {
      documentClassList.remove("expanded");
    }

    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, {
      mobile: mobile,
      landscape: landscape && mobile,
      portrait: portrait && mobile
    });
  }

  getNewTouchpadKey() {
    return (
      "" +
      Math.random()
        .toString(36)
        .substr(1, 9)
    );
  }

  updateOptionsClasses() {
    // Get our document class list
    const documentClassList = document.documentElement.classList;
    if (this.state.options.hideGamepadInExpandedMode) {
      documentClassList.add("hide-expanded-gamepad");
    } else {
      documentClassList.remove("hide-expanded-gamepad");
    }
  }

  render() {
    // Define our layouts
    let vaporboyDesktopLayout = <VaporBoyDesktop />;
    let vaporboyMobileLandscapeLayout = <VaporBoyMobileLandscape />;
    let vaporboyMobilePortraitLayout = <VaporBoyMobilePortrait />;
    let vaporboyExpandedLayout = <VaporBoyExpanded />;

    // Get our current layout
    let currentLayout = vaporboyDesktopLayout;
    if (this.state.layout.mobile) {
      if (this.state.layout.landscape) {
        currentLayout = vaporboyMobileLandscapeLayout;
      } else {
        currentLayout = vaporboyMobilePortraitLayout;
      }
    }

    if (this.state.layout.expanded) {
      currentLayout = vaporboyExpandedLayout;
    }

    return (
      <div>
        <a href="#" class="a11y-link">
          Hello! I see you are using a screen reader. Welcome to vaporboy! I
          tried my best to make this as acessible as possible. You should be
          able to load, modify, and play roms with just a keyboard and
          screenreader. And you can use your keyboard to control the game. The
          keyboard layout is the normal arrow keys, and z, x key layout.
          However, I would suggest using a regular hardware game controller for
          both desktop and mobile. This should make things the most comfortable
          to use in my opinion. Feel free to open accessibilty issues in the git
          hub project repo. You can find the git hub project repo in the control
          panel, about section. Thanks for playing!
        </a>
        <ConfirmationModal />
        <ControlPanel />
        <Notification />
        <LoadingModal />
        <div aria-hidden="true">{currentLayout}</div>
        <Touchpad key={this.state.touchpadKey} />
      </div>
    );
  }
}
