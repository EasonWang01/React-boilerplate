// import logo from "../../assets/rr.png";
import { useEffect, useState } from "react";
import i18n from "i18next";
import TopNavMenu from "../TopNavMenu";
import styles from "./index.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ exchangeId }) => {
  const userToken = useSelector((state) => state?.user?.accessToken);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  let navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div style={{ display: "flex" }}>
        {/* <img style={{ width: "100px", height: "40px" }} src={logo} alt="Logo" /> */}
        <div
          style={{ lineHeight: "40px", marginLeft: "10px", fontSize: "20px" }}
        >
          {process.env?.REACT_APP_PROJECT_NAME}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!userToken ? (
          <>
            <Button
              style={{
                width: "68px",
                height: "27px",
                fontSize: "14px",
                color: "#55B9D3",
                fontWeight: 600,
                backgroundColor: "#D5EEF5",
                borderRadius: "30px",
              }}
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("SignIn")}
            </Button>
            <Button
              style={{
                width: "68px",
                height: "27px",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#55B9D3",
                borderRadius: "30px",
              }}
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {t("SignUp")}
            </Button>
          </>
        ) : (
          <TopNavMenu />
        )}
        <div
          style={{
            fontSize: "16px",
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                i18n.changeLanguage(e.target.value);
              }}
              label="language"
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"tw"}>繁體中文</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Header;
