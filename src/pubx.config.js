import device from "current-device";
import { Pubx } from "./services/pubx";
import { VAPORBOY_DEFAULT_OPTIONS } from "./vaporboyOptions.config";
import { VAPORBOY_OPTIONS_LOCALSTORAGE_KEY } from "./vaporboyOptions.config";

export const PUBX_CONFIG = {
  LAYOUT_KEY: "LAYOUT_KEY",
  CONTROL_PANEL_KEY: "CONTROL_PANEL_KEY",
  ROM_COLLECTION_KEY: "ROM_COLLECTION_KEY",
  SAVES_STATES_KEY: "SAVE_STATES_KEY",
  CONFIRMATION_MODAL_KEY: "CONFIRMATION_MODAL_KEY",
  VAPORBOY_OPTIONS_KEY: "VAPORBOY_OPTIONS_KEY",
  INITIALIZE: () => {
    initializePubxLayout();
    initializePubxControlPanel();
    initializePubxConfirmationModal();
    initializePubxVaporBoyOptions();
  }
};

const initializePubxLayout = () => {
  const pubxLayoutState = {
    expanded: false,
    mobile: device.mobile(),
    landscape: device.landscape(),
    portrait: device.portrait(),
    isGba: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return !pubxLayoutState.expanded && device.mobile() && device.landscape();
    },
    isGbc: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return !pubxLayoutState.expanded && device.mobile() && device.portrait();
    },
    isExpandedMobile: () => {
      const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
      return pubxLayoutState.expanded && device.mobile();
    }
  };
  Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, pubxLayoutState);
};

const initializePubxControlPanel = () => {
  // Control Panel
  const pubxControlPanelState = {
    show: false,
    rootView: false,
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
        rootView: false,
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
    showConfirmationModal: (
      title,
      contentElement,
      confirmCallback,
      cancelCallback
    ) => {
      Pubx.publish(PUBX_CONFIG.CONFIRMATION_MODAL_KEY, {
        show: true,
        title,
        contentElement,
        confirmCallback,
        cancelCallback
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
