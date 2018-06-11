import { Component } from "preact";

import { ROMCollection } from "../../services/ROMCollection";

import ControlPanelSelect from "./controlPanelSelect/controlPanelSelect";
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

  viewROMSourceSelector() {
    const ROMSourceSelectorView = {
      title: "ROM Source",
      view: (
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
      )
    };

    this.state.viewStack.push(ROMSourceSelectorView);
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
    const homebrewView = {
      title: "Homebrew",
      view: <Homebrew />
    };

    this.state.viewStack.push(homebrewView);
    this.setState({
      ...this.state
    });
  }

  render() {
    // Set the current view to the default base component
    let currentView = (
      <ControlPanelSelect
        viewROMSourceSelector={() => this.viewROMSourceSelector()}
      />
    );

    // Next, check if we do have a base component view in the props
    if (this.props.baseComponent && this.props.baseComponent.view) {
      currentView = this.props.baseComponent.view;
    }
    // Lastly, set the current view to the last item on the view stack
    if (this.state.viewStack.length > 0) {
      currentView = this.state.viewStack[this.state.viewStack.length - 1].view;
    }

    // Next get our current view title
    let currentTitle = "Control Panel";
    // Next, check if we do have a base component in the props
    if (this.props.baseComponent && this.props.baseComponent.title) {
      currentView = this.props.baseComponent.title;
    }
    this.state.viewStack.forEach(view => {
      currentTitle += ` - ${view.title}`;
    });

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
                {currentTitle}
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button onclick={() => this.hideControlPanel()}>X</button>
                </div>
              </div>
            </div>

            <div class="aesthetic-windows-95-modal-content">
              <div class="control-panel__modal__controls">
                <div class="aesthetic-windows-95-button">
                  <button
                    disabled={this.state.viewStack.length <= 0}
                    onclick={() => this.goToPreviousView()}
                  >
                    ⬅️
                  </button>
                </div>
              </div>

              <hr />

              <div class="control-panel__modal__view">{renderedView}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
