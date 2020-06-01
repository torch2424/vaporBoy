import { Pubx } from "./services/pubx";
import {
  VAPORBOY_DEFAULT_OPTIONS,
  VAPORBOY_OPTIONS_LOCALSTORAGE_KEY
} from "./vaporboyOptions.config";
import {
  VAPORBOY_DEFAULT_EFFECTS,
  VAPORBOY_EFFECTS_LOCALSTORAGE_KEY
} from "./vaporboyEffects.config";

export const PUBX_CONFIG = {
  LAYOUT_KEY: "LAYOUT_KEY",
  CONTROL_PANEL_KEY: "CONTROL_PANEL_KEY",
  CONFIRMATION_MODAL_KEY: "CONFIRMATION_MODAL_KEY",
  ROM_COLLECTION_KEY: "ROM_COLLECTION_KEY",
  ROM_SCRAPER_KEY: "ROM_SCRAPER_KEY",
  SAVES_STATES_KEY: "SAVE_STATES_KEY",
  VAPORBOY_OPTIONS_KEY: "VAPORBOY_OPTIONS_KEY",
  VAPORBOY_EFFECTS_KEY: "VAPORBOY_EFFECTS_KEY",
  NOTIFICATION_KEY: "NOTIFICATION_KEY",
  LOADING_KEY: "LOADING_KEY",
  SPEED_KEY: "SPEED_KEY",
  INITIALIZE: () => {
    initializePubxLayout();
    initializePubxControlPanel();
    initializePubxConfirmationModal();
    initializePubxROMScraper();
    initializePubxVaporBoyOptions();
    initializePubxVaporBoyEffects();
    initializePubxNotification();
    initializePubxLoading();
    initializePubxSpeed();
  }
};

const initializePubxLayout = () => {
  const pubxLayoutState = {
    expanded: false,
    mobile: false,
    landscape: false,
    portrait: false,
    isGba: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return (
        !pubxLayoutState.expanded &&
        pubxLayoutState.mobile &&
        pubxLayoutState.landscape
      );
    },
    isGbc: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return (
        !pubxLayoutState.expanded &&
        pubxLayoutState.mobile &&
        pubxLayoutState.portrait
      );
    },
    isExpandedMobile: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return pubxLayoutState.expanded && pubxLayoutState.mobile;
    }
  };
  Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, pubxLayoutState);
};

const initializePubxControlPanel = () => {
  // Control Panel
  const pubxControlPanelState = {
    show: false,
    required: false,
    viewStack: [],
    addComponentToControlPanelViewStack: (title, component) => {
      const viewStack = Pubx.get(PUBX_CONFIG.CONTROL_PANEL_KEY).viewStack;

      viewStack.push({
        title,
        view: component
      });

      Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
        viewStack
      });
    },
    hideControlPanel: () => {
      Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, {
        show: false,
        required: false,
        viewStack: []
      });
    }
  };
  Pubx.publish(PUBX_CONFIG.CONTROL_PANEL_KEY, pubxControlPanelState);
};

const initializePubxConfirmationModal = () => {
  // Confirmation modal
  const pubxConfirmationModalState = {
    show: false,
    title: "",
    text: "",
    confirmCallback: false,
    cancelCallback: false,
    showConfirmationModal: passedParams => {
      // Set up our modal params, with defaults
      const confirmationModalParams = {
        title: "",
        contentElement: <div />,
        confirmCallback: undefined,
        cancelCallback: undefined,
        confirmText: "OK",
        cancelText: "Cancel"
      };

      if (passedParams) {
        Object.keys(confirmationModalParams).forEach(paramKey => {
          if (passedParams[paramKey]) {
            confirmationModalParams[paramKey] = passedParams[paramKey];
          }
        });
      }

      Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, {
        show: true,
        title: confirmationModalParams.title,
        contentElement: confirmationModalParams.contentElement,
        confirmCallback: confirmationModalParams.confirmCallback,
        cancelCallback: confirmationModalParams.cancelCallback,
        confirmText: confirmationModalParams.confirmText,
        cancelText: confirmationModalParams.cancelText
      });
    },
    hideConfirmationModal: () => {
      Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, {
        show: false,
        title: "",
        text: "",
        confirmCallback: false,
        cancelCallback: false
      });
    }
  };
  Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, pubxConfirmationModalState);
};

