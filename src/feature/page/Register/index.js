import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../component/Icons";
import PATH from "../../../contants/path";
import "./Register.scss";

function Register() {
  const [password, setEye] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleIconConfirmPassword = useCallback(() => {
    setConfirmPassword(!confirmPassword);
  }, [confirmPassword]);
  return (
    <div className="register" id="register">
      <div className="form sign-up">
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
              {password ? <Icons.EyeSlash /> : <Icons.Eye />}
            </span>
          </div>
          <div className="input">
            <input
              className="confirm-password"
              placeholder="Confirm password"
              type={confirmPassword ? "password" : "text"}
            />
            <span className="icon-eye" onClick={handleIconConfirmPassword}>
              {confirmPassword ? <Icons.EyeSlash /> : <Icons.Eye />}
            </span>
          </div>
          <div className="button-sign-up">
            <button>Đăng nhập</button>
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
  );
}

export default Register;
