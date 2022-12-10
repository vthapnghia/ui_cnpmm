import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalCommon from "../../../../component/ModalCommon";
import PATH from "../../../../contants/path";
import "./Video.scss";
import { addVideo, getVideo } from "./videoSlice";

function Video() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video?.video);
  const [videos, setVideos] = useState(null);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);

  const modalBodyAdd = useMemo(() => {
    return (
      <div className="d-flex flex-column align-items-center">
        <div
          className="d-flex align-items-center"
          style={{ height: "100px", width: "max-content", textAlign: "center" }}
        >
          <input id="mutilple_file" type="file" multiple accept="video/*" />
        </div>
      </div>
    );
  }, []);

  const handleClose = useCallback(async () => {
    const element = document.getElementById("mutilple_file");
    var files = element.files;
    setShow(!show);
    await dispatch(addVideo(files)).then((res) => {
      if (res.payload.status === 201) {
        setModalTitle("Thêm video thành công.");
        setModalBody(null);
        setShowMessage(!showMessage);
      } else {
        setModalTitle("Thêm video thất bại.");
        setModalBody("Hãy thử lại lần nữa.");
        setShowMessage(!showMessage);
      }
    });
  }, [show, dispatch, showMessage]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getVideo());
  }, [showMessage, dispatch]);

  useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  useEffect(() => {
    setVideos(video);
  }, [video]);

  return (
    <div className="video" id="video">
      <div className="container d-flex flex-column">
        <div className="btn-add row">
          <button onClick={() => setShow(!show)}>Thêm mới</button>
        </div>

        <div className="video-grid row">
          {videos?.map((item, index) => (
            <div
              className="video-item col-md-6 col-lg-4 .col-sm-12  "
              key={index}
            >
              <div className="item">
                <video controls className="video">
                  <source src={item.url} />
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
      <ModalCommon
        show={show}
        modalTitle="Tải video lên"
        modalBody={modalBodyAdd}
        isButton
        handleClose={handleClose}
        labelButton="Lưu"
      />
      <ModalCommon
        show={showMessage}
        modalTitle={modalTitle}
        modalBody={modalBody}
        handleClose={handleCloseMessage}
        isButton
      />
    </div>
  );
}

export default Video;
