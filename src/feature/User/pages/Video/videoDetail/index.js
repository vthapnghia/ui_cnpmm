import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../../component/Input";
import PATH from "../../../../../contants/path";
import "./videoDetail.scss";
import { editVideo, getVideoByID, removeVideo } from "../videoSlice";
import ModalCommon from "../../../../../component/ModalCommon";
import * as Yup from "yup";

function VideoDetail() {
  const { id } = useParams();
  const [action, setAction] = useState(1);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const videoById = useSelector((state) => state.video?.videoById);
  const navigate = useNavigate();
  const [video, setVideo] = useState(videoById);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [status, setStatus] = useState(null);

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
      setStatus(null);
      switch (action) {
        case 1:
          await dispatch(editVideo({ data: values, id: id })).then((res) => {
            if (res.payload.status === 200) {
              setStatus(res.payload.status);
              setModalTitle("Chỉnh sửa thành công.");
              setModalBody(null);
              setShowMessage(!showMessage);
            } else {
              setModalTitle("Chỉnh sửa thất bại.");
              setModalBody("Hãy thử lại lần nữa.");
              setShowMessage(!showMessage);
            }
          });
          break;
        case 2:
          setShow(!show);
          break;

        default:
          break;
      }
    },
    [dispatch, action, id, show, showMessage]
  );

  const handleClose = useCallback(async () => {
    setShow(!show);
    await dispatch(removeVideo(id)).then((res) => {
      if (res.payload?.status === 200) {
        setStatus(res.payload.status);
        setModalTitle("Xóa thành công.");
        setModalBody(null);
        setShowMessage(!showMessage);
      } else {
        setModalTitle("Xóa thất bại.");
        setModalBody("Hãy thử lại lần nữa.");
        setShowMessage(!showMessage);
      }
    });
  }, [showMessage, id, dispatch, show]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    if (status) {
      if (action === 1) {
        dispatch(getVideoByID(id));
      } else {
        navigate(PATH.VIDEO.BASE);
      }
    }
  }, [showMessage, navigate, status, action, id, dispatch]);

  useEffect(() => {
    dispatch(getVideoByID(id));
  }, [id, dispatch]);

  useEffect(() => {
    setVideo(videoById);
  }, [videoById]);

  return (
    <Formik
      initialValues={{
        video: video?.url || "",
        description: video?.description || "",
      }}
      validationSchema={Yup.object({
        video: Yup.mixed().test( "file", "Vui lòng chọn file", (value) => {
            if (!value) {
              return false;
            }
            return true;
          }
        ),
        description: Yup.string().required("Vui lòng nhập mô tả"),
      })}
      innerRef={formikRef}
      enableReinitialize
      onSubmit={handleAction}
    >
      <>
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
                    value={video?.created_date}
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
        <ModalCommon
          show={show}
          modalTitle="Xóa video"
          modalBody="Bạn có muốn xóa mục này"
          isButton
          handleClose={handleClose}
        />
        <ModalCommon
          show={showMessage}
          modalTitle={modalTitle}
          modalBody={modalBody}
          isButton
          handleClose={handleCloseMessage}
        />
      </>
    </Formik>
  );
}

export default VideoDetail;
