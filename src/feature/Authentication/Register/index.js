import { Formik } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../../component/Input";
import * as Yup from "yup";
import PATH from "../../../contants/path";
import { register } from "../authSlice";
import "./Register.scss";

function Register() {
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const dispatch = useDispatch();

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
                <Input name="username" placeholder="User name" type="text"/>
              </div>
              <div className="input">
                <Input name="password" placeholder="Password" type="password"/>
              </div>
              <div className="input">
                <Input name="passwordRepeat" placeholder="Confirm password" type="password"/>
              </div>
              <div className="button-sign-up">
                <button onClick={() => formikRef.current.submitForm()}>
                  Đăng ký
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
