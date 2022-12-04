import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Navbar from "./component/Navbar";
import PATH from "./contants/path";
import Login from "./feature/Authentication/Login";
import Register from "./feature/Authentication/Register";
import PrivateRoute from "./component/PrivateRoute";
import Notfound from "./component/NotFound";
import { useAuth } from "./until/hook";
import Spinner from "./component/Spinner";
import router from "./router";
import User from "./feature/User";

function App() {
  const { userAuth } = useAuth();
  const {pathname} = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route path={PATH.BASE} element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        {router.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <PrivateRoute>
                <User component={route.component} />{" "}
              </PrivateRoute>
            }
          />
        ))}
        <Route path={PATH.NOT_FOUND} element={<Notfound />} />
      </Routes>
      {/* {userAuth && pathname === PATH.NOT_FOUND ? <Navbar /> : <></>} */}
      <Spinner />
    </div>
  );
}

export default App;
