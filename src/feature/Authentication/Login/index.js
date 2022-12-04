import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    dispatch(login(values)).then((res) => {
      const response = res.payload;
      if (response.status === 200) {
        if (response.data.user._id) {
          navigate(PATH.HOME);
        } else {
          navigate(PATH.INFO);
        }
      }
    });
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Vui lòng nhập user name"),
        password: Yup.string().required("Vui lòng nhập password"),
      })}
      enableReinitialize
      onSubmit={handleLogin}
      innerRef={formikRef}
    >
      {(props) => (
        <div id="login" className="login">
          <div className="form sign-in">
            <h1>Đăng nhập</h1>
            <div className="form-input d-flex flex-column align-items-center">
              <div className="input">
                <input
                  name="username"
                  className={`username ${props.errors.username ? "error" : ""}`}
                  placeholder="User name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.username}
                />
                {props.errors.username && (
                  <div className="message-error">{props.errors.username}</div>
                )}
              </div>

              <div className="input">
                <input
                  name="password"
                  className={`password ${props.errors.username ? "error" : ""}`}
                  placeholder="Password"
                  type={password ? "text" : "password"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                <span className="icon-eye" onClick={handleIconPassword}>
                  {password ? <Icons.Eye /> : <Icons.EyeSlash />}
                </span>
                {props.errors.password && (
                  <div className="message-error">{props.errors.password}</div>
                )}
              </div>
              {/* <div className="forgot-password">
                <Link to="/aa">Quên mật khẩu</Link>
              </div> */}
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
