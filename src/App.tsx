import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Repositories from "./components/repositories";
import Repository from "./components/repository";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl font-bold underline">Home</h1>}></Route>
        <Route path="/:search" element={<Repositories/>}></Route>
        <Route path="/:owner/:name" element={<Repository />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
