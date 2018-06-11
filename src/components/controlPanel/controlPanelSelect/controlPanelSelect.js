import { Component } from "preact";

export default class ControlPanelSelect extends Component {
  constructor() {
    super();
    this.setState({});
  }

  componentDidMount() {}

  render() {
    return (
      <ul class="control-panel-select">
        <li class="control-panel-select__item">
          <button onclick={() => this.props.viewROMSourceSelector()}>
            <div>💾</div>
            <div>Select a ROM</div>
          </button>
        </li>
      </ul>
    );
  }
}
