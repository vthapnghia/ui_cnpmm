import { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../contants/path";
import { logout } from "../../feature/Authentication/authSlice";
import "./Navbar.scss";
function Navbar() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispath(logout()).then((res) => {
      navigate(PATH.LOGIN);
    });
  }, [dispath, navigate]);

  return (
    <div className="navbar" id="navbar">
      <div className="custom-navbar-nav">
        <div>
          <Link className="nav-link" to={PATH.IMAGE.BASE}>
            Hình ảnh
          </Link>
        </div>
        <div>
          <Link className="nav-link" to={PATH.VIDEO.BASE}>
            Video
          </Link>
        </div>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic">
          <img
            className="admin-img"
            alt="img"
            src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
          ></img>
          User
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100 mt-2">
          <Link className="dropdown-item" to={PATH.INFO}>
            Thông tin
          </Link>
          <div className="dropdown-item" onClick={handleLogout}>
            Đăng xuất
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navbar;
