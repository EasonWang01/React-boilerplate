import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const EmailVerify = () => {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.emailVerifyContainer}>
      <div className={styles.signup_text}>{t("email verification")}</div>
      <div>
        We have sent email to your email address, click the link from the email
        you received to verify the email address.
      </div>
      <div>Resend if didn’t receive the email</div>
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
        onClick={() => {
          navigate("/login");
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress color="inherit" size={20} />
          </>
        ) : (
          t("sign in")
        )}
      </Button>
    </div>
  );
};

export default EmailVerify;