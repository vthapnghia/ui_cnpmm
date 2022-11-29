import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../../component/Icons";
import "./Profile.scss";

function Profile() {
  const [password, setEye] = useState(false);
  const navigate = useNavigate();
  const formikRef = useRef();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const handleUpdate = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{ name: "", password: "", address: "", phone: "" }}
      onSubmit={handleUpdate}
      innerRef={formikRef}
    >
      {(props) => (
        <div className="profile" id="profile">
          <div className="container">
            <div className="back" onClick={() => navigate(-1)}>
              <Icons.ArrowLeft width={20} height={20} color="#000" />
            </div>
            <img
              src="pexels-lisa-fotios-1048283.jpg"
              alt="img"
              className="use-img"
              width={100}
              height={100}
            />
            <h1>User name</h1>

            <div className="input">
              <input
                name="name"
                className="username"
                placeholder="User name"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
            </div>
            <div className="input">
              <input
                name="password"
                className="password"
                placeholder="Password"
                type={password ? "password" : "text"}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              <span className="icon-eye" onClick={handleIconPassword}>
                {password ? <Icons.EyeSlash /> : <Icons.Eye />}
              </span>
            </div>
            <div className="input">
              <input
                name="address"
                className="address"
                placeholder="Address"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.address}
              />
            </div>
            <div className="input">
              <input
                className="phone"
                name="phone"
                placeholder="Phone"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone}
              />
            </div>
            <div className="btn-update">
              <button onClick={() => formikRef.current.submitForm()}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Profile;
