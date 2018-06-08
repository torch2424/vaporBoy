import { Component } from "preact";

import { ROMCollection } from "../../services/ROMCollection";

import ROMSourceSelector from "./ROMSourceSelector/ROMSourceSelector";
import MyCollection from "./myCollection/myCollection";
import Homebrew from "./homebrew/homebrew";

export default class ControlPanel extends Component {
  constructor() {
    super();
    this.setState({
      viewMyCollection: false,
      viewHomebrew: false,
      collection: undefined
    });
  }

  componentDidMount() {
    this.updateCollection();
  }

  updateCollection() {
    // Get the current ROM Collection
    const getCollectionTask = async () => {
      const collection = await ROMCollection.getCollection();
      console.log(collection);
      this.setState({
        ...this.state,
        collection
      });
    };

    // Kick off our tasks
    getCollectionTask();
  }

  hideControlPanel() {
    this.props.hide();
  }

  goToPreviousView() {
    this.setState({
      viewMyCollection: false,
      viewHomebrew: false
    });
  }

  viewMyCollection() {
    this.setState({
      viewMyCollection: true,
      viewHomebrew: false
    });
  }

  viewHomebrew() {
    this.setState({
      viewMyCollection: false,
      viewHomebrew: true
    });
  }

  render() {
    let currentView = (
      <ROMSourceSelector
        viewMyCollection={() => {
          this.viewMyCollection();
        }}
        viewHomebrew={() => {
          this.viewHomebrew();
        }}
        updateCollection={() => this.updateCollection()}
        collection={this.state.collection}
      />
    );
    if (this.state.viewMyCollection) {
      currentView = <MyCollection collection={this.state.collection} />;
    }
    if (this.state.viewHomebrew) {
      currentView = <Homebrew />;
    }

    // Show a loader while we perform async tasks
    let renderedView = <div class="donut" />;
    if (this.state.collection) {
      renderedView = currentView;
    }

    return (
      <div
        className={
          this.props.show
            ? "control-panel control-panel--show"
            : "control-panel"
        }
      >
        <div class="control-panel__modal">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                Control Panel
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button onclick={() => this.hideControlPanel()}>X</button>
                </div>
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <div>I am the modal content</div>

              <div class="control-panel__modal__view">{renderedView}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
