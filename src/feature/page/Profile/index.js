import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../component/Icons";
import "./Profile.scss";

function Profile() {
  const [password, setEye] = useState(false);
  const navigate = useNavigate();
  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);
  return (
    <div className="profile" id="profile">
      <div className="container">
        <div className="back" onClick={() => navigate(-1)}>
          <Icons.ArrowLeft width={20} height={20} color="#000" />
        </div>
        <img
          src="pexels-lisa-fotios-1048283.jpg"
          alt="img"
          className="use-img"
          width={100}
          height={100}
        />
        <h1>User name</h1>

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
        <div className="btn-update">
            <button >Cập nhật</button>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
