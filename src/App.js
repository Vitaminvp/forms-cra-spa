import React, { Component } from "react";
import FormsList from "./containers/FormsList";
import { FormattedMessage } from "react-intl";
import Typed from "react-typed";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>
          <FormattedMessage id="title" defaultMessage="Title default" />
        </h1>
        <h2>
          <Typed
            strings={[
              "This is my Single Page Application.",
              "I used React, Redux, Thunk, React-router, ... .",
              "Material-ui helped me with styling.",
              "Hope you'll like it :)",
              "&copy; Vitamin for PDFFiller"
            ]}
            typeSpeed={60}
            // backSpeed={50}
            // loop
          />
        </h2>

        <FormsList download="download" />
      </div>
    );
  }
}

export default App;
