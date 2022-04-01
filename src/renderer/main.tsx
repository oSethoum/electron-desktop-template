import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom";
import "./index.css";
import { AppProvider } from "@renderer/AppProvider";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AppProvider />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
