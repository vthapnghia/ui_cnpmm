import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../../component/Input";
import PATH from "../../../../../contants/path";
import "./videoDetail.scss";
import { editVideo, getVideoByID, removeVideo } from "./videoSlice";

function VideoDetail() {
  const { id } = useParams();
  const [action, setAction] = useState(1);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const videoById = useSelector((state) => state.video?.videoById);
  const navigate = useNavigate();

  const handleEdit = () => {
    setAction(1);
    formikRef.current.submitForm();
  };
  const handleRemove = () => {
    setAction(2);
    formikRef.current.submitForm();
  };

  const handleAction = useCallback(
    async (values) => {
      switch (action) {
        case 1:
          await dispatch(editVideo({ data: values, id: id })).then((res) => {
            dispatch(getVideoByID(id));
          });
          break;
        case 2:
          await dispatch(removeVideo(id)).then((res) => {
            if (res.payload?.status === 200) {
              navigate(PATH.VIDEO.BASE);
            }
          });
          break;

        default:
          break;
      }
    },
    [dispatch, action, id, navigate]
  );

  useEffect(() => {
    dispatch(getVideoByID(id));
  }, [id, dispatch]);

  return (
    <Formik
      initialValues={{
        video: videoById?.url,
        description: videoById?.description,
      }}
      innerRef={formikRef}
      enableReinitialize
      onSubmit={handleAction}
    >
      <div className="video-detail" id="video-detail">
        <div className="container ">
          <div className="row">
            <div className="col col-md-6 col-sm-12 ">
              <div className="video">
                <Input
                  name="video"
                  type="video"
                  className="video-upload"
                  label="Tải video lên"
                />
              </div>
            </div>
            <div className="col col-md-6 col-sm-12">
              <div className="input">
                <Input
                  name="description"
                  className="description"
                  placeholder="Mô tả"
                  type="textarea"
                />
              </div>

              <div className="input">
                <input
                  className="update-date"
                  placeholder="Ngày tải lên"
                  disabled
                  value={videoById?.created_date}
                />
              </div>
              <div className="btn-video">
                <button onClick={handleEdit}>Chỉnh sửa</button>
                <button onClick={handleRemove}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default VideoDetail;
