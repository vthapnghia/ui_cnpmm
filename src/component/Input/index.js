import { useField, useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";
import { GENDER } from "../../until/global";
import Icons from "../Icons";
import "./Input.scss";

function Input({
  type,
  className,
  disabled,
  hidden,
  placeholder,
  style,
  label,
  ...props
}) {
  const [password, setEye] = useState(false);
  const [field, meta, helpers] = useField(props);
  const [temp, setTemp] = useState(field.value ?? "bg.jpg");
  const { setFieldValue } = useFormikContext();

  const handleIconPassword = useCallback(() => {
    setEye(!password);
  }, [password]);

  const colourDefaultStyles = {
    container: (styles) => ({
      ...styles,
      height: "50px",
    }),
    valueContainer: (styles) => ({
      ...styles,
      height: "50px",
      padding: "0 30px",
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      width: "100%",
      borderRadius: "10px",
      border: `none`,
      minHeight: 44,
      fontSize: "16px",
      transition: "none",
      height: "100%",
      ":hover": {
        ...styles[":hover"],
        background: "white",
        opacity: "0.3",
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        color: "black",
        ":active": {
          ...styles[":active"],
          backgroundColor: "#fbceb5",
        },
        ":hover": {
          ...styles[":hover"],
          color: "black",
        },
        display: "inline-block",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      };
    },
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      border: "10px",
    }),
    menu: (styles) => ({
      ...styles,
      width: "100%",
      position: "absolute",
      background: "white",
      opacity: 0.9,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "black",
    }),
  };

  const handleChangeSelect = useCallback(
    (items) => {
      helpers.setValue(items.value);
    },

    [helpers]
  );

  useEffect(() => {
    if (type === "select") {
      const selected = GENDER.find((option) => field.value === option.value);
      setTemp(selected);
    } else {
      setTemp(field.value ?? "");
    }
  }, [field.value, type]);

  return (
    <div className="input-common" hidden={hidden}>
      {type === "password" ? (
        <>
          <input
            {...props}
            {...field}
            className={`${className} ${
              meta.error && meta.touched ? "error" : ""
            } `}
            type={password ? "text" : "password"}
            disabled={disabled}
            value={temp}
            style={style}
            placeholder={placeholder}
          />
          <span className="icon-eye" onClick={handleIconPassword}>
            {password ? <Icons.Eye /> : <Icons.EyeSlash />}
          </span>
        </>
      ) : type === "text" ? (
        <input
          {...props}
          {...field}
          className={`${className} ${
            meta.error && meta.touched ? "error" : ""
          } `}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={temp}
          style={style}
        />
      ) : type === "select" ? (
        <ReactSelect
          className={props.className}
          onChange={handleChangeSelect}
          type="select"
          value={temp}
          options={GENDER}
          isSearchable={false}
          styles={colourDefaultStyles}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          menuPortalTarget={document.body}
          placeholder={placeholder}
          placement="auto"
          isDisabled={props.disabled}
          style={style}
        />
      ) : type === "number" ? (
        <input
          {...props}
          {...field}
          className={`${className} ${
            meta.error && meta.touched ? "error" : ""
          } `}
          placeholder={placeholder}
          type="number"
          disabled={disabled}
          value={temp}
          style={style}
        />
      ) : type === "file" ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={temp}
            alt="img"
            width={100}
            height={100}
            onLoad={(event) => (event.target.style.display = "inline-block")}
          />
          <input
            id="file"
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setTemp(fileReader.result);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
              setFieldValue(props.name, e.target.files[0]);
            }}
            className={className}
            style={style}
            hidden
          />
          <label htmlFor="file" className="label-img">
            {label}
          </label>
        </div>
      ) : type === "textarea" ? (
        <textarea
          {...props}
          {...field}
          value={temp}
          className={`${className} ${
            meta.error && meta.touched ? "error" : ""
          } `}
          style={style}
          disabled={disabled}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <video controls className="video">
            <source src={temp} />
          </video>

          <input
            id="file"
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setTemp(fileReader.result);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
              setFieldValue(props.name, e.target.files[0]);
            }}
            className={className}
            style={style}
            hidden
          />
          <label htmlFor="file" className="label-img">
            {label}
          </label>
        </div>
      )}
      {meta.error && meta.touched ? (
        <div className="message-error">{meta.error}</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Input;
