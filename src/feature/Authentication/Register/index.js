import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../component/Icons";
import PATH from "../../../contants/path";
import "./Register.scss";

function Register() {
  const [password, setEye] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const formikRef = useRef(null);

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleIconConfirmPassword = useCallback(() => {
    setConfirmPassword(!confirmPassword);
  }, [confirmPassword]);

  const handleRegister = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{ username: "", password: "", passwordRepeat: "" }}
      innerRef={formikRef}
      onSubmit={handleRegister}
    >
      {(props) => (
        <div className="register" id="register">
          <div className="form sign-up">
            <h1>Sign Up</h1>
            <div className="form-input d-flex flex-column align-items-center">
              <div className="input">
                <input
                  className="username"
                  placeholder="User name"
                  name="username"
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
              <div className="input">
                <input
                  name="passwordRepeat"
                  className="confirm-password"
                  placeholder="Confirm password"
                  type={confirmPassword ? "password" : "text"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.passwordRepeat}
                />
                <span className="icon-eye" onClick={handleIconConfirmPassword}>
                  {confirmPassword ? <Icons.EyeSlash /> : <Icons.Eye />}
                </span>
              </div>
              <div className="button-sign-up">
                <button onClick={() => formikRef.current.submitForm()}>
                  Đăng nhập
                </button>
              </div>
              <div className="log-in">
                <span>
                  Bạn đã có tài khoản?
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
