import { useNavigate } from "react-router-dom";
import PATH from "../../../contants/path";
import "./Home.scss";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home" id="home">
      <div className="container d-flex flex-column">
        <div className="btn-add row">
          <button onClick={() => navigate(PATH.IMAGE.ADD_IMAGE)}>
            Thêm mới
          </button>
        </div>

        <div className="img-grid row">
          {arr.map((item, index) => (
            <div
              className="img-item col-md-4 col-sm-6 col-lg-3 mb-5 "
              key={index}
            >
              <div className="item">
                <img
                  className="img"
                  src="pexels-lisa-fotios-1048283.jpg"
                  alt="img"
                  width={200}
                  height={200}
                ></img>
                <button
                  className="btn-detail"
                  onClick={() => navigate(PATH.IMAGE.EDIT_IMAGE.replace(":id", 1))}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
