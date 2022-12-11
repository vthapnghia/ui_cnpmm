import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "react-google-login";
import Input from "../../../component/Input";
import * as Yup from "yup";
import PATH from "../../../contants/path";
import "./Login.scss";
import { login, loginGoogle } from "../authSlice";
import { gapi } from "gapi-script";
import ModalCommon from "../../../component/ModalCommon";

function Login() {
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleLogin = useCallback(
    async (values) => {
      await dispatch(login(values)).then((res) => {
        const response = res.payload;
        if (response.status === 200) {
          if (response.data.user._id) {
            navigate(PATH.IMAGE.BASE);
          } else {
            navigate(PATH.INFO);
          }
        } else {
          setModalTitle("Đăng nhập thất bại.");
          setModalBody("Hãy thử lại lần nữa.");
          setShow(!show);
        }
      });
    },
    [dispatch, navigate, show]
  );

  const onSuccess = async (data) => {
    await dispatch(loginGoogle({ google_id: data.googleId })).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data?.user._id) {
          navigate(PATH.IMAGE.BASE);
        } else {
          navigate(PATH.INFO);
        }
      }else {
        setModalTitle("Đăng nhập thất bại.");
        setModalBody("Hãy thử lại lần nữa.");
        setShow(!show);
      }
    });
  };

  const onFailure = (res) => {
    console.log("error:", res);
    // setError(t("MSG_E28"));
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId:
      "264515854372-s517e9apc7mb0v86a0r4cc9ru33tv5k2.apps.googleusercontent.com",
    isSignedIn: false,
  });

  const handleClose = useCallback(() => {
    setShow(!show);
  }, [show]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "264515854372-s517e9apc7mb0v86a0r4cc9ru33tv5k2.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
        <>
          <div id="login" className="login">
            <div className="form sign-in">
              <h1>Đăng nhập</h1>
              <div className="form-input d-flex flex-column align-items-center">
                <div className="input">
                  <Input name="username" type="text" placeholder="User name" />
                </div>

                <div className="input">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                {/* <div className="forgot-password">
                <Link to="/aa">Quên mật khẩu</Link>
              </div> */}
                <div className="button-sign-in d-flex flex-column align-items-center">
                  <button onClick={() => formikRef.current.submitForm()}>
                    Đăng nhập
                  </button>
                  <span>Hoặc</span>
                  <button onClick={signIn}>Đăng nhập bằng Google</button>
                </div>
                <div className="create-account">
                  <span>
                    Bạn chưa có tài khoản?{" "}
                    <b onClick={(e) => navigate(PATH.REGISTER)}>
                      Đăng ký ở đây
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ModalCommon
            show={show}
            modalTitle={modalTitle}
            modalBody={modalBody}
            isButton
            handleClose={handleClose}
            handleCloseModal={() => setShow(!show)}
          />
        </>
      )}
    </Formik>
  );
}

export default Login;
