import { Link } from "react-router-dom";
import PATH from "../../contants/path";
import "./NotFound.scss";

function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found">
        <div className="not-found-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <Link to={PATH.IMAGE.BASE}>home page</Link>
      </div>
    </div>
  );
}

export default NotFound;
