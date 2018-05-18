import "./index.scss";
import { Component } from "preact";

export default class App extends Component {
  componentDidMount() {
    document.addEventListener("deviceready", () => {
      console.log("Cordova Launched Device Ready!");
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}
