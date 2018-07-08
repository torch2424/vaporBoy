import device from "current-device";
import { Pubx } from "./services/pubx";

export const PUBX_CONFIG = {
  LAYOUT_KEY: "LAYOUT_KEY",
  CONTROL_PANEL_KEY: "CONTROL_PANEL_KEY",
  ROM_COLLECTION_KEY: "ROM_COLLECTION_KEY",
  SAVES_STATES_KEY: "SAVE_STATES_KEY",
  CONFIRMATION_MODAL_KEY: "CONFIRMATION_MODAL_KEY",
  VAPORBOY_OPTIONS_KEY: "VAPORBOY_OPTIONS_KEY",
  INITIALIZE: () => {
    // Layout
    const pubxLayoutState = {
      expanded: false,
      mobile: device.mobile(),
      landscape: device.landscape(),
      portrait: device.portrait(),
      isGba: () => {
        const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
        return (
          !pubxLayoutState.expanded && device.mobile() && device.landscape()
        );
      },
      isGbc: () => {
        const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
        return (
          !pubxLayoutState.expanded && device.mobile() && device.portrait()
        );
      },
      isExpandedMobile: () => {
        const pubxLayoutState = Pubx.get(PUBX_CONFIG.LAYOUT_KEY);
        return pubxLayoutState.expanded && device.mobile();
      }
    };
    Pubx.publish(PUBX_CONFIG.LAYOUT_KEY, pubxLayoutState);

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
    Pubx.publish(
      PUBX_CONFIG.CONFIRMATION_MODAL_KEY,
      pubxConfirmationModalState
    );

    // Vaporboy Options
  }
};
