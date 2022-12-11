import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../../component/Input";
import PATH from "../../../../../contants/path";
import "./ImageDetail.scss";
import { editImage, getImageByID, removeImage } from "../ImageSlice";
import ModalCommon from "../../../../../component/ModalCommon";

function ImageDetail() {
  const { id } = useParams();
  const [action, setAction] = useState(1);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const imgById = useSelector((state) => state.image?.imgById);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
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
          await dispatch(editImage({ data: values, id: id })).then((res) => {
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
    await dispatch(removeImage(id)).then((res) => {
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
        dispatch(getImageByID(id));
      } else {
        navigate(PATH.IMAGE.BASE);
      }
    }
  }, [showMessage, navigate, status, dispatch, action, id]);

  useEffect(() => {
    dispatch(getImageByID(id));
  }, [id, dispatch]);

  useEffect(() => {
    setImg(imgById);
  }, [imgById]);

  return (
    <Formik
      initialValues={{ image: img?.url, description: img?.description }}
      innerRef={formikRef}
      enableReinitialize
      onSubmit={handleAction}
    >
      <>
        <div className="img-detail" id="img-detail">
          <div className="container ">
            <div className="row">
              <div className="col col-md-6 col-sm-12 ">
                <div className="img">
                  <Input
                    name="image"
                    type="file"
                    className="img-upload"
                    style={{ width: "100%", height: "100%" }}
                    label="Tải ảnh lên"
                    accept="image/png, image/jpeg"
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
                    value={img?.created_date}
                  />
                </div>
                <div className="btn-img">
                  <button onClick={handleEdit}>Chỉnh sửa</button>
                  <button onClick={handleRemove}>Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalCommon
          show={show}
          modalTitle="Xóa ảnh"
          modalBody="Bạn có muốn xóa mục này"
          isButton
          handleClose={handleClose}
          handleCloseModal={() => setShow(!show)}
        />
        <ModalCommon
          show={showMessage}
          modalTitle={modalTitle}
          modalBody={modalBody}
          isButton
          handleClose={handleCloseMessage}
          handleCloseModal={() => setShowMessage(!showMessage)}
        />
      </>
    </Formik>
  );
}

export default ImageDetail;
