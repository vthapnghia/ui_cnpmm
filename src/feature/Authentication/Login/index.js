import { Formik } from "formik";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../../component/Input";
import * as Yup from "yup";
import PATH from "../../../contants/path";
import "./Login.scss";
import { login } from "../authSlice";

function Login() {
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(login(values)).then((res) => {
      const response = res.payload;
      if (response.status === 200) {
        if (response.data.user._id) {
          navigate(PATH.IMAGE.BASE);
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
                <Input name="username" type="text" placeholder="User name" />
              </div>

              <div className="input">
                <Input name="password" type="password" placeholder="Password" />
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
