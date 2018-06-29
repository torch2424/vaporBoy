import ControlPanelSelect from "./controlPanelSelect/controlPanelSelect";
import ROMSourceSelector from "./ROMSourceSelector/ROMSourceSelector";
import MyCollection from "./myCollection/myCollection";
import Homebrew from "./homebrew/homebrew";
import LoadStateList from "./loadStateList/loadStateList";
import VaporBoyOptions from "./vaporBoyOptions/vaporBoyOptions";

export const CONTROL_PANEL_VIEWS = {
  CONTROL_PANEL_SELECT: "CONTROL_PANEL_SELECT",
  ROM_SOURCE_SELECTOR: "ROM_SOURCE_SELECTOR",
  MY_COLLECTION: "MY_COLLECTION",
  HOMEBREW: "HOMEBREW",
  LOAD_STATE_LIST: "LOAD_STATE_LIST",
  OPTIONS: "OPTIONS"
};

export const getControlPanelSelectView = componentThis => {
  return {
    title: "Control Panel",
    view: (
      <ControlPanelSelect
        viewROMSourceSelector={() => componentThis.viewROMSourceSelector()}
        viewLoadStateList={() => componentThis.viewLoadStateList()}
        viewOptions={() => componentThis.viewOptions()}
        saveStates={componentThis.state.saveStates}
        hide={() => componentThis.hide()}
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
        hide={() => componentThis.hide()}
      />
    )
  };
};

export const getMyCollectionView = componentThis => {
  return {
    title: "My Collection",
    view: (
      <MyCollection
        collection={componentThis.state.collection}
        hide={() => componentThis.hide()}
      />
    )
  };
};

export const getHomebrewView = componentThis => {
  return {
    title: "Homebrew",
    view: <Homebrew hide={() => componentThis.hide()} />
  };
};

export const getLoadStateListView = componentThis => {
  return {
    title: "Load State",
    view: (
      <LoadStateList
        hide={() => componentThis.hide()}
        saveStates={componentThis.state.saveStates}
      />
    )
  };
};

export const getOptionsView = componentThis => {
  return {
    title: "Options",
    view: <VaporBoyOptions hide={() => componentThis.hide()} />
  };
};