const initializePubxROMScraper = () => {
  const pubxROMScraperState = {
    activeTabIndex: 0,
    ROMInfo: undefined,
    selectedROMIndex: -1
  };
  Pubx.publish(PUBX_CONFIG.ROM_SCRAPER_KEY, pubxROMScraperState);
};

const initializePubxVaporBoyOptions = () => {
  // Vaporboy Options
  // Grab our options from localstorage
  let vaporBoyOptions = JSON.parse(
    window.localStorage.getItem(VAPORBOY_OPTIONS_LOCALSTORAGE_KEY)
  );
  // If we dont have vapor boy options, generate them
  if (!vaporBoyOptions) {
    // Fill/save our default options
    window.localStorage.setItem(
      VAPORBOY_OPTIONS_LOCALSTORAGE_KEY,
      JSON.stringify({
        ...VAPORBOY_DEFAULT_OPTIONS
      })
    );
    vaporBoyOptions = Object.assign({}, VAPORBOY_DEFAULT_OPTIONS);
  }

  Pubx.publish(PUBX_CONFIG.VAPORBOY_OPTIONS_KEY, vaporBoyOptions);
};

const initializePubxVaporBoyEffects = () => {
  // Vaporboy Effects
  // Grab our effects settings from localstorage
  let vaporBoyEffects = JSON.parse(
    window.localStorage.getItem(VAPORBOY_EFFECTS_LOCALSTORAGE_KEY)
  );
  // If we dont have vapor boy options, generate them
  if (!vaporBoyEffects) {
    // Fill/save our default options
    window.localStorage.setItem(
      VAPORBOY_EFFECTS_LOCALSTORAGE_KEY,
      JSON.stringify({
        ...VAPORBOY_DEFAULT_EFFECTS
      })
    );
    vaporBoyEffects = Object.assign({}, VAPORBOY_DEFAULT_EFFECTS);
  }

  Pubx.publish(PUBX_CONFIG.VAPORBOY_EFFECTS_KEY, vaporBoyEffects);
};

const initializePubxNotification = () => {
  const pubxNotificationState = {
    text: "",
    isVisible: false,
    isError: false,
    showNotification: (text, isError) => {
      Pubx.publish(PUBX_CONFIG.NOTIFICATION_KEY, {
        text: text,
        isVisible: true,
        isError: isError ? true : false
      });
    }
  };
  Pubx.publish(PUBX_CONFIG.NOTIFICATION_KEY, pubxNotificationState);
};

const initializePubxLoading = () => {
  const pubxLoadingState = {
    promiseStack: [],
    addPromiseToStack: promise => {
      Pubx.publish(PUBX_CONFIG.LOADING_KEY, {
        promiseStack: [
          ...Pubx.get(PUBX_CONFIG.LOADING_KEY).promiseStack,
          promise
        ]
      });
    },
    clearPromiseStack: () => {
      Pubx.publish(PUBX_CONFIG.LOADING_KEY, {
        promiseStack: []
      });
    }
  };
  Pubx.publish(PUBX_CONFIG.LOADING_KEY, pubxLoadingState);
};

const initializePubxSpeed = () => {
  let speed = 1.0;
  const pubxSpeedState = {
    toggleSpeed: () => {
      speed += 0.5;
      if (speed > 2.0) {
        speed = 0.5;
      }
    },
    getSpeed: () => {
      return speed;
    },
    resetSpeed: () => {
      speed = 1.0;
    }
  };
  Pubx.publish(PUBX_CONFIG.SPEED_KEY, pubxSpeedState);
};
