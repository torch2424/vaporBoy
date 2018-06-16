import ControlPanelSelect from "./controlPanelSelect/controlPanelSelect";
import ROMSourceSelector from "./ROMSourceSelector/ROMSourceSelector";
import MyCollection from "./myCollection/myCollection";
import Homebrew from "./homebrew/homebrew";

export const CONTROL_PANEL_BASE_COMPONENTS = {
  CONTROL_PANEL_SELECT: "CONTROL_PANEL_SELECT",
  ROM_SOURCE_SELECTOR: "ROM_SOURCE_SELECTOR",
  MY_COLLECTION: "MY_COLLECTION",
  HOMEBREW: "HOMEBREW"
};

export const getControlPanelSelectView = componentThis => {
  return {
    title: "Control Panel",
    view: (
      <ControlPanelSelect
        viewROMSourceSelector={() => componentThis.viewROMSourceSelector()}
      />
    )
  };
};

export const getROMSourceSelectorView = componentThis => {
  return {
    title: "ROM Source",
    view: (
      <ROMSourceSelector
        viewMyCollection={() => {
          componentThis.viewMyCollection();
        }}
        viewHomebrew={() => {
          componentThis.viewHomebrew();
        }}
        updateCollection={() => componentThis.updateCollection()}
        collection={componentThis.state.collection}
      />
    )
  };
};

export const getMyCollectionView = componentThis => {
  return {
    title: "My Collection",
    view: <MyCollection collection={componentThis.state.collection} />
  };
};

export const getHomebrewView = componentThis => {
  return {
    title: "Homebrew",
    view: <Homebrew />
  };
};
