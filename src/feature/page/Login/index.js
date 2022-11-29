import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../../component/Icons";
import PATH from "../../../contants/path";
import "./Login.scss";
function Login() {
  const [password, setEye] = useState(false);
  const navigate = useNavigate();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  return (
    <div id="login" className="login">
      <div className="form sign-in">
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
              {password ? <Icons.EyeSlash /> : <Icons.Eye />}
            </span>
          </div>
          <div className="forgot-password">
            <Link to="/aa">Quên mật khẩu</Link>
          </div>
          <div className="button-sign-in">
            <button>Đăng nhập</button>
          </div>
          <div className="create-account">
            <span>
              Bạn chưa có tài khoản?{" "}
              <b onClick={() => navigate(PATH.REGISTER)}>Đăng ký ở đây</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
