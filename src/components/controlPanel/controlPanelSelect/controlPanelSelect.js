import { Component } from "preact";

export default class ControlPanelSelect extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  render() {
    return (
      <div class="control-panel-select">
        <ul class="control-panel-select__grid">
          <li class="control-panel-select__grid__item">
            <button onclick={() => this.props.viewROMSourceSelector()}>
              <div>💾</div>
              <div>Select a ROM</div>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
