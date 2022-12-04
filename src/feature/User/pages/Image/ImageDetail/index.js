import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../../component/Input";
import PATH from "../../../../../contants/path";
import "./ImageDetail.scss";
import { editImage, getImageByID, removeImage } from "./ImageSlice";

function ImageDetail() {
  const { id } = useParams();
  const [action, setAction] = useState(1);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const imgById = useSelector((state) => state.image?.imgById);
  const navigate = useNavigate();

  const handleEdit = () => {
    setAction(2);
    formikRef.current.submitForm();
  };
  const handleRemove = () => {
    setAction(3);
    formikRef.current.submitForm();
  };

  const handleSave = () => {
    setAction(1);
    formikRef.current.submitForm();
  };

  const handleAction = useCallback(
    async (values) => {
      if (action === 1) {
      } else {
        if (action === 2) {
          await dispatch(editImage({ data: values, id: id })).then((res) => {
            dispatch(getImageByID(id));
          });
        } else {
          await dispatch(removeImage(id)).then((res) => {
            if (res.payload?.status === 200) {
              navigate(PATH.IMAGE.BASE);
            }
          });
        }
      }
    },
    [dispatch, action, id, navigate]
  );

  useEffect(() => {
    if (id) {
      dispatch(getImageByID(id));
    }
  }, [id, dispatch]);

  return (
    <Formik
      initialValues={{ image: imgById?.url, description: imgById?.description }}
      innerRef={formikRef}
      enableReinitialize
      onSubmit={handleAction}
    >
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
              {id ? (
                <>
                  <div className="input">
                    <input
                      className="update-date"
                      placeholder="Ngày tải lên"
                      disabled
                      value={imgById?.created_date}
                    />
                  </div>
                  <div className="btn-img">
                    <button onClick={handleEdit}>Chỉnh sửa</button>
                    <button onClick={handleRemove}>Xóa</button>
                  </div>
                </>
              ) : (
                <div className="btn-img">
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default ImageDetail;
