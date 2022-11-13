import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const userToken = useSelector((state) => state?.user?.accessToken);
  const userEmail = useSelector((state) => state?.user?.userEmail);
  let navigate = useNavigate();
  useEffect(() => {
    // auth redirect
    if (!userToken) {
      navigate("/login");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/user/verify-login`, {
        email: userEmail,
        token: userToken,
      })
      .then((resp) => {
        console.log(resp.data);
        if (!resp?.data?.success) {
          navigate("/lobby");
        }
      });
  }, [userToken]);
  return (
    <div className={styles.container}>
      <div>Profile</div>
    </div>
  );
};

export default Profile;
