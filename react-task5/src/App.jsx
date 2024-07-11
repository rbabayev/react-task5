import { useState } from "react";
import Test from "./components/Test";
import "./App.css";

function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow((show) => !show)}>
        {show ? "Close" : "Open"}
      </button>
      {show && <Test />}
    </div>
  );
}
export default App;
