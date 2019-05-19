// Service for exporting and retreiving ROMS
import { WasmBoy } from "wasmboy";
import { idbKeyval } from "./idb";

import { Pubx } from "./pubx";
import { PUBX_CONFIG } from "../pubx.config";

import { NOTIFICATION_MESSAGES } from "../notification.messages";

const packageJson = require("../../package.json");

// Our key for our vaporboy collection
const IDB_COLLECTION_KEY = "vaporboy_collection";

class ROMCollectionService {
  constructor() {}

  _setCollection(collectionObject) {
    const setCollectionTask = async () => {
      if (!collectionObject) {
        throw new Error("You must pass a collection object");
      }

      await idbKeyval.set(IDB_COLLECTION_KEY, collectionObject);
    };

    return setCollectionTask();
  }

  getCollection() {
    const getCollectionTask = async () => {
      // Get our colleciton
      let collectionObject = await idbKeyval.get(IDB_COLLECTION_KEY);
      if (!collectionObject) {
        collectionObject = {};
      }

      return collectionObject;
    };

    return getCollectionTask();
  }

  updateCollection() {
    // Get the current ROM Collection
    const getCollectionTask = async () => {
      const collection = await this.getCollection();
      Pubx.publish(PUBX_CONFIG.ROM_COLLECTION_KEY, {
        collection
      });
    };

    // Get the current rom save states
    const getSaveStatesTask = async () => {
      if (!WasmBoy.isReady()) {
        return;
      }

      WasmBoy.getSaveStates()
        .then(saveStates => {
          Pubx.publish(PUBX_CONFIG.SAVES_STATES_KEY, {
            saveStates
          });
        })
        .catch(error => {
          // TODO: Unhide this error when no save states
          /*
          console.error(error);
          Pubx.get(PUBX_CONFIG.NOTIFICATION_KEY).showNotification(
            NOTIFICATION_MESSAGES.ERROR_SAVE_STATE
          );
          */
        });
    };

    // Kick off our tasks
    return (async () => {
      await getCollectionTask();
      await getSaveStatesTask();
      return true;
    })();
  }

  saveCurrentWasmBoyROMToCollection(title, imageDataURL) {
    const saveCurrentWasmBoyROMToCollectionTask = async () => {
      const cartridgeInfo = await WasmBoy._getCartridgeInfo();

      // Get our colleciton
      const collectionObject = await this.getCollection();

      // Use the cartrdige header to set our ROM, and other info we want to keep
      collectionObject[cartridgeInfo.header] = {
        ROM: cartridgeInfo.ROM,
        titleAsString: title || cartridgeInfo.titleAsString,
        imageAsDataURL: imageDataURL,
        CGBFlag: cartridgeInfo.CGBFlag,
        SGBFlag: cartridgeInfo.SGBFlag,
        vaporBoyVersion: packageJson.version
      };

      await this._setCollection(collectionObject);
    };

    return saveCurrentWasmBoyROMToCollectionTask();
  }
}

// Export a Singleton
export const ROMCollection = new ROMCollectionService();
