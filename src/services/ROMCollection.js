// Service for exporting and retreiving ROMS
import { WasmBoy } from "wasmboy";
import { idbKeyval } from "./idb";

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

  saveCurrentWasmBoyROMToCollection() {
    const saveCurrentWasmBoyROMToCollectionTask = async () => {
      const cartridgeInfo = await WasmBoy._getCartridgeInfo();

      // Get our colleciton
      const collectionObject = await this.getCollection();

      // Use the cartrdige header to set our ROM, and other info we want to keep
      collectionObject[cartridgeInfo.header] = {
        ROM: cartridgeInfo.ROM,
        titleAsString: cartridgeInfo.titleAsString,
        titleSetByUser: false,
        CGBFlag: cartridgeInfo.CGBFlag,
        SGBFlag: cartridgeInfo.SGBFlag
      };

      await this._setCollection(collectionObject);
    };

    return saveCurrentWasmBoyROMToCollectionTask();
  }
}

// Export a Singleton
export const ROMCollection = new ROMCollectionService();
