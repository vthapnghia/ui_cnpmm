import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import PATH from "./contants/path";
import Login from "./feature/Authentication/Login";
import Register from "./feature/Authentication/Register";
import Home from "./feature/page/Home";
import ImageDetail from "./feature/User/pages/ImageDetail";
import PrivateRoute from "./component/PrivateRoute";
import { useAuth } from "./until/hook";
import Profile from "./feature/User/pages/Profile";

function App() {
  const { userAuth } = useAuth();
  return (
    <div className="App">
      {/* {userAuth ? <Navbar /> : <></>} */}
      {true ? <Navbar /> : <></>}
      <Routes>
        <Route path={PATH.BASE} element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route
          path={PATH.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={PATH.INFO}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PATH.IMAGE.ADD_IMAGE}
          element={
            <PrivateRoute>
              <ImageDetail />
            </PrivateRoute>
          }
        />
        <Route
          path={PATH.IMAGE.EDIT_IMAGE}
          element={
            <PrivateRoute>
              <ImageDetail />
            </PrivateRoute>
          }
        />
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
