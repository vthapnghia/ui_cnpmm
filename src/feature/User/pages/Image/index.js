import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackToTop from "../../../../component/BackToTop";
import ModalCommon from "../../../../component/ModalCommon";
import PATH from "../../../../contants/path";
import "./Image.scss";
import { addImage, getImage } from "./ImageSlice";

function Image() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image?.image);
  const [img, setImg] = useState(null);
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
          <input
            id="mutilple_file"
            type="file"
            multiple
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    );
  }, []);

  const handleClose = useCallback(async () => {
    setShow(!show);
    const element = document.getElementById("mutilple_file");
    var files = element.files;
    setShow(!show);
    await dispatch(addImage(files)).then((res) => {
      if (res.payload.status === 201) {
        setModalTitle("Thêm ảnh thành công.");
        setModalBody(null);
        setShowMessage(!showMessage);
      } else {
        setModalTitle("Thêm ảnh thất bại.");
        setModalBody("Hãy thử lại lần nữa.");
        setShowMessage(!showMessage);
      }
    });
  }, [show, dispatch, showMessage]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getImage());
  }, [showMessage, dispatch]);

  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);

  useEffect(() => {
    setImg(image);
  }, [image]);

  return (
    <div className="img" id="img">
      <div className="container d-flex flex-column">
        <div className="btn-add row">
          <button onClick={() => setShow(!show)}>Thêm mới</button>
        </div>

        <div className="img-grid row">
          {img?.map((item, index) => (
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
      <ModalCommon
        show={show}
        modalTitle="Tải ảnh lên"
        modalBody={modalBodyAdd}
        isButton
        handleClose={handleClose}
        labelButton="Lưu"
        handleCloseModal={() => setShow(!show)}
      />
      <ModalCommon
        show={showMessage}
        modalTitle={modalTitle}
        modalBody={modalBody}
        handleClose={handleCloseMessage}
        handleCloseModal={() => setShowMessage(!showMessage)}
        isButton
      />
      <BackToTop id="img"/>
    </div>
  );
}

export default Image;
