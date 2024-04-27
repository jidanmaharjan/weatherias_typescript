import { Route, Routes } from "react-router-dom";

//component imports
import Scrolltotop from "./components/Scrolltotop";

//Pages imports
import Home from "./modules/Home";

function App() {
  return (
    <div className="App w-full min-hscreen">
      <Scrolltotop />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
