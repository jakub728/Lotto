import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/Not_Found/NotFound.jsx";
import Results from "./components/Results";
import Generate from "./components/Generate";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import SavedData from "./components/SavedData/SavedData";
import DataProvider from "./context/Context";
import AuthenticationProvider from "./context/AuthenticationContext.jsx";
import AfterLogin from "./components/AfterLoginPage/AfterLogin.jsx";


function App() {
  return (
    <>
      <AuthenticationProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/results" element={<Results />}></Route>
            <Route path="/generate" element={<Generate />}></Route>
            <Route path="/data" element={<SavedData />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/afterlogin" element={<AfterLogin />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </DataProvider>
      </AuthenticationProvider>
    </>
  );
}

export default App;
