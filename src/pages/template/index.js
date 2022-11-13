import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./index.module.scss";

const Lobby = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div>Lobby</div>
    </div>
  );
};

export default Lobby;
