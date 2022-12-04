import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contants/path";
import "./Video.scss";
import { getVideo } from "./videoDetail/videoSlice";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Video() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video?.video);

  useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  console.log(video);

  return (
    <div className="home" id="home">
      <div className="container d-flex flex-column">
        <div className="btn-add row">
          <button onClick={() => navigate(PATH.IMAGE.ADD_IMAGE)}>
            Thêm mới
          </button>
        </div>

        <div className="img-grid row">
          {video?.map((item, index) => (
            <div
              className="img-item col-md-4 col-sm-6 col-lg-4 mb-5 "
              key={index}
            >
              <div className="item">
                <video controls 
                  className="video">
                  <source src= {item.url} />
                </video>
                <button
                  className="btn-detail"
                  onClick={() =>
                    navigate(PATH.VIDEO.EDIT_VIDEO.replace(":id", item?._id))
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

export default Video;
