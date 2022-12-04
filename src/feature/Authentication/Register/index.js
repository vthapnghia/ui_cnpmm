import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Icons from "../../../component/Icons";
import PATH from "../../../contants/path";
import { register } from "../authSlice";
import "./Register.scss";

function Register() {
  const [password, setEye] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleIconConfirmPassword = useCallback(() => {
    setConfirmPassword(!confirmPassword);
  }, [confirmPassword]);

  const handleRegister = (values) => {
    dispatch(register(values));
  };
  return (
    <Formik
      initialValues={{ username: "", password: "", passwordRepeat: "" }}
      innerRef={formikRef}
      validationSchema={Yup.object({
        username: Yup.string().required("Vui lòng nhập user name"),
        password: Yup.string().required("Vui lòng nhập password"),
        passwordRepeat: Yup.string().required(
          "Vui lòng nhập confirm password "
        ),
      })}
      enableReinitialize
      onSubmit={handleRegister}
    >
      {(props) => (
        <div className="register" id="register">
          <div className="form sign-up">
            <h1>Đăng ký</h1>
            <div className="form-input d-flex flex-column align-items-center">
              <div className="input">
                <input
                  placeholder="User name"
                  className={`username ${props.errors.password ? "error" : ""} `}
                  name="username"
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
                  className={`password ${props.errors.password ? "error" : ""} `}
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
              <div className="input">
                <input
                  name="passwordRepeat"
                  className={`confirm-password ${props.errors.password ? "error" : ""} `}
                  placeholder="Confirm password"
                  type={confirmPassword ? "text" : "password"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.passwordRepeat}
                />
                <span className="icon-eye" onClick={handleIconConfirmPassword}>
                  {confirmPassword ? <Icons.Eye /> : <Icons.EyeSlash />}
                </span>
                {props.errors.passwordRepeat && (
                  <div className="message-error">{props.errors.passwordRepeat}</div>
                )}
              </div>
              <div className="button-sign-up">
                <button onClick={() => formikRef.current.submitForm()}>
                  Đăng nhập
                </button>
              </div>
              <div className="log-in">
                <span>
                  Bạn đã có tài khoản?{" "}
                  <b onClick={() => navigate(PATH.LOGIN)}>Đăng nhập ở đây</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Register;
