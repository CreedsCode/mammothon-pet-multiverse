import "./App.css";
import Home from "./pages/home/Home";
import Game from "./pages/game/page";
import { Routes, Route, Outlet } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
