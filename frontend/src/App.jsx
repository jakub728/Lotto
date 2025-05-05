import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Results from "./components/Results";
import Generate from "./components/Generate";
import Login from "./components/Login";
import SavedData from "./components/SavedData";
import DataProvider from "./context/Context";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/results" element={<Results />}></Route>
            <Route path="/generate" element={<Generate />}></Route>
            <Route path="/data" element={<SavedData />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </DataProvider>
    </>
  );
}

export default App;
