import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Icons from "../../../component/Icons";
import "./Login.scss";
function Login() {
  const [password, setEye] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleIconConfirmPassword = useCallback(() => {
    setConfirmPassword(!confirmPassword);
  }, [confirmPassword]);

  const toggle = () => {
    const element = document.getElementById("container");
  };
  return (
    <div className="login" id="container">
      <div className="form sign-in" >
        <h1>Sign In</h1>
        <div className="form-input d-flex flex-column align-items-center">
          <div className="input">
            <input className="user-name" placeholder="User name" />
          </div>

          <div className="input">
            <input
              className="password"
              placeholder="Password"
              type={password ? "password" : "text"}
            />
            <span className="icon-eye" onClick={handleIconPassword}>
              {password ? <Icons.Eye /> : <Icons.EyeSlash />}
            </span>
          </div>
          <div className="forgot-password">
            <Link to="/aa">Quên mật khẩu</Link>
          </div>
          <div className="button-sign-in">
            <button>Đăng nhập</button>
          </div>
          <div className="create-account">
            <span>Bạn chưa có tài khoản?</span>
            <b onClick={toggle}>Đăng ký ở đây</b>
          </div>
        </div>
      </div>

      <div className="form sign-up" >
        <h1>Sign Up</h1>
        <div className="form-input d-flex flex-column align-items-center">
          <div className="input">
            <input className="user-name" placeholder="User name" />
          </div>
          <div className="input">
            <input
              className="password"
              placeholder="Password"
              type={password ? "password" : "text"}
            />
            <span className="icon-eye" onClick={handleIconPassword}>
              {password ? <Icons.Eye /> : <Icons.EyeSlash />}
            </span>
          </div>
          <div className="input">
            <input
              className="confirm-password"
              placeholder="Confirm password"
              type={confirmPassword ? "password" : "text"}
            />
            <span className="icon-eye" onClick={handleIconConfirmPassword}>
              {confirmPassword ? <Icons.Eye /> : <Icons.EyeSlash />}
            </span>
          </div>
          <div className="button-sign-up">
            <button>Đăng nhập</button>
          </div>
          <div className="log-in">
            <span>Bạn đã có tài khoản?</span>
            <b onClick={toggle}>Đăng nhập ở đây</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
