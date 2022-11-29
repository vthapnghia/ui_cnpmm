import { useState } from "react";
import "./ImageDetail.scss";

function ImageDetail() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };
  console.log(selectedFile);
  return (
    <div className="img-detail" id="img-detail">
      <div className="container ">
        <div className="row">
          <div className="col col-md-6 col-sm-12">
            <img
              className="image"
              src={selectedFile}
              alt=""
              onLoad={(event) => (event.target.style.display = "inline-block")}
            />
            <input
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
                className="description"
                placeholder="Mô tả"
                disabled={true}
              />
            </div>
            <div className="input">
              <input
                className="update-date"
                placeholder="Ngày tải lên"
                disabled
              />
            </div>
            <div className="btn-img">
              <button>Chỉnh sửa</button>
              <button>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;
