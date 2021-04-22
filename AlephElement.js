import { LitElement } from "lit-element";
import { write, persistKey, read } from "@stoxy/core";

class AlephElement extends LitElement {
  constructor() {
    super();
  }

  /**
   * This function handles initializing a state object with Stoxy. If a cached value is found for the
   * given key that value will be used, otherwise a provided default value can be passed to initialize with.
   *
   * @param {string} key - the key by which to refer to the state object
   * @param {any} defaultValue - the default value to populate the state object
   * @param {boolean} persist - whether or not to persist the state object to IndexedDB
   */
  initializeState(key, defaultValue, persist) {
    if (persist) persistKey(key);
    read(key).then((value) => !value && write(key, defaultValue));
  }
}

export default AlephElement;
