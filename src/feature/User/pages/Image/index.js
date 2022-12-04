import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contants/path";
import "./Image.scss";
import { getImage } from "./ImageDetail/ImageSlice";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Image() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image?.image);

  useEffect(() => {
    dispatch(getImage())
  }, [dispatch]);

  return (
    <div className="home" id="home">
      <div className="container d-flex flex-column">
        <div className="btn-add row">
          <button onClick={() => navigate(PATH.IMAGE.ADD_IMAGE)}>
            Thêm mới
          </button>
        </div>

        <div className="img-grid row">
          {image?.map((item, index) => (
            <div
              className="img-item col-md-4 col-sm-6 col-lg-3 mb-5 "
              key={index}
            >
              <div className="item">
                <img
                  className="img"
                  src={item.url || "pexels-lisa-fotios-1048283.jpg"}
                  alt="img"
                  width={200}
                  height={200}
                ></img>
                <button
                  className="btn-detail"
                  onClick={() =>
                    navigate(PATH.IMAGE.EDIT_IMAGE.replace(":id", item?._id))
                  }
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

export default Image;
