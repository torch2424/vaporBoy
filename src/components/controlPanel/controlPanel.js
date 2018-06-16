import { Component } from "preact";

import {
  CONTROL_PANEL_BASE_COMPONENTS,
  getControlPanelSelectView,
  getROMSourceSelectorView,
  getMyCollectionView,
  getHomebrewView
} from "./baseComponent";

import { ROMCollection } from "../../services/ROMCollection";

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

  getControlPanelBaseComponent() {
    if (this.props.baseComponent) {
      if (
        this.props.baseComponent ===
        CONTROL_PANEL_BASE_COMPONENTS.CONTROL_PANEL_SELECT
      ) {
        return getControlPanelSelectView(this);
      } else if (
        this.props.baseComponent ===
        CONTROL_PANEL_BASE_COMPONENTS.ROM_SOURCE_SELECTOR
      ) {
        return getROMSourceSelectorView(this);
      } else if (
        this.props.baseComponent === CONTROL_PANEL_BASE_COMPONENTS.MY_COLLECTION
      ) {
        return getMyCollectionView(this);
      } else if (
        this.props.baseComponent === CONTROL_PANEL_BASE_COMPONENTS.HOMEBREW
      ) {
        return getHomebrewView(this);
      }
    }

    return getControlPanelSelectView(this);
  }

  goToPreviousView() {
    this.state.viewStack.pop();
    this.setState({
      ...this.state
    });
  }

  viewROMSourceSelector() {
    this.state.viewStack.push(getROMSourceSelectorView(this));
    this.setState({
      ...this.state
    });
  }

  viewMyCollection() {
    this.state.viewStack.push(getMyCollectionView(this));
    this.setState({
      ...this.state
    });
  }

  viewHomebrew() {
    this.state.viewStack.push(getHomebrewView(this));
    this.setState({
      ...this.state
    });
  }

  render() {
    // Next, check if we do have a base component view in the props
    const baseComponent = this.getControlPanelBaseComponent();
    let currentView = baseComponent.view;
    let currentTitle = baseComponent.title;

    // Lastly, set the current view to the last item on the view stack
    if (this.state.viewStack.length > 0) {
      currentView = this.state.viewStack[this.state.viewStack.length - 1].view;
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
