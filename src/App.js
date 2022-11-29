import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import PATH from "./contants/path";
import Home from "./feature/page/Home";
import ImageDetail from "./feature/page/ImageDetail";
import Login from "./feature/page/Login";
import Profile from "./feature/page/Profile";
import Register from "./feature/page/Register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={PATH.BASE} element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.INFO} element={<Profile />} />
        <Route path={PATH.IMAGE.ADD_IMAGE} element={<ImageDetail />} />
        <Route path={PATH.IMAGE.EDIT_IMAGE} element={<ImageDetail />} />
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
