import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Icons from "../../../component/Icons";
import PATH from "../../../contants/path";
import "./Login.scss";
import { login } from "../authSlice";
function Login() {
  const [password, setEye] = useState(false);
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  return (
    <Formik
      initialValues={{ username: " ", password: " " }}
      // validationSchema={Yup.object({
      //   username: Yup.string().required("Vui lòng nhập user name"),
      //   password: Yup.string().required("Vui lòng nhập password"),
      // })}
      // enableReinitialize
      onSubmit={handleLogin}
      innerRef={formikRef}
    >
      {(props) => (
        <div id="login" className="login">
          <div className="form sign-in">
            <h1>Sign In</h1>
            <div className="form-input d-flex flex-column align-items-center">
              <div className="input">
                <input
                  name="username"
                  className="username"
                  placeholder="User name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.username}
                />
              </div>

              <div className="input">
                <input
                  name="password"
                  className="password"
                  placeholder="Password"
                  type={password ? "password" : "text"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                <span className="icon-eye" onClick={handleIconPassword}>
                  {password ? <Icons.EyeSlash /> : <Icons.Eye />}
                </span>
              </div>
              <div className="forgot-password">
                <Link to="/aa">Quên mật khẩu</Link>
              </div>
              <div className="button-sign-in">
                <button onClick={() => formikRef.current.submitForm()}>
                  Đăng nhập
                </button>
              </div>
              <div className="create-account">
                <span>
                  Bạn chưa có tài khoản?{" "}
                  <b onClick={(e) => navigate(PATH.REGISTER)}>Đăng ký ở đây</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
