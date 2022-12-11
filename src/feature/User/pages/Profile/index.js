import { Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../component/Input";
import ModalCommon from "../../../../component/ModalCommon";
import "./Profile.scss";
import { firstLogin, getUser, updateProfile } from "./profileSlice";

function Profile() {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);

  const handleUpdate = useCallback(
    async (values) => {
      if (user === null) {
        await dispatch(firstLogin(values)).then((res) => {
          if (res.payload.status === 200) {
            setModalTitle("Cập nhật thành công.");
            setModalBody(null);
            setShow(!show);
          } else {
            setModalTitle("Cập nhật thất bại.");
            setModalBody("Hãy thử lại lần nữa.");
            setShow(!show);
          }
        });
      } else {
        await dispatch(updateProfile(values)).then((res) => {
          if (res.payload.status === 200) {
            setModalTitle("Cập nhật thành công.");
            setModalBody(null);
            setShow(!show);
          } else {
            setModalTitle("Cập nhật thất bại.");
            setModalBody("Hãy thử lại lần nữa.");
            setShow(!show);
          }
        });
      }
    },
    [dispatch, user, show]
  );

  const handleClose = useCallback(() => {
    setShow(!show);
  }, [show]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        avatar: user?.avatar || "",
        name: user?.name || "",
        age: user?.age || "",
        gender: user?.gender || "",
        address: user?.address || "",
        phone: user?.phone || "",
      }}
      onSubmit={handleUpdate}
      innerRef={formikRef}
      enableReinitialize
      encType="multipart/form-data"
    >
      <>
        <div className="profile" id="profile">
          <div className="container">
            <div className="avatar">
              <Input
                name="avatar"
                type="file"
                label="Tải ảnh lên"
                accept="image/*"
              />
            </div>

            <div className="input">
              <Input name="name" placeholder="Họ và tên" type="text" />
            </div>
            <div className="input">
              <Input name="age" placeholder="Tuổi" type="number" />
            </div>
            <div className="input">
              <Input name="gender" placeholder="Giới tính" type="select" />
            </div>
            <div className="input">
              <Input name="address" placeholder="Địa chỉ" type="text" />
            </div>
            <div className="input">
              <Input name="phone" placeholder="Số điện thoại" type="number" />
            </div>

            <div className="btn-update">
              <button onClick={() => formikRef.current.submitForm()}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <ModalCommon
          show={show}
          modalTitle={modalTitle}
          modalBody={modalBody}
          isButton
          handleClose={handleClose}
          handleCloseModal={() => setShow(!show)}
        />
      </>
    </Formik>
  );
}

export default Profile;
