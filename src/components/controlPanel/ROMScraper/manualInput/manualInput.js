import { Component } from "preact";

export default class ManualInput extends Component {
  constructor() {
    super();
    this.setState({});
  }

  render() {
    return (
      <div class="manual-input">
        <h1>Manual Input</h1>
        <input
          class="aesthetic-windows-95-text-input"
          type="text"
          placeholder="Title"
        />
      </div>
    );
  }
}
