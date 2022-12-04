import { Formik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ImageDetail.scss";
import { getImage } from "./ImageSlice";

function ImageDetail() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const [action, setAction] = useState(1);
  const formikRef = useRef();
  const dispath = useDispatch();
  const handleUpload = (e) => {
    // props.handleChange();
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

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

  const handleAction = (values) => {
    if (action === 1) {
    } else {
      if (action === 2) {
      } else {
      }
    }
  };

  return (
    <Formik
      initialValues={{ img_upload: "", description: "" }}
      innerRef={formikRef}
      onSubmit={handleAction}
    >
      {(props) => (
        <div className="img-detail" id="img-detail">
          <div className="container ">
            <div className="row">
              <div className="col col-md-6 col-sm-12">
                <img
                  className="image"
                  src={selectedFile}
                  alt=""
                  onLoad={(event) =>
                    (event.target.style.display = "inline-block")
                  }
                />
                <input
                  name="img_upload"
                  className="img-upload"
                  id="actual-btn"
                  type="file"
                  onChange={handleUpload}
                  hidden
                />
                <label
                  className="label-upload"
                  htmlFor="actual-btn"
                  id="actual-btn"
                >
                  Choose File
                </label>
              </div>
              <div className="col col-md-6 col-sm-12">
                <div className="input">
                  <textarea
                    name="decription"
                    className="description"
                    placeholder="Mô tả"
                  />
                </div>
                {id ? (
                  <>
                    <div className="input">
                      <input
                        className="update-date"
                        placeholder="Ngày tải lên"
                        disabled
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
      )}
    </Formik>
  );
}

export default ImageDetail;
