import React from "react";
import ReactDOM from "react-dom";
import { LoginForm } from "./LoginForm";
import { worker } from "./mocks/browser";

// Start the mocking conditionally.
worker.start();

ReactDOM.render(<LoginForm />, document.getElementById("root"));
