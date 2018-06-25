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
    return (
      <div class="load-state-list">
        <ul />
      </div>
    );
  }
}
