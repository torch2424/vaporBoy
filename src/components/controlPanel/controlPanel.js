import { Component } from "preact";

import { ROMCollection } from "../../services/ROMCollection";

import ROMSourceSelector from "./ROMSourceSelector/ROMSourceSelector";
import MyCollection from "./myCollection/myCollection";
import Homebrew from "./homebrew/homebrew";

export default class ControlPanel extends Component {
  constructor() {
    super();
    this.setState({
      viewStack: [],
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
    this.state.viewStack.pop();
    this.setState({
      ...this.state
    });
  }

  viewMyCollection() {
    const myCollectionView = {
      title: "My Collection",
      view: <MyCollection collection={this.state.collection} />
    };

    this.state.viewStack.push(myCollectionView);
    this.setState({
      ...this.state
    });
  }

  viewHomebrew() {
    this.state.viewStack.push(<Homebrew />);
    this.setState({
      ...this.state
    });
  }

  render() {
    // Set the current view to the default view
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
    // Set our current title to the default title
    const title = "Control Panel";
    if (this.state.viewStack.length > 0) {
      currentView = this.state.viewStack[this.state.viewStack.length - 1];
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
