import { Formik } from "formik";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../component/Input";
import "./Profile.scss";
import { firstLogin, getUser, updateProfile } from "./profileSlice";

function Profile() {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user);

  const handleUpdate = useCallback((values) => {
    if (user === null) {
      dispatch(firstLogin(values));
    } else {
      dispatch(updateProfile(values));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        avatar: user?.avatar || "",
        name: user?.name  || "",
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
      <div className="profile" id="profile">
        <div className="container">
          {/* <div className="back" onClick={() => navigate(-1)}>
            <Icons.ArrowLeft width={20} height={20} color="#000" />
          </div> */}
          <div className="avatar">
            <Input name="avatar" type="file" />
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
    </Formik>
  );
}

export default Profile;
