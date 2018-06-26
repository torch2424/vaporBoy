import { Component } from "preact";

export default class LoadStateList extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {
    console.log("load state list:", this.props.saveStates);
  }

  render() {
    const saveStates = [];
    if (this.props.saveStates) {
      this.props.saveStates.forEach(saveState => {
        const saveStateDate = new Date(saveState.date);
        saveStates.push(
          <li>
            <button>
              <div>
                <img src={saveState.screenshotCanvasDataURL} />
              </div>
              <div>Date: {saveStateDate.toLocaleString()}</div>
              <div>isAuto: {saveState.isAuto}</div>
            </button>
          </li>
        );
      });
    }

    return (
      <div class="load-state-list">
        <ul>{saveStates}</ul>
      </div>
    );
  }
}
