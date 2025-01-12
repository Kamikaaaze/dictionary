import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="mainDiv">
      <div className="card">
        <div className="iconsDiv">icon</div>
        <div className="inputDiv">
          <input placeholder="Type here.." className="search-box" type="text" />
        </div>
        <div className="wordDiv">
          <div className="wordDivLeft">
            <p className="keyWord">Keyword</p>
            <p>/ley/w.key</p>
          </div>

          <p>Icons</p>
        </div>
        <div className="nounDiv">Noun explained</div>
        <div className="verbDiv">Verb explained</div>
        <p>Source www.link.com</p>
      </div>
    </div>
  );
}

export default App;
