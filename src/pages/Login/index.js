import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doSetAccessToken, doSetUserEmail } from "../../store/user";

const Login = ({ setStep }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkPassword_az = (passwordText) => /.*[a-z].*/.test(passwordText);
  const checkPassword_AZ = (passwordText) => /.*[A-Z].*/.test(passwordText);
  const checkPassword_8 = (passwordText) => passwordText.length >= 8;
  const checkEmailFormat = (email) => validateEmail(email);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const makeInputHintColor = (type) => {
    const passwordText = values.password;
    const emailText = values.email;
    const success = { color: "#03781D" };
    const error = { color: "red" };
    if (type === 1) {
      // lower case
      return checkPassword_az(passwordText) ? success : error;
    }
    if (type === 2) {
      // upper case
      return checkPassword_AZ(passwordText) ? success : error;
    }
    if (type === 3) {
      // 8 char
      return checkPassword_8(passwordText) ? success : error;
    }
    if (type === 4) {
      // 8 char
      return checkEmailFormat(emailText) ? success : error;
    }
  };

  const handleLogin = async () => {
    if (!values.email) {
      setErrorText("Email is required");
      setShowErrorDialog(true);
      return;
    }
    if (!checkEmailFormat(values.email)) {
      setErrorText("Email format not correct");
      setShowErrorDialog(true);
      return;
    }
    if (!checkPassword_az(values.password)) {
      setErrorText("Password at least one lowercase letter");
      setShowErrorDialog(true);
      return;
    }
    if (!checkPassword_AZ(values.password)) {
      setErrorText("Password at least one uppercase letter");
      setShowErrorDialog(true);
      return;
    }
    if (!checkPassword_8(values.password)) {
      setErrorText("Password at least 8 characters long");
      setShowErrorDialog(true);
      return;
    }

    setLoading(true);
    const resp = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/login`,
      {
        email: values.email,
        password: values.password,
      }
    );
    if (resp.data?.success) {
      dispatch(doSetAccessToken(resp.data?.token));
      dispatch(doSetUserEmail(values.email));
      setLoading(false);
      navigate("/profile");
      // setInfoText("Success signup");
      // setShowInfoDialog(true);
    }
  };

  useEffect(() => {
    if (showErrorDialog) {
      setTimeout(() => {
        setShowErrorDialog(false);
        setErrorText("");
      }, 1500);
    }
  }, [showErrorDialog]);

  useEffect(() => {
    if (showInfoDialog) {
      setTimeout(() => {
        setShowInfoDialog(false);
        setInfoText("");
      }, 1500);
    }
  }, [showInfoDialog]);
  return (
    <div className={styles.container}>
      <div className={styles.login_card}>
        <div className={styles.signup_text}>{t("Login")}</div>
        <div>
          <TextField
            fullWidth
            margin="normal"
            id="standard-basic"
            label={t("email")}
            variant="standard"
            value={values.email}
            onChange={handleChange("email")}
          />
          {values.email?.length >= 1 && (
            <div>
              <div style={makeInputHintColor(4)}>
                •&nbsp;&nbsp;{t("email format")}
              </div>
            </div>
          )}
        </div>
        <div>
          <FormControl fullWidth margin="normal" variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              {t("password")}
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button
          style={{
            width: "81px",
            height: "27px",
            fontSize: "14px",
            backgroundColor: "#55B9D3",
            borderRadius: "30px",
            marginTop: "5vh",
            float: "right",
          }}
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress color="inherit" size={20} />
            </>
          ) : (
            t("Confirm")
          )}
        </Button>
        {showErrorDialog && (
          <Alert
            style={{
              position: "absolute",
              top: 100,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            severity="error"
          >
            {errorText}
          </Alert>
        )}
        {showInfoDialog && (
          <Alert
            style={{
              position: "absolute",
              top: 100,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            severity="info"
          >
            {infoText}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Login;
