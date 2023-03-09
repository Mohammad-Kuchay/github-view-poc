import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Repositories from "./components/repositories";
import Repository from "./components/repository";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Repositories/>}></Route>
        <Route path="/:owner/:name" element={<Repository />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
