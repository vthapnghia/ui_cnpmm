import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import PATH from "../../contants/path";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="navbar" id="navbar">
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
          <Link className="dropdown-item" to={PATH.INFO}>Thông tin</Link>
          <Link className="dropdown-item" to={PATH.LOGIN}>Đăng xuất</Link>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navbar;
