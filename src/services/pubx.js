/*

  A State management sytem based around passing events through pub/sub. Meant to be easy, and lightweight.

  State will be a JSON object, where the state object keys are an json object. e.g publish('myKey', newKeyState) => this.state.myKey = newKeyState

  state objects will have two properties:

  value: The current value of the state

  subscribers: Json object keyed by random subscriber Ids, that are equal to the callbacks assigned to them
*/

class PubxService {
  constructor() {
    // Initialize state to nothing
    this.state = {};
  }

  // Function to return subscriber ids to unsubscribe
  _idGenerator() {
    const idGenerator = () => {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);
    };

    const stringId = `${idGenerator()}${idGenerator()}`;
    return stringId.slice();
  }

  // Function to initialize a state key
  _initializeStateKey(stateKey) {
    this.state[stateKey] = {
      value: undefined,
      subscribers: {}
    };
  }

  // Return the current state of a state key
  get(stateKey) {
    if (!this.state[stateKey]) {
      return undefined;
    }

    return this.state[stateKey].value;
  }

  // Function to subscribe to a state key
  subscribe(stateKey, callback) {
    // Generate a subscriber ID
    const subscriberId = this._idGenerator();

    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    }

    this.state[stateKey].subscribers[subscriberId] = stateValue => {
      callback(stateValue);
    };

    return subscriberId;
  }

  // Function to unsubscribe a subscriber
  unsubscribe(stateKey, subscriberId) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      return;
    }

    delete this.state[stateKey].subscribers[subscriberId];
  }

  // Function top update a state value. State value is spread so only have to pass the values you want to change
  publish(stateKey, stateValue) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    }

    // Set the value
    this.state[stateKey].value = {
      ...this.state[stateKey].value,
      ...stateValue
    };

    // Call our subscribers
    Object.keys(this.state[stateKey].subscribers).forEach(subscriberKey => {
      this.state[stateKey].subscribers[subscriberKey](stateValue);
    });
  }
}

// Return a singleton
export const Pubx = new PubxService();
